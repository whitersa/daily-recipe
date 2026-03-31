import { getRecipeById } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

const COLORS = [
  'placeholder-sage',
  'placeholder-clay',
  'placeholder-slate',
  'placeholder-sand',
  'placeholder-moss',
];

export default async function RecipeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  const colorClass = COLORS[recipe.id % COLORS.length];

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-[#FDFCFB]">
      <div className="flex-1 overflow-y-auto no-scrollbar">
      {/* Dynamic Earth-Tone Header */}
      <div className={`h-64 w-full ${colorClass} flex items-center justify-center text-7xl shadow-sm relative overflow-hidden`}>
        <div className="relative z-10 opacity-80 drop-shadow-xl">🥘</div>
        <div className="absolute inset-0 bg-black/5"></div>
        {/* Sharp Navigation Actions */}
        <div className="absolute left-8 right-8 flex justify-between items-center z-20" style={{ top: 'calc(2rem + env(safe-area-inset-top, 0px))' }}>
          <Link 
            href="/"
            className="bg-white p-3 rounded-xl shadow-lg text-[#2D3330] hover:bg-black hover:text-white transition-all active:scale-90 border border-black/10"
          >
            <svg className="w-5 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M7 16l-4-4m0 0l4-4m-4 4h18"/></svg>
          </Link>
          <Link 
            href={`/recipe/${id}/edit`}
            className="bg-white p-3 rounded-xl shadow-lg text-[#2D3330] hover:bg-[#5D6B67] hover:text-white transition-all active:scale-90 border border-black/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </Link>
        </div>
      </div>

      {/* Modern Content Card - Sharp Geo */}
      <div className="px-8 -mt-8 relative bg-[#FDFCFB] rounded-t-[2rem] pt-10 min-h-screen">
        <header className="mb-10 text-left">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8E8C87]">
              {recipe.category}
            </span>
            <div className="flex-1 h-px bg-black/5"></div>
          </div>
          <h1 className="text-3xl font-bold text-[#2D3330] leading-tight mb-5 tracking-tight uppercase">
            {recipe.title}
          </h1>
          <div className="flex gap-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] font-bold uppercase tracking-widest text-[#8E8C87]">Duration</span>
              <span className="text-[11px] font-bold text-[#2D3330] opacity-60 italic">{recipe.time}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] font-bold uppercase tracking-widest text-[#8E8C87]">Quality</span>
              <span className="text-[11px] font-bold text-[#2D3330] opacity-60 italic">Architectural</span>
            </div>
          </div>
        </header>

        {/* Description - Sharp Muted Box */}
        <div className="relative mb-12 p-6 bg-white rounded-xl border border-black/10 shadow-sm">
           <p className="text-[#2D3330] text-[15px] leading-[1.8] font-bold italic text-left opacity-90">
            &quot;{recipe.description}&quot;
          </p>
        </div>

        {/* Ingredients - Sharp List */}
        <section className="mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8E8C87] mb-6">Equipments</h2>
          <div className="grid grid-cols-1 gap-3">
            {(recipe.ingredients as string[]).map((item, idx) => (
              <div key={idx} className="flex justify-between items-center pb-3 border-b border-black/5">
                <span className="text-[14px] text-[#2D3330] font-bold tracking-tight uppercase">{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/10"></span>
              </div>
            ))}
          </div>
        </section>

        {/* Method - Segmented Progress */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8E8C87] mb-10">Methodology</h2>
          <div className="space-y-10 relative">
            {(recipe.steps as string[]).map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex-none">
                  <div className="text-[22px] font-bold text-[#2D3330] opacity-10 italic tabular-nums leading-none">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="flex-1 border-l border-black/10 pl-6 pb-2">
                  <p className="text-[14px] text-[#2D3330] leading-relaxed font-bold tracking-tight">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
