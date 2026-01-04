import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { scrapeProduct } from "@/lib/firecrawl";
import { sendPriceDropALert } from "@/lib/email";

// Force node runtime to avoid edge/compat issues with supabase-js
export const runtime = "nodejs";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase environment variables are missing");
    }

    // Use service role to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: { autoRefreshToken: false, persistSession: false },
      }
    );

    if (typeof supabase?.from !== "function") {
      throw new Error("Supabase client failed to initialize (no from method)");
    }

    console.log("cron check-prices env", {
      urlPresent: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      keyPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      fromType: typeof supabase.from,
    });

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*");

    if (productsError) throw productsError;

    console.log(`Found ${products.length} products to check`);

    const results = {
      total: products.length,
      updated: 0,
      failed: 0,
      priceChanges: 0,
      alertsSent: 0,
    };

    for (const product of products) {
      try {
        const productData = await scrapeProduct(product.url);

        if (!productData.currentPrice) {
          results.failed++;
          continue;
        }

        const newPrice = parseFloat(productData.currentPrice);
        const oldPrice = parseFloat(product.current_price);
        console.log("price check", { id: product.id, oldPrice, newPrice });

        await supabase
          .from("products")
          .update({
            current_price: newPrice,
            currency: productData.currencyCode || product.currency,
            name: productData.productName || product.name,
            image_url: productData.productImageUrl || product.image_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", product.id);

        if (oldPrice !== newPrice) {
          const { error: historyError } = await supabase
            .from("price_history")
            .insert({
              product_id: product.id,
              price: newPrice,
              checked_at: new Date().toISOString(),
            });

          if (historyError) {
            console.error("price_history insert error", { productId: product.id, historyError });
            throw historyError;
          }

          console.log("price_history inserted", { productId: product.id, price: newPrice });

          results.priceChanges++;

          if (newPrice < oldPrice) {
            const {
              data: { user },
            } = await supabase.auth.admin.getUserById(product.user_id);

            if (user?.email) {
              const emailResult = await sendPriceDropALert(
                user.email,
                product,
                oldPrice,
                newPrice
              );

              if (emailResult.success) {
                results.alertsSent++;
              }
            }
          }
        }

        results.updated++;
      } catch (error) {
        console.error(`Error processing product ${product.id}:`, error);
        results.failed++;
      }
    }

    console.log("cron results", results);

    return NextResponse.json({ success: true, message: "Price check completed", results });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Price check endpoint is working. Use POST to trigger.",
  });
}

// curl.exe -X POST https://dealdrop-one.vercel.app/api/cron/check-prices  -H "Authorization: Bearer 4a746688c69dba10c888be241eb0309cc118a9e7e38eb2727095667cc3766efe"