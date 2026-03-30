"use client";

import { useState } from "react";

export default function SearchHeader() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 mb-5">
      {/* Integrated Search Bar - Sharpened & Tightened */}
      <div className="flex gap-2 h-10">
        <div className="relative flex-1 group">
          <input 
            type="text" 
            placeholder="Search entries..."
            className="w-full h-full bg-[#FDFCFB] border border-black/5 rounded-lg px-11 text-[12px] font-bold text-[#2D3330] focus:border-[#5D6B67] transition-all outline-none placeholder:opacity-30 placeholder:uppercase placeholder:tracking-[0.2em]"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#2D3330] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="w-10 h-10 flex items-center justify-center bg-white border border-black/5 rounded-lg text-[#2D3330] hover:text-[#5D6B67] hover:border-[#5D6B67]/20 transition-all active:scale-95 shadow-sm"
        >
          <svg className="w-[17.5px] h-[17.5px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
            <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </div>

      {/* Advanced Filter Modal Overlay - Sharpened & Balanced */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 h-[100dvh]">
          <div 
            className="absolute inset-0 bg-[#2D3330]/60 backdrop-blur-md animate-fade-in"
            onClick={() => setIsFilterOpen(false)}
          ></div>
          <div className="relative w-full max-w-[480px] bg-white rounded-t-[2.5rem] sm:rounded-2xl shadow-2xl p-8 pt-10 sm:p-7 animate-slide-up space-y-8 border-t border-black/5 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:pb-7">
            <div className="flex justify-between items-center border-b border-black/5 pb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2D3330]">Advanced Filter</h3>
              <button onClick={() => setIsFilterOpen(false)} className="text-[#8E8C87] hover:text-[#2D3330]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="space-y-6">
               <div className="space-y-3">
                 <label className="text-[9px] font-bold uppercase tracking-widest text-[#8E8C87]">Time Intensity</label>
                 <div className="grid grid-cols-3 gap-2">
                   {['< 15m', '15-45m', '> 45m'].map(t => (
                     <button key={t} className="py-2.5 rounded-lg border border-black/5 text-[10px] font-bold text-[#2D3330] hover:bg-stone-50">{t}</button>
                   ))}
                 </div>
               </div>

               <div className="space-y-3">
                 <label className="text-[9px] font-bold uppercase tracking-widest text-[#8E8C87]">Preferred Equipment</label>
                 <div className="flex flex-wrap gap-2">
                   {['Oven', 'Stove', 'Air Fryer', 'Blender'].map(e => (
                     <button key={e} className="px-4 py-2 rounded-full border border-black/5 text-[10px] font-bold text-[#2D3330] hover:bg-stone-50">{e}</button>
                   ))}
                 </div>
               </div>
            </div>

            <button 
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-[#2D3330] text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] shadow-lg active:scale-[0.98] transition-all"
            >
              Apply Filter Parameters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
