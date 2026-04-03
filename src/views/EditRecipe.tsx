import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Recipe, IngredientGroup, StepGroup } from "@/App";

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
  
  // Normalization logic for migration
  const normalize = (data: any, defaultName: string) => {
    if(!data || data.length === 0) return [{ name: defaultName, items: [""] }];
    if(typeof data[0] === 'string') return [{ name: "迁移数据", items: data }];
    return data;
  };

  const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>(
    normalize(recipe?.ingredients, "主要食材")
  );
  
  const [stepGroups, setStepGroups] = useState<StepGroup[]>(
    normalize(recipe?.steps, "制作步骤")
  );

  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/assets').then(res => res.json()).then(setAssets).catch(console.error);
  }, []);

  const isAssetMatched = (text: string) => {
    return assets.some(a => text.includes(a.name));
  };

  const handleUpdate = async () => {
    if (!title || !recipe) return;
    setLoading(true);
    try {
      const res = await fetch('/api/recipes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: recipe.id, 
          title, description, category, time, tags,
          ingredients: ingredientGroups.map(g => ({ ...g, items: g.items.filter(i => i.trim()) })),
          steps: stepGroups.map(g => ({ ...g, items: g.items.filter(i => i.trim()) }))
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

  const addGroup = (type: 'ing' | 'step') => {
    if (type === 'ing') {
      setIngredientGroups([...ingredientGroups, { name: `辅助料`, items: [""] }]);
    } else {
      setStepGroups([...stepGroups, { name: `下一步骤`, items: [""] }]);
    }
  };

  if (!recipe) {
    return <div className="p-8 text-center mt-20 text-[#8E8C87] text-[12px] font-bold tracking-[0.4em]">未找到食谱索引</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[100dvh] overflow-hidden bg-[#F5F5F7]"
    >
      <header className="px-5 pt-[calc(0.5rem+env(safe-area-inset-top))] pb-3 flex items-center justify-between z-20 flex-none bg-white/40 backdrop-blur-md border-b border-black/[0.03]">
        <div className="flex items-center gap-3">
          <Link to={`/recipe/${id}`} className="p-1 text-black/40 hover:text-black">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <h1 className="text-[17px] font-bold tracking-tight text-[#1C1C1E]">编辑档案.</h1>
        </div>
        <button onClick={handleUpdate} disabled={loading || !title} className="text-[13px] font-bold text-[#0A84FF] disabled:opacity-30 tracking-widest bg-blue-500/5 px-4 py-1.5 rounded-full">
          {loading ? '...' : 'SAVE'}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-8 pb-32">
        <section className="space-y-3">
          <input 
            type="text" 
            value={title}
            placeholder="档案名称..."
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-transparent text-[20px] font-bold text-[#1C1C1E] outline-none"
          />
          <div className="grid grid-cols-2 gap-2">
            <select 
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-white border border-black/[0.05] rounded-[4px] px-3 py-1.5 text-[12px] font-bold outline-none"
            >
              {['早餐', '午餐', '晚餐', '甜点', '轻食'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input 
              type="text" 
              value={time}
              placeholder="耗时..."
              onChange={e => setTime(e.target.value)}
              className="w-full bg-white border border-black/[0.05] rounded-[4px] px-3 py-1.5 text-[12px] font-bold outline-none"
            />
          </div>
        </section>

        {/* --- INGREDIENTS GROUPS --- */}
        <div className="space-y-6">
          {ingredientGroups.map((group, gIdx) => (
            <section key={gIdx} className="space-y-3">
              <div className="flex items-center justify-between pl-0.5 border-b border-black/[0.03] pb-1.5">
                <input 
                  value={group.name}
                  onChange={e => {
                    const next = [...ingredientGroups];
                    next[gIdx].name = e.target.value;
                    setIngredientGroups(next);
                  }}
                  className="text-[11px] font-bold tracking-widest text-blue-500/60 uppercase bg-transparent outline-none w-[40%]"
                />
              </div>
              <div className="space-y-1.5">
                {group.items.map((item, iIdx) => (
                  <input 
                    key={iIdx}
                    type="text" 
                    value={item}
                    onChange={e => {
                      const next = [...ingredientGroups];
                      next[gIdx].items[iIdx] = e.target.value;
                      setIngredientGroups(next);
                    }}
                    className={`w-full bg-white border border-black/[0.03] rounded-[4px] px-3 py-1.5 text-[14px] font-medium outline-none ${isAssetMatched(item) ? 'bg-blue-50/30 border-blue-100' : ''}`}
                  />
                ))}
                <button 
                  onClick={() => {
                    const next = [...ingredientGroups];
                    next[gIdx].items.push("");
                    setIngredientGroups(next);
                  }}
                  className="w-full py-1 text-[9px] font-bold text-black/10 tracking-[0.2em] hover:text-black/20"
                >
                  + ITEM
                </button>
              </div>
            </section>
          ))}
          <button onClick={() => addGroup('ing')} className="w-full border border-dashed border-black/5 rounded-[4px] py-1.5 text-[10px] font-bold text-black/20 tracking-widest uppercase">+ ADD GROUP</button>
        </div>

        {/* --- STEPS GROUPS --- */}
        <div className="space-y-8 pt-4">
          {stepGroups.map((group, gIdx) => (
            <section key={gIdx} className="space-y-3">
              <div className="flex items-center justify-between pl-0.5 border-b border-black/[0.03] pb-1.5">
                <input 
                  value={group.name}
                  onChange={e => {
                    const next = [...stepGroups];
                    next[gIdx].name = e.target.value;
                    setStepGroups(next);
                  }}
                  className="text-[11px] font-bold tracking-widest text-rose-500/60 uppercase bg-transparent outline-none w-[40%]"
                />
              </div>
              <div className="space-y-2">
                 {group.items.map((step, sIdx) => (
                   <div key={sIdx} className="flex gap-2 items-start">
                     <span className="text-[9px] font-bold text-black/10 pt-2.5 w-3">{sIdx + 1}</span>
                     <textarea 
                        value={step}
                        onChange={e => {
                          const next = [...stepGroups];
                          next[gIdx].items[sIdx] = e.target.value;
                          setStepGroups(next);
                        }}
                        className={`flex-1 bg-white border border-black/[0.03] rounded-[4px] px-3 py-2 text-[14px] font-medium min-h-[50px] outline-none ${isAssetMatched(step) ? 'bg-rose-50/30 border-rose-100' : ''}`}
                     />
                   </div>
                 ))}
                 <button 
                  onClick={() => {
                    const next = [...stepGroups];
                    next[gIdx].items.push("");
                    setStepGroups(next);
                  }}
                  className="w-full py-1 text-[9px] font-bold text-black/10 tracking-[0.2em] hover:text-black/20"
                >
                  + STEP
                </button>
              </div>
            </section>
          ))}
          <button onClick={() => addGroup('step')} className="w-full border border-dashed border-black/5 rounded-[4px] py-1.5 text-[10px] font-bold text-black/20 tracking-widest uppercase">+ ADD GROUP</button>
        </div>
      </main>
    </motion.div>
  );
}
