import { getSettings } from "@/lib/db";
import Link from "next/link";
import ManualUpdateButton from "@/components/ManualUpdateButton";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#FDFCFB]">
      <header className="px-8 pt-16 pb-6 flex flex-col bg-white border-b border-black/5 flex-none">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-[#2D3330] hover:text-[#5D6B67] transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7"/></svg>
          </Link>
          <h1 className="text-[16px] font-bold tracking-[0.3em] text-[#2D3330] uppercase leading-none">
            Vocabulary<span className="font-light opacity-50 ml-2">&</span> Assets
          </h1>
          <div className="w-5"></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-8 py-10 space-y-12">
        {/* Material Assets Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-black/5 pb-2">
             <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8E8C87]">01. Material Archive</h2>
             <span className="text-[8px] font-medium text-[#5D6B67] opacity-60 italic">LIBRARY</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
             {['牛腩 (BRISKET)', '牛油果 (AVOCADO)', '淡奶油 (CREAM)', '焦糖 (CARAMEL)'].map((asset) => (
                <div key={asset} className="flex justify-between items-center group cursor-pointer pb-2 border-b border-dashed border-black/5">
                   <span className="text-[13px] font-bold text-[#2D3330] tracking-tight group-hover:text-[#5D6B67] transition-colors">{asset}</span>
                   <svg className="w-3 h-3 text-black/10 group-hover:text-[#5D6B67] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3"/></svg>
                </div>
             ))}
             <button className="text-left text-[9px] font-bold text-[#5D6B67] uppercase tracking-[0.2em] mt-2 hover:opacity-70 transition-opacity">
                + Append New Entry to Library
             </button>
          </div>
        </section>

        {/* Terminology Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-black/5 pb-2">
             <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8E8C87]">02. Procedural Dictionary</h2>
             <span className="text-[8px] font-medium text-[#5D6B67] opacity-60 italic">VOCABULARY</span>
          </div>
          
          <div className="space-y-8">
            <div className="group space-y-2">
              <h4 className="text-[11px] font-bold text-[#2D3330] uppercase tracking-widest">排酸熟成 (AGING / MATURATION)</h4>
              <p className="text-[11px] text-[#8E8C87] font-medium leading-relaxed italic border-l-2 border-[#5D6B67]/20 pl-4">
                Controlled chemical change to break down muscle fibers. Enhances depth of flavor and tenderness in meat entries.
              </p>
            </div>
            <div className="group space-y-2">
              <h4 className="text-[11px] font-bold text-[#2D3330] uppercase tracking-widest">低温慢煮 (SOUS-VIDE)</h4>
              <p className="text-[11px] text-[#8E8C87] font-medium leading-relaxed italic border-l-2 border-[#5D6B67]/20 pl-4">
                Precise temperature control in a vacuum archive. Ensures mathematical consistency for textures across the entire batch.
              </p>
            </div>
          </div>
        </section>

        {/* System & Units */}
        <section className="space-y-6 pb-20">
          <div className="flex items-center gap-4">
             <div className="w-6 h-px bg-black/10"></div>
             <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8E8C87]">03. Unit Standards</h2>
          </div>
          <div className="flex gap-4">
             <div className="flex-1 p-5 bg-white border border-black/5 rounded-xl shadow-sm flex flex-col gap-1">
                <span className="text-[8px] font-bold text-[#8E8C87] uppercase tracking-[0.4em]">Weight</span>
                <span className="text-[14px] font-bold text-[#2D3330] tracking-tighter">METRIC / G</span>
             </div>
             <div className="flex-1 p-5 bg-white border border-black/5 rounded-xl shadow-sm flex flex-col gap-1">
                <span className="text-[8px] font-bold text-[#8E8C87] uppercase tracking-[0.4em]">Volume</span>
                <span className="text-[14px] font-bold text-[#2D3330] tracking-tighter">ML / L</span>
             </div>
          </div>
        </section>
      </main>

      <footer className="p-8 bg-white border-t border-black/5 shadow-[0_-10px_30px_rgba(0,0,0,0.02)] flex-none space-y-3">
        <button className="w-full bg-[#2D3330] text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.4em] shadow-lg active:scale-[0.98] transition-all">
          Synchronize Library
        </button>
        <ManualUpdateButton />
      </footer>
    </div>
  );
}
