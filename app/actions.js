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
        
    } catch (error) {
        
    }
}