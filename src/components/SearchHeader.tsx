"use client";

import { useState } from "react";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function SearchHeader() {
  return (
    <div className="flex flex-col gap-2 mb-1">
      {/* Integrated Search Bar - Structured Rectangle */}
      <div className="flex gap-2.5 h-10 relative isolate">
        <div className="relative flex-1 group isolate">
          {/* Detached Background Layer */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xl border border-black/[0.03] rounded-[8px] -z-10 pointer-events-none transition-all group-within:bg-white group-within:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"></div>
          
          <input 
            type="text" 
            className="w-full h-10 bg-transparent px-11 text-[14.5px] font-semibold text-[#1C1C1E] outline-none appearance-none leading-normal"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/20 pointer-events-none ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

        {/* --- SHADCN DRAWER FILTER --- */}
        <Drawer>
          <DrawerTrigger asChild>
            <button className="w-10 h-10 flex items-center justify-center bg-white/60 backdrop-blur-xl border border-black/[0.03] rounded-[8px] text-black/40 hover:text-[#1C1C1E] hover:bg-white transition-all active:scale-95 shadow-sm">
              <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.3">
                <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-white/80 backdrop-blur-2xl rounded-t-[32px] border-none shadow-2xl">
            <div className="px-8 space-y-7 overflow-y-auto no-scrollbar pb-10">
              <div className="grid gap-7 pt-2">
                {/* Time Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-black/40">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <label className="text-[10px] font-bold tracking-[0.1em] uppercase">想花多久？</label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['15min.', '45min.', '不着急'].map(t => (
                      <button key={t} className="px-5 py-2 rounded-[6px] bg-black/[0.03] border border-black/[0.01] text-[10px] font-bold text-[#1C1C1E] active:scale-95 transition-all hover:bg-white hover:shadow-md">{t}</button>
                    ))}
                  </div>
                </div>

                {/* Taste Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-black/40">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <label className="text-[10px] font-bold tracking-[0.1em] uppercase">什么口味？</label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['清淡', '咸香', '麻辣', '酸甜', '香脆'].map(t => (
                      <button key={t} className="px-4 py-2 rounded-[6px] bg-black/[0.03] border border-black/[0.01] text-[11px] font-bold text-[#1C1C1E] active:scale-95 transition-all hover:bg-white hover:shadow-md">{t}</button>
                    ))}
                  </div>
                </div>

                {/* Equipment Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-black/40">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0h10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <label className="text-[10px] font-bold tracking-[0.1em] uppercase">家里有啥？</label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['烤箱', '空气炸锅', '低温慢煮', '不粘锅'].map(e => (
                      <button key={e} className="px-4 py-2 rounded-[6px] bg-black/[0.03] border border-black/[0.01] text-[11px] font-bold text-[#1C1C1E] active:scale-95 transition-all hover:bg-white hover:shadow-md">{e}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <DrawerClose asChild>
                  <Button className="w-full h-14 bg-[#1C1C1E] text-white rounded-[8px] text-[13px] font-bold tracking-[0.2em] shadow-xl active:scale-[0.98] transition-all transform-gpu">
                    就这些，开始筛选
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
