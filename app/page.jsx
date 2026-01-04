import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { Bell, LogIn, Rabbit, Shield, TrendingDown } from "lucide-react";
import Image from "next/image";
import { getProducts } from "./actions";
import ProductCard from "@/components/product-card";

export default async function Home() {

  const supabase = await createClient();

  const {data : { user }} = await supabase.auth.getUser();

  const products = user?await getProducts():[];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description: "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content"
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description: "Works across all major e-commerce sites with built-in anti-bot protecttion"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];
  
  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 dark:from-black dark:via-neutral-800 dark:to-black">
      <header className="bg-white/80 dark:bg-neutral-900/90 border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-10 backdrop-blur-sm supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-neutral-900/60">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src={"/DDL.png"} alt="Deal Drop Logo" width={600} height={200} className="h-10 w-auto" />
          </div>

          <ThemeToggle />
          <AuthButton user={user} />
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-sm font-medium mb-6">Made with 🫶🏻 by Manan0p</div>

          <h2 className="text-5xl font-bold text-gray-900 dark:text-neutral-200 mb-4 tracking-tight">Never miss a Price Drop</h2>

          <p className="text-xl text-grey-600 mb-12 max-w-2xl mx-auto">
            Track prices from any e-commerce site. Get instant alerts when prices drop. Save money effortlessly.
          </p>

          {/*Add product form*/}
          <AddProductForm user={user} />

          {/*Features*/}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              {FEATURES.map(({icon: Icon, title, description}) =>(
                <div key={title} className="bg-white dark:bg-neutral-900/90 p-6 rounded-xl border border-gray-200">
                  <div className="mb-4 w-12 h-12 flex items-center justify-center bg-orange-100 rounded-lg mx-auto">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-neutral-100 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-neutral-200">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {user && products.length>0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-shadow-gray-900 dark:text-neutral-200">Your Tracked Products</h3>
            <span className="text-sm text-gray-600 dark:text-neutral-200">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start ">
            {products.map(product => <ProductCard key={product.id} product={product} /> )}
          </div>
        </section>
      )}

      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white dark:bg-neutral-900 rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600 dark:text-neutral-200">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
