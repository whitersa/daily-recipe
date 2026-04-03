import { motion } from "framer-motion";
import ManualUpdateButton from "@/components/ManualUpdateButton";
import BottomDock from "@/components/BottomDock";

export default function Settings() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[100vh] w-full relative overflow-hidden bg-background"
    >
      <header className="px-6 pt-[env(safe-area-inset-top,0px)] mt-2 pb-2 flex flex-col z-20 flex-none relative">
        <div className="mb-4 flex flex-col">
          <h1 className="text-[30px] font-bold tracking-tight text-foreground leading-tight">
            系统设置<span className="text-primary">.</span>
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 py-4 space-y-6 pb-[120px]">
        <section className="space-y-4">
          <div className="flex items-center gap-2 pl-2">
             <div className="w-6 h-[2px] bg-foreground/10 rounded-[6px]"></div>
             <h2 className="text-[12px] font-bold tracking-widest text-foreground/40">云端协议</h2>
          </div>
          
          <div className="bg-white/50 backdrop-blur-xl rounded-[6px] border border-foreground/[0.03] shadow-[0_4px_24px_rgba(225,82,61,0.02)] p-6 flex flex-col items-center gap-2 text-center">
             <div className="w-14 h-14 bg-foreground rounded-[6px] flex items-center justify-center text-white shadow-lg shrink-0">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round"/></svg>
             </div>
             <div>
                <h3 className="text-[15px] font-bold text-foreground tracking-widest mb-1.5">远程同步就绪</h3>
                <p className="text-[12px] text-foreground/40 leading-relaxed">您的食谱档案、自定义原材料字典正在与 Vercel Postgres 云端保持一致步调。</p>
             </div>
             
             <button className="w-full mt-2 bg-primary text-white py-3.5 rounded-[6px] text-[13px] font-bold tracking-widest shadow-[0_8px_20px_rgba(225,82,61,0.15)] active:scale-[0.98] transition-all">
                执行强缓存覆盖
             </button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 pl-2">
             <div className="w-6 h-[2px] bg-foreground/10 rounded-[6px]"></div>
             <h2 className="text-[12px] font-bold tracking-widest text-foreground/40">客户端配置</h2>
          </div>
          <div className="bg-white/50 backdrop-blur-xl rounded-[6px] border border-foreground/[0.03] shadow-sm p-4 flex flex-col gap-2">
            <ManualUpdateButton />
            <div className="text-center pt-2 pb-1 text-foreground/40 text-[10px] tracking-widest">
               APP VERSION 2.0.0 (SHAPELESS UI)
            </div>
          </div>
        </section>
      </main>

      <BottomDock activeTab="settings" />
    </motion.div>
  );
}
