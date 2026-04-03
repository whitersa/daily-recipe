import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Recipe, IngredientGroup, StepGroup } from "@/lib/mocks";

export default function EditRecipe({ recipes, onRefresh }: { recipes: Recipe[], onRefresh: () => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find(r => r.id === Number(id));

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(recipe?.title || "");
  const [emoji, setEmoji] = useState(recipe?.emoji || "🥘");
  const [category, setCategory] = useState(recipe?.category || "早餐");
  const [description, setDescription] = useState(recipe?.description || "");
  const [time, setTime] = useState(recipe?.time || "");
  const [tags, setTags] = useState<string[]>(recipe?.tags || []);
  
  const normalize = (data: any, defaultName: string) => {
    if(!data || data.length === 0) return [{ name: defaultName, items: [""] }];
    if(typeof data[0] === 'string') return [{ name: "迁移数据", items: data }];
    return data;
  };

  const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>(normalize(recipe?.ingredients, "主要食材"));
  const [stepGroups, setStepGroups] = useState<StepGroup[]>(normalize(recipe?.steps, "制作步骤"));
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
          title, emoji, description, category, time, tags,
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
      setIngredientGroups([...ingredientGroups, { name: `备选料`, items: [""] }]);
    } else {
      setStepGroups([...stepGroups, { name: `后续工序`, items: [""] }]);
    }
  };

  if (!recipe) {
    return <div className="p-8 text-center mt-20 text-[#8E8C87] text-[12px] font-bold tracking-[0.4em]">未找到食谱索引</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[100vh] w-full relative overflow-hidden bg-background"
    >
      <header className="px-5 pt-[env(safe-area-inset-top,0px)] mt-2 pb-2 flex items-center justify-between z-20 flex-none bg-background/40 backdrop-blur-md border-b border-foreground/[0.03]">
        <Link to={`/recipe/${id}`} className="p-1 text-foreground/40 hover:text-foreground transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
        <button onClick={handleUpdate} disabled={loading || !title} className="text-[14px] font-bold text-primary disabled:opacity-30 tracking-widest bg-primary/10 px-6 py-2 rounded-full">
          {loading ? '...' : 'SAVE'}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-8 pb-32">
        <section className="space-y-4">
          <div className="flex gap-4 items-start">
             {/* Dynamic Emoji Input Square */}
             <div className="flex-none">
                <input 
                  type="text" 
                  value={emoji}
                  maxLength={2}
                  onChange={e => setEmoji(e.target.value)}
                  className="w-16 h-16 bg-white border border-foreground/[0.05] rounded-[10px] text-center text-[32px] outline-none shadow-sm focus:border-primary transition-all"
                />
                <span className="block text-[8px] font-bold text-center mt-1 text-foreground/20 tracking-tighter uppercase">ARCHIVE ICON</span>
             </div>
             
             <div className="flex-1 space-y-2">
                <input 
                  type="text" 
                  value={title}
                  placeholder="命名此食谱档案..."
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-transparent text-[22px] font-bold text-foreground outline-none"
                />
                {/* Category Pills replacing Select */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['早餐', '午餐', '晚餐', '甜点', '轻食'].map(cat => {
                    const isActive = category === cat;
                    return (
                      <button 
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`relative flex items-center justify-center px-3.5 py-1.5 rounded-[4px] text-[11px] font-bold transition-all ${
                          isActive 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'bg-white border border-foreground/[0.05] text-foreground/30 hover:bg-foreground/[0.01]'
                        }`}
                      >
                        <span className="-translate-y-[0.5px]">{cat}</span>
                      </button>
                    );
                  })}
                </div>
                
                <input 
                  type="text" 
                  value={time}
                  placeholder="烹饪时长 (例: 20min)"
                  onChange={e => setTime(e.target.value)}
                  className="w-full bg-white border border-foreground/[0.05] rounded-[8px] px-3 py-2 text-[12px] font-bold outline-none placeholder:text-foreground/20 shadow-sm focus:border-primary transition-all"
                />
              </div>
           </div>

           <div className="space-y-4">
              <label className="text-[10px] font-bold tracking-[0.2em] text-foreground uppercase opacity-40 ml-1">标签分类 (TAGS)</label>
              <div className="flex flex-wrap gap-1.5">
                {['快餐', '传统', '硬菜', '低脂', '减脂', '深夜食堂'].map((tag) => {
                  const isSelected = tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3.5 py-1.5 rounded-[4px] text-[11px] font-bold transition-all ${
                        isSelected 
                        ? 'bg-accent text-foreground' 
                        : 'bg-white border border-foreground/5 text-foreground/30'
                      }`}
                    >
                      <span className="-translate-y-[0.5px]">{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>
        </section>

         <div className="space-y-6">
          {ingredientGroups.map((group, gIdx) => (
            <section key={gIdx} className="space-y-3">
              <div className="flex items-center justify-between pl-0.5 border-b border-foreground/[0.03] pb-1.5">
                <input value={group.name} onChange={e => { const next = [...ingredientGroups]; next[gIdx].name = e.target.value; setIngredientGroups(next); }} className="text-[11px] font-bold tracking-widest text-primary/60 uppercase bg-transparent outline-none w-[40%]" />
              </div>
              <div className="space-y-1.5">
                {group.items.map((item, iIdx) => (
                  <input key={iIdx} type="text" value={item} onChange={e => { const next = [...ingredientGroups]; next[gIdx].items[iIdx] = e.target.value; setIngredientGroups(next); }} className={`w-full bg-white border border-foreground/[0.03] rounded-[4px] px-3 py-1.5 text-[14px] font-medium outline-none ${isAssetMatched(item) ? 'bg-primary/10 border-primary/20' : ''}`} />
                ))}
                <button onClick={() => { const next = [...ingredientGroups]; next[gIdx].items.push(""); setIngredientGroups(next); }} className="w-full py-1 text-[9px] font-bold text-foreground/20 tracking-[0.2em] hover:text-foreground/42">+ ITEM</button>
              </div>
            </section>
          ))}
          <button onClick={() => addGroup('ing')} className="w-full border border-dashed border-foreground/10 rounded-[4px] py-1.5 text-[10px] font-bold text-foreground/40 tracking-widest uppercase">+ ADD GROUP</button>
        </div>
      </main>
    </motion.div>
  );
}
