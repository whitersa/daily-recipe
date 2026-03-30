import RecipeCard from "@/components/RecipeCard";
import SearchHeader from "@/components/SearchHeader";
import { getRecipes, Recipe } from "@/lib/db";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const selectedCat = cat || '全部';
  const recipes = await getRecipes(selectedCat) as Recipe[];

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-[#FDFCFB]">
      {/* Fixed Architectural Header Section - Integrated Search */}
      <header className="px-8 pt-8 pb-0 flex flex-col bg-white border-b border-black/5 z-20 flex-none">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-0.5">
            <h1 className="text-[18px] font-bold tracking-[0.25em] text-[#2D3330] leading-none uppercase">
              Daily<span className="font-light opacity-60 ml-0.5 text-[#5D6B67]">Archive</span>
            </h1>
          </div>
        </div>

        {/* Client-Side Search & Filter Bar */}
        <SearchHeader />
        
        {/* Magazine-Style Tab Bar - Tightened Distance */}
        <nav className="flex gap-7 overflow-x-auto no-scrollbar py-0.5">
          {['全部', '早餐', '午餐', '晚餐', '甜点', '轻食'].map((cat) => (
            <Link
              key={cat}
              href={`/?cat=${cat}`}
              className={`group flex flex-col gap-1.5 pb-2 transition-all duration-300 relative`}
            >
              <span className={`whitespace-nowrap text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                cat === selectedCat ? 'text-[#2D3330]' : 'text-[#8E8C87] group-hover:text-[#5D6B67]'
              }`}>
                {cat}
              </span>
              {cat === selectedCat && (
                <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#2D3330] animate-fade-in shadow-sm"></div>
              )}
            </Link>
          ))}
        </nav>
      </header>

      {/* Independently Scrollable Recipe Archive */}
      <section className="flex-1 overflow-y-auto no-scrollbar px-8 pt-0 pb-32 relative">
        {/* Sticky Entry Counter - Architectural Badge (Zero-Margin) */}
        <div className="sticky top-0 z-10 py-1.5 bg-[#FDFCFB]/80 backdrop-blur-md flex items-center justify-between pointer-events-none">
           <div className="w-4 h-px bg-black/10"></div>
           <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#8E8C87] bg-white px-3 py-1 border border-black/5 rounded-full shadow-sm">
             Archive <span className="text-[#2D3330] ml-1">{String(recipes.length).padStart(2, '0')}</span>
           </span>
           <div className="w-4 h-px bg-black/10"></div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {recipes.length > 0 ? (
            recipes.map((recipe: Recipe, index: number) => (
              <div key={recipe.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.03}s` }}>
                <RecipeCard recipe={recipe} />
              </div>
            ))
          ) : (
            <div className="py-24 text-center border border-black/5 rounded-xl bg-stone-50/30">
              <span className="text-3xl opacity-20">🍃</span>
              <p className="text-[#8E8C87] text-[10px] font-bold uppercase tracking-[0.4em] mt-4">Archive Empty</p>
            </div>
          )}
        </div>
      </section>

      {/* Unified Command Bar - Grounded & Refined (Grounded Architecture) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[85%] max-w-[400px]">
        <nav className="bg-[#2D3330] py-3 rounded-xl flex justify-around items-center shadow-[0_25px_80px_rgba(0,0,0,0.5)] border border-white/5 scale-90 sm:scale-100">
          <Link href="/" className="text-white hover:text-[#5D6B67] transition-all active:scale-95">
             {/* Open Book Icon for Home (Archive) */}
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </Link>
          <Link href="/settings" className="text-white/40 hover:text-white transition-all active:scale-95">
             {/* Index/Dictionary Icon for Assets */}
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
          </Link>
          <Link href="/recipe/new" className="text-white/40 hover:text-white transition-all active:scale-110">
             {/* Pen/Writing Icon for New Archive */}
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
             </svg>
          </Link>
        </nav>
      </div>
    </div>
  );
}
