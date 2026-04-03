import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BottomDock from "@/components/BottomDock";

interface Asset {
  id?: number;
  name: string;
  type: string;
  description: string;
}

export default function Assets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loadingType, setLoadingType] = useState<string | null>(null);
  
  // Inline States for Quick Add
  const [ingName, setIngName] = useState("");
  const [termName, setTermName] = useState("");

  const fetchAssets = () => {
    fetch('/api/assets').then(res => res.json()).then(setAssets).catch(console.error);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleQuickAdd = async (name: string, type: string) => {
    if (!name) return;
    setLoadingType(type);
    try {
      const res = await fetch('/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, description: "" })
      });
      if (res.ok) {
        fetchAssets();
        if(type === 'ingredient') setIngName("");
        else setTermName("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col absolute inset-0 overflow-hidden bg-background"
    >
      <header className="px-5 pt-[env(safe-area-inset-top,0px)] mt-2 pb-2 flex items-center justify-end z-20 flex-none bg-background/40 backdrop-blur-md border-b border-foreground/[0.03]">
        <span className="text-[10px] font-bold text-foreground/20 tracking-widest uppercase">SYMBOLOGY CORE / {assets.length} ITEMS</span>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-8 pb-[120px]">
        
        {/* Section 1: Ingredients */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-foreground/[0.03] pb-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
              <h2 className="text-[13px] font-bold text-foreground tracking-tight">核心食材库</h2>
            </div>
            <span className="text-[10px] font-bold text-foreground/20 uppercase">{assets.filter(a => a.type === 'ingredient').length} ITEMS</span>
          </div>

          <div className="flex flex-col gap-1.5">
            {assets.filter(a => a.type === 'ingredient').map(asset => (
              <div key={asset.id} className="bg-white border border-foreground/[0.02] rounded-[4px] px-3 py-2 flex justify-between items-center group shadow-sm transition-all hover:border-primary/20">
                <span className="text-[14px] font-medium text-foreground">{asset.name}</span>
                <span className="text-[8px] font-bold text-foreground/10 transition-opacity group-hover:opacity-100 opacity-0 tracking-tighter">DELETE</span>
              </div>
            ))}
            
            {/* Inline Quick Add - Ingredients */}
            <div className="relative mt-1">
              <input 
                type="text" 
                placeholder="追加新食材..." 
                value={ingName}
                onChange={e => setIngName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleQuickAdd(ingName, 'ingredient')}
                className="w-full bg-white/60 border border-dashed border-foreground/10 rounded-[4px] px-3 py-2 text-[13px] font-medium outline-none focus:border-primary/30 focus:bg-white transition-all"
              />
              <button 
                onClick={() => handleQuickAdd(ingName, 'ingredient')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-primary/40 hover:text-primary"
              >
                {loadingType === 'ingredient' ? '...' : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="3" strokeLinecap="round"/></svg>}
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Techniques */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-foreground/[0.03] pb-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
              <h2 className="text-[13px] font-bold text-foreground tracking-tight">标准处理工序</h2>
            </div>
            <span className="text-[10px] font-bold text-foreground/20 uppercase">{assets.filter(a => a.type === 'term').length} TERMS</span>
          </div>

          <div className="flex flex-col gap-1.5">
            {assets.filter(a => a.type === 'term').map(asset => (
              <div key={asset.id} className="bg-white border border-foreground/[0.02] rounded-[4px] px-3 py-2 flex justify-between items-center group shadow-sm transition-all hover:border-accent/30">
                <span className="text-[14px] font-medium text-foreground">{asset.name}</span>
                <span className="text-[8px] font-bold text-foreground/10 transition-opacity group-hover:opacity-100 opacity-0 tracking-tighter">DELETE</span>
              </div>
            ))}
            
            {/* Inline Quick Add - Techniques */}
            <div className="relative mt-1">
              <input 
                type="text" 
                placeholder="追加处理工艺..." 
                value={termName}
                onChange={e => setTermName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleQuickAdd(termName, 'term')}
                className="w-full bg-white/60 border border-dashed border-foreground/10 rounded-[4px] px-3 py-2 text-[13px] font-medium outline-none focus:border-accent/40 focus:bg-white transition-all"
              />
              <button 
                onClick={() => handleQuickAdd(termName, 'term')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-accent/50 hover:text-accent"
              >
                {loadingType === 'term' ? '...' : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="3" strokeLinecap="round"/></svg>}
              </button>
            </div>
          </div>
        </section>

        <section className="pt-10 opacity-40 hover:opacity-100 transition-opacity">
           <div className="p-4 rounded-[6px] border border-foreground/5 bg-foreground/[0.01] space-y-2">
              <h4 className="text-[11px] font-bold text-foreground/40 tracking-widest uppercase">存档哲学</h4>
              <p className="text-[12px] text-foreground/30 leading-relaxed italic">
                这里保存的是你烹饪宇宙中的“原子”。你在这里定义的每一个词，都会自动在所有的档案正文中生效。减少噪音，建立标准。
              </p>
           </div>
        </section>

      </main>

      <BottomDock activeTab="assets" />
    </motion.div>
  );
}
