import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import BottomDock from "@/components/BottomDock";

export default function NewRecipe({ onRefresh }: { onRefresh: () => void }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("早餐");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const handleSave = async () => {
    if (!title || !category) return;
    setLoading(true);
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, description, category, time,
          ingredients: ['系统初始食材配置'],
          steps: ['系统初始步骤配置']
        })
      });
      if(res.ok) {
        onRefresh();
        navigate('/');
      }
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[100dvh] overflow-hidden bg-[#F5F5F7]"
    >
      <header className="px-6 pt-[calc(2.25rem+env(safe-area-inset-top))] pb-0 flex flex-col z-20 flex-none relative">
        <div className="mb-1 flex justify-between items-center">
          <div className="w-[46px]"></div> {/* Spacer layout alignment */}
          <h1 className="text-[17px] font-bold tracking-widest text-[#1C1C1E] text-center w-full">
            起草新档案
          </h1>
          <div className="w-[46px]"></div> {/* Spacer */}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pt-1 pb-[220px] space-y-5">
        <section className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-[#1C1C1E]/40 ml-1">档案名称</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="例如：深夜热汤面..."
                className="w-full bg-white border border-white/80 rounded-[8px] px-4 py-3.5 text-[15px] text-[#1C1C1E] font-bold focus:shadow-[0_4px_24px_rgba(0,0,0,0.04)] focus:scale-[1.01] transition-all outline-none shadow-sm"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-[#1C1C1E]/40 ml-1">归属分类</label>
              <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-white border border-white/80 rounded-[8px] px-4 py-3.5 text-[14px] text-[#1C1C1E] font-bold focus:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all outline-none shadow-sm appearance-none"
              >
                {['早餐', '午餐', '晚餐', '甜点', '轻食'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-[#1C1C1E]/40 ml-1">美味图鉴与说明</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="描述一下这道菜的特点..."
                rows={4}
                className="w-full bg-white border border-white/80 rounded-[8px] px-4 py-3.5 text-[14px] text-[#1C1C1E] font-medium focus:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all outline-none resize-none shadow-sm"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 pl-2">
             <div className="w-6 h-[2px] bg-black/10 rounded-[8px]"></div>
             <h2 className="text-[12px] font-bold tracking-widest text-[#1C1C1E]/40">时效规格</h2>
          </div>
          <div className="flex flex-col gap-1.5">
            <input 
              type="text" 
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="预计消耗时长，例如：20 分钟..."
              className="w-full bg-white border border-white/80 rounded-[8px] px-4 py-3.5 text-[14px] text-[#1C1C1E] font-bold focus:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all outline-none shadow-sm"
            />
          </div>
        </section>

        <section className="pt-6">
          <motion.button whileTap={{ scale: 0.96 }} onClick={handleSave} disabled={loading || !title} className="w-full bg-[#1C1C1E] text-white py-4 rounded-[8px] text-[14px] font-bold tracking-widest shadow-[0_8px_20px_rgba(0,0,0,0.15)] disabled:opacity-50 transition-all">
            {loading ? '正在初始化...' : '创建档案系统'}
          </motion.button>
        </section>
      </main>

      <BottomDock activeTab="compose" />
    </motion.div>
  );
}
