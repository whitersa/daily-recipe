import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Recipe } from "@/App";

export default function EditRecipe({ recipes, onRefresh }: { recipes: Recipe[], onRefresh: () => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find(r => r.id === Number(id));

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(recipe?.title || "");
  const [category, setCategory] = useState(recipe?.category || "早餐");
  const [description, setDescription] = useState(recipe?.description || "");
  const [time, setTime] = useState(recipe?.time || "");

  const [tags, setTags] = useState<string[]>(recipe?.tags || []);

  const handleUpdate = async () => {
    if (!title || !recipe) return;
    setLoading(true);
    try {
      const res = await fetch('/api/recipes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: recipe.id, title, description, category, time, tags,
          ingredients: recipe.ingredients,
          steps: recipe.steps
        })
      });
      if(res.ok) {
        onRefresh();
        navigate(`/recipe/${id}`);
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

  if (!recipe) {
    return <div className="p-8 text-center mt-20 text-[#8E8C87] text-[12px] font-bold tracking-[0.4em]">未找到食谱索引</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-[100dvh] overflow-hidden bg-[#F5F5F7]"
    >
      <header className="px-8 pt-[calc(0.5rem+env(safe-area-inset-top))] pb-6 flex flex-col z-20 flex-none relative">
        <div className="mb-3 flex items-center justify-between">
          <Link to={`/recipe/${id}`} className="p-2 -ml-3 text-black/40 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
        <h1 className="text-[30px] font-bold tracking-tight text-[#1C1C1E] leading-tight">
          编辑档案<span className="text-[#0A84FF]">.</span>
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-8 py-6 space-y-5">
        <section className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-black/40 ml-1 uppercase">档案名称</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-[6px] px-4 py-3.5 text-[16px] text-[#1C1C1E] font-bold focus:border-[#1C1C1E] transition-all outline-none shadow-sm"
              />
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

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-black/40 ml-1 uppercase">归属分类</label>
              <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-[6px] px-4 py-3.5 text-[16px] text-[#1C1C1E] font-bold focus:border-[#1C1C1E] transition-all outline-none shadow-sm"
              >
                {['早餐', '午餐', '晚餐', '甜点', '轻食'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-black/40 ml-1 uppercase">预计耗时</label>
              <input 
                type="text" 
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-[6px] px-4 py-3.5 text-[16px] text-[#1C1C1E] font-bold focus:border-[#1C1C1E] transition-all outline-none shadow-sm"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-[#1C1C1E]"></div>
             <h2 className="text-[12px] font-bold tracking-widest text-black/40 uppercase">原材料管理</h2>
          </div>
          <div className="space-y-3">
            {(recipe.ingredients || []).map((ing, idx) => (
              <div key={idx} className="flex gap-3">
                <input 
                  type="text" 
                  defaultValue={ing}
                  className="flex-1 bg-white border border-black/5 rounded-[6px] px-4 py-3 text-[16px] text-[#1C1C1E] font-medium focus:border-[#1C1C1E] transition-all outline-none shadow-sm"
                />
              </div>
            ))}
            <button className="w-full border-2 border-dashed border-black/10 rounded-[6px] py-3.5 text-[12px] font-bold text-black/40 tracking-widest hover:border-[#1C1C1E] hover:text-[#1C1C1E] transition-all">
              + 追加食材记录
            </button>
          </div>
        </section>
      </main>

      <footer className="px-8 pb-10 pt-1 bg-[#F5F5F7] flex gap-2">
         <Link to={`/recipe/${id}`} className="flex-1 bg-white border text-center border-black/5 text-[#1C1C1E]/40 py-4 rounded-[6px] text-[13px] font-bold tracking-widest transition-all shadow-sm">
          CANCEL
        </Link>
        <motion.button whileTap={{ scale: 0.96 }} onClick={handleUpdate} disabled={loading || !title} className="flex-[2] bg-[#1C1C1E] text-white py-4 rounded-[6px] text-[13px] font-bold tracking-[0.2em] shadow-[0_8px_20px_rgba(0,0,0,0.15)] disabled:opacity-50">
          {loading ? 'SYNCING...' : 'COMMIT CHANGES'}
        </motion.button>
      </footer>
    </motion.div>
  );
}
