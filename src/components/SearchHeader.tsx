"use client";

import { useState } from "react";

export default function SearchHeader() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 mb-1">
      {/* Integrated Search Bar - Shapeless Glass */}
      <div className="flex gap-2 h-10">
        <div className="relative flex-1 group">
          <input 
            type="text" 
            placeholder="搜索食谱档案..."
            className="w-full h-full bg-white/70 backdrop-blur-xl border border-white/80 rounded-[8px] px-11 text-[16px] font-bold text-[#1C1C1E] focus:shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus:bg-white transition-all outline-none placeholder:text-black/30 placeholder:tracking-widest appearance-none"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="w-10 h-10 flex items-center justify-center bg-white/70 backdrop-blur-xl border border-white/80 rounded-[8px] text-black/60 hover:text-[#1C1C1E] hover:bg-white transition-all active:scale-95 shadow-sm"
        >
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
            <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </div>

      {/* Advanced Filter Modal Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 h-[100dvh]">
          <div 
            className="absolute inset-0 bg-[#1C1C1E]/40 backdrop-blur-md animate-fade-in"
            onClick={() => setIsFilterOpen(false)}
          ></div>
          <div className="relative w-full max-w-[480px] bg-white rounded-t-[32px] sm:rounded-[8px] shadow-2xl p-8 pt-10 sm:p-7 animate-slide-up space-y-8 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:pb-7">
            <div className="flex justify-between items-center pb-1 border-b border-black/[0.04]">
              <h3 className="text-[12px] font-bold tracking-widest text-[#1C1C1E] mb-0.5">高级配置筛选</h3>
              <button onClick={() => setIsFilterOpen(false)} className="text-black/40 hover:text-[#1C1C1E] mb-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="space-y-6">
               <div className="space-y-3">
                 <label className="text-[11px] font-bold tracking-widest text-black/40 ml-1">预期耗时层级</label>
                 <div className="grid grid-cols-3 gap-1.5">
                   {['15 分钟内', '15-45 分钟', '45 分钟以上'].map(t => (
                     <button key={t} className="py-3 rounded-[8px] bg-[#F5F5F7] border-black/5 text-[11px] font-bold text-[#1C1C1E] active:scale-95 transition-transform">{t}</button>
                   ))}
                 </div>
               </div>

               <div className="space-y-3">
                 <label className="text-[11px] font-bold tracking-widest text-black/40 ml-1">偏好硬件</label>
                 <div className="flex flex-wrap gap-1.5">
                   {['烤箱', '明火炉', '空气炸锅', '低温慢煮仪'].map(e => (
                     <button key={e} className="px-5 py-2.5 rounded-[8px] bg-[#F5F5F7] border-black/5 text-[11px] font-bold text-[#1C1C1E] active:scale-95 transition-transform">{e}</button>
                   ))}
                 </div>
               </div>
            </div>

            <button 
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-[#1C1C1E] text-white py-4 rounded-[8px] text-[13px] font-bold tracking-widest shadow-[0_8px_20px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all"
            >
              加载匹配档案
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
