import { getRecipeById } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#FDFCFB]">
      <header className="px-8 pt-16 pb-6 flex flex-col bg-white border-b border-black/5 flex-none">
        <div className="flex justify-between items-center mb-6">
          <Link href={`/recipe/${id}`} className="text-[#2D3330] hover:text-[#5D6B67] transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7"/></svg>
          </Link>
          <h1 className="text-[18px] font-bold tracking-[0.2em] text-[#2D3330] uppercase">
            Edit Recipe
          </h1>
          <div className="w-5"></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-8 py-10 space-y-10">
        <section className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#8E8C87] ml-1">Archive Title</label>
              <input 
                type="text" 
                defaultValue={recipe.title}
                className="w-full bg-white border border-black/5 rounded-lg px-4 py-3 text-[15px] text-[#2D3330] font-bold focus:border-[#5D6B67] transition-all outline-none uppercase"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#8E8C87] ml-1">Classification</label>
              <select 
                defaultValue={recipe.category}
                className="w-full bg-white border border-black/5 rounded-lg px-4 py-3 text-[13px] text-[#2D3330] font-bold focus:border-[#5D6B67] transition-all outline-none"
              >
                {['早餐', '午餐', '晚餐', '甜点', '轻食'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#8E8C87] ml-1">Abstract / Description</label>
              <textarea 
                defaultValue={recipe.description}
                rows={4}
                className="w-full bg-white border border-black/5 rounded-lg px-4 py-3 text-[14px] text-[#2D3330] font-medium italic focus:border-[#5D6B67] transition-all outline-none resize-none"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
             <div className="w-6 h-px bg-black/10"></div>
             <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8E8C87]">Ingredients</h2>
          </div>
          <div className="space-y-3">
            {(recipe.ingredients as string[]).map((ing, idx) => (
              <div key={idx} className="flex gap-3">
                <input 
                  type="text" 
                  defaultValue={ing}
                  className="flex-1 bg-white border border-black/5 rounded-lg px-4 py-2.5 text-[13px] text-[#2D3330] font-bold focus:border-[#5D6B67] transition-all outline-none"
                />
              </div>
            ))}
            <button className="w-full border border-dashed border-black/20 rounded-lg py-2.5 text-[10px] font-bold text-[#8E8C87] uppercase tracking-widest hover:border-[#5D6B67] hover:text-[#5D6B67] transition-all">
              + Add Ingredient
            </button>
          </div>
        </section>
      </main>

      <footer className="p-8 bg-white border-t border-black/5 flex gap-4">
         <button className="flex-1 bg-[#FDFCFB] border border-black/10 text-[#8E8C87] py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all">
          Discard
        </button>
        <button className="flex-[2] bg-[#2D3330] text-white py-4 rounded-xl text-[12px] font-bold uppercase tracking-[0.2em] shadow-lg active:scale-[0.98] transition-all">
          Update Archive
        </button>
      </footer>
    </div>
  );
}
