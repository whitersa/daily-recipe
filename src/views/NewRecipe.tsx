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

  const [tags, setTags] = useState<string[]>([]);

  const handleSave = async () => {
    if (!title || !category) return;
    setLoading(true);
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, description, category, time, tags,
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

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[100dvh] overflow-hidden bg-[#F5F5F7]"
    >
      <header className="px-6 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-6 flex flex-col z-20 flex-none relative">
        <div className="mb-4 flex flex-col">
          <h1 className="text-[30px] font-bold tracking-tight text-[#1C1C1E] leading-tight">
            撰写新档案<span className="text-[#0A84FF]">.</span>
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pt-1 pb-[100px] space-y-5">
        <section className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-[#1C1C1E]/40 ml-1 uppercase">档案名称</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="例如：深夜热汤面..."
                className="w-full bg-white/60 border border-white/80 rounded-[6px] px-4 py-3.5 text-[16px] text-[#1C1C1E] font-bold focus:bg-white focus:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all outline-none"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-[#1C1C1E]/40 ml-1 uppercase">归属分类</label>
              <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-white/60 border border-white/80 rounded-[6px] px-4 py-3.5 text-[16px] text-[#1C1C1E] font-bold focus:bg-white outline-none appearance-none"
              >
                {['早餐', '午餐', '晚餐', '甜点', '轻食'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-[#1C1C1E]/40 ml-1 uppercase">档案特征 (TAGS)</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {['低脂', '高蛋白', '快手', '家常', '硬菜', '创意'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-[4px] text-[12px] font-medium tracking-wide transition-all ${
                      tags.includes(tag) 
                      ? 'bg-[#1C1C1E] text-white shadow-md' 
                      : 'bg-white border border-black/5 text-black/40 hover:bg-black/5'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 pt-2">
          <div className="flex items-center gap-2 pl-1">
             <div className="w-1.5 h-1.5 rounded-full bg-[#1C1C1E]"></div>
             <h2 className="text-[12px] font-bold tracking-widest text-[#1C1C1E] uppercase">时效规格</h2>
          </div>
          <input 
            type="text" 
            value={time}
            onChange={e => setTime(e.target.value)}
            placeholder="例如：20 分钟..."
            className="w-full bg-white/60 border border-white/80 rounded-[6px] px-4 py-3.5 text-[16px] text-[#1C1C1E] font-bold focus:bg-white transition-all outline-none"
          />
        </section>

        <section className="pt-6">
          <motion.button 
            whileTap={{ scale: 0.96 }} 
            onClick={handleSave} 
            disabled={loading || !title} 
            className="w-full bg-[#1C1C1E] text-white py-4 rounded-[10px] text-[15px] font-bold tracking-[0.2em] shadow-[0_8px_20px_rgba(0,0,0,0.15)] disabled:opacity-50"
          >
            {loading ? 'INITIALIZING...' : 'GENERATE ARCHIVE'}
          </motion.button>
        </section>
      </main>

      <BottomDock activeTab="compose" />
    </motion.div>
  );
}
