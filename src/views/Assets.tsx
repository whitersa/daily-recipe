import { motion } from "framer-motion";
import BottomDock from "@/components/BottomDock";

export default function Assets() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[100dvh] overflow-hidden bg-[#F5F5F7]"
    >
      <header className="px-6 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-0 flex flex-col z-20 flex-none relative">
        <div className="mb-1 flex justify-between items-center">
          <div className="w-[46px]"></div> {/* Spacer */}
          <h1 className="text-[17px] font-bold tracking-widest text-[#1C1C1E] text-center w-full">
            工艺预设
          </h1>
          <div className="w-[46px]"></div> {/* Spacer */}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pt-2 pb-[100px] space-y-6">
        <section className="space-y-4">
          <div className="flex items-center gap-2 pl-2">
             <div className="w-6 h-[2px] bg-black/10 rounded-[8px]"></div>
             <h2 className="text-[12px] font-bold tracking-widest text-black/40">常用原材料库</h2>
          </div>
          
          <div className="bg-white/50 backdrop-blur-xl rounded-[8px] border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-4 flex flex-col">
             {['顶级牛腩', '完熟牛油果', '安佳淡奶油', '海盐焦糖'].map((asset, idx) => (
                <div key={asset} className={`flex justify-between items-center group cursor-pointer py-4 ${idx !== 3 ? 'border-b border-black/[0.04]' : ''}`}>
                   <span className="text-[15px] font-bold text-[#1C1C1E] group-hover:opacity-70 transition-opacity">{asset}</span>
                   <svg className="w-4 h-4 text-black/30 group-hover:text-black/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
             ))}
             <button className="text-left text-[13px] font-bold text-[#0A84FF] tracking-widest mt-4 py-2 hover:opacity-70 transition-opacity">
                + 追加新食材至云端库
             </button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 pl-2">
             <div className="w-6 h-[2px] bg-black/10 rounded-[8px]"></div>
             <h2 className="text-[12px] font-bold tracking-widest text-black/40">系统烹饪术语字典</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/50 backdrop-blur-xl rounded-[8px] border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-5 space-y-2">
              <h4 className="text-[14px] font-bold text-[#1C1C1E] tracking-widest">排酸熟成 <span className="opacity-40 text-[12px] ml-1 bg-white/50 px-1.5 py-0.5 rounded-[8px] font-sans">Aging</span></h4>
              <p className="text-[13px] text-black/40 font-medium leading-relaxed pt-1">
                受控的化学过程以分解肌肉纤维。能显著增强肉料理的口感深度和极限柔嫩度。
              </p>
            </div>
            
            <div className="bg-white/50 backdrop-blur-xl rounded-[8px] border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-5 space-y-2">
              <h4 className="text-[14px] font-bold text-[#1C1C1E] tracking-widest">低温慢煮 <span className="opacity-40 text-[12px] ml-1 bg-white/50 px-1.5 py-0.5 rounded-[8px] font-sans">Sous-Vide</span></h4>
              <p className="text-[13px] text-black/40 font-medium leading-relaxed pt-1">
                水浴环境下的高精度温度控制。确保同一批次的食材在核心温度上实现分子级别的一致性。
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 pl-2">
             <div className="w-6 h-[2px] bg-black/10 rounded-[8px]"></div>
             <h2 className="text-[12px] font-bold tracking-widest text-black/40">度量衡标准</h2>
          </div>
          
          <div className="flex gap-2">
             <div className="flex-1 p-5 bg-white/50 backdrop-blur-xl rounded-[8px] border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-black/40 tracking-widest">默认质量度量</span>
                <span className="text-[15px] font-extrabold text-[#1C1C1E]">公制 / 克 (g)</span>
             </div>
             <div className="flex-1 p-5 bg-white/50 backdrop-blur-xl rounded-[8px] border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-black/40 tracking-widest">默认容量度量</span>
                <span className="text-[15px] font-extrabold text-[#1C1C1E]">毫升 / 升 (ml)</span>
             </div>
          </div>
        </section>
      </main>

      <BottomDock activeTab="assets" />
    </motion.div>
  );
}
