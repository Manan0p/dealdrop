import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 flex justify-between items-center">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src={"/deal-drop-logo.png"} alt="Deal Drop Logo" width={600} height={200} className="h-10 w-auto" />
          </div>
        </div>
      </header>  
    </main>
  );
}
