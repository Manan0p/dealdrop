"use server"

import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/");
    redirect("/");
}
export async function addProduct(formData) {
    const url = formData.get("url");

    if (!url) {
        return{ error: "URL is required" };
    }

    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return { error: "User not authenticated" };
        }

        const productData = await scrapeProduct(url);

        if (!productData.productName || !productData.currentPrice){
            console.log(productData, "productData");
            return { error: "Failed to extract product data from the URL" };
        }

        const newPrice = parseFloat(productData.currentPrice);
        const currency = productData.currencyCode || "INR";

        const {data:existingProduct} = await supabase.from("products").select("id, current_price").eq("url", url).eq("user_id", user.id).single();

        const isUpdate = !!existingProduct;

    } catch (error) {
        
    }
}