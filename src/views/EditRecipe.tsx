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

  const handleUpdate = async () => {
    if (!title || !recipe) return;
    setLoading(true);
    try {
      const res = await fetch('/api/recipes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: recipe.id, title, description, category, time,
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
      <header className="px-8 pt-[calc(2rem+env(safe-area-inset-top))] pb-6 flex flex-col bg-white border-b border-black/5 flex-none">
        <div className="flex justify-between items-center mb-6">
          <Link to={`/recipe/${id}`} className="text-[#1C1C1E] hover:text-[#5D6B67] transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7"/></svg>
          </Link>
          <h1 className="text-[17px] font-bold tracking-widest text-[#1C1C1E]">
            编辑档案
          </h1>
          <div className="w-5"></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-8 py-6 space-y-5">
        <section className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-black/40 ml-1">档案名称</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-[8px] px-4 py-3.5 text-[16px] text-[#1C1C1E] font-bold focus:border-[#1C1C1E] transition-all outline-none shadow-sm"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-black/40 ml-1">归属标签</label>
              <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-[8px] px-4 py-3.5 text-[16px] text-[#1C1C1E] font-bold focus:border-[#1C1C1E] transition-all outline-none shadow-sm"
              >
                {['早餐', '午餐', '晚餐', '甜点', '轻食'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-black/40 ml-1">详细描述</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-white border border-black/5 rounded-[8px] px-4 py-3.5 text-[16px] text-[#1C1C1E] font-medium focus:border-[#1C1C1E] transition-all outline-none resize-none shadow-sm"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-black/40 ml-1">预计耗时</label>
              <input 
                type="text" 
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-[8px] px-4 py-3.5 text-[16px] text-[#1C1C1E] font-bold focus:border-[#1C1C1E] transition-all outline-none shadow-sm"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2">
             <div className="w-6 h-[2px] bg-black/10 rounded-[8px]"></div>
             <h2 className="text-[12px] font-bold tracking-widest text-black/40">原材料管理</h2>
          </div>
          <div className="space-y-3">
            {(recipe.ingredients || []).map((ing, idx) => (
              <div key={idx} className="flex gap-3">
                <input 
                  type="text" 
                  defaultValue={ing}
                  className="flex-1 bg-white border border-black/5 rounded-[8px] px-4 py-3 text-[16px] text-[#1C1C1E] font-medium focus:border-[#1C1C1E] transition-all outline-none shadow-sm"
                />
              </div>
            ))}
            <button className="w-full border-2 border-dashed border-black/10 rounded-[8px] py-3.5 text-[12px] font-bold text-black/40 tracking-widest hover:border-[#1C1C1E] hover:text-[#1C1C1E] transition-all">
              + 追加食材记录
            </button>
          </div>
        </section>
      </main>

      <footer className="px-8 pb-10 pt-1 bg-[#F5F5F7] flex gap-2">
         <Link to={`/recipe/${id}`} className="flex-1 bg-white border text-center border-black/5 text-black/40 py-4 rounded-[8px] text-[13px] font-bold tracking-widest transition-all shadow-sm">
          放弃修改
        </Link>
        <motion.button whileTap={{ scale: 0.96 }} onClick={handleUpdate} disabled={loading || !title} className="flex-[2] bg-[#1C1C1E] text-white py-4 rounded-[8px] text-[13px] font-bold tracking-widest shadow-[0_8px_20px_rgba(0,0,0,0.15)] disabled:opacity-50">
          {loading ? '同步中...' : '提交档案修正'}
        </motion.button>
      </footer>
    </motion.div>
  );
}
