import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import BottomDock from "@/components/BottomDock";
import { IngredientGroup, StepGroup } from "@/App";

export default function NewRecipe({ onRefresh }: { onRefresh: () => void }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("早餐");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  
  // Grouped States
  const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>([
    { name: "主料", items: [""] }
  ]);
  const [stepGroups, setStepGroups] = useState<StepGroup[]>([
    { name: "制作步骤", items: [""] }
  ]);
  
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/assets').then(res => res.json()).then(setAssets).catch(console.error);
  }, []);

  const isAssetMatched = (text: string) => {
    return assets.some(a => text.includes(a.name));
  };

  const handleSave = async () => {
    if (!title || !category) return;
    setLoading(true);
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, description, category, time, tags,
          ingredients: ingredientGroups.map(g => ({ ...g, items: g.items.filter(i => i.trim()) })),
          steps: stepGroups.map(g => ({ ...g, items: g.items.filter(i => i.trim()) }))
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

  const addGroup = (type: 'ing' | 'step') => {
    if (type === 'ing') {
      setIngredientGroups([...ingredientGroups, { name: `备选料 ${ingredientGroups.length}`, items: [""] }]);
    } else {
      setStepGroups([...stepGroups, { name: `后续工序`, items: [""] }]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[100dvh] overflow-hidden bg-[#F5F5F7]"
    >
      <header className="px-5 pt-[calc(0.5rem+env(safe-area-inset-top))] pb-3 flex items-center justify-between z-20 flex-none bg-white/40 backdrop-blur-md border-b border-black/[0.03]">
        <h1 className="text-[17px] font-bold tracking-tight text-[#1C1C1E]">新建档案.</h1>
        <button 
          onClick={handleSave} 
          disabled={loading || !title} 
          className="text-[13px] font-bold text-[#0A84FF] disabled:opacity-30 tracking-widest bg-blue-500/5 px-4 py-1.5 rounded-full"
        >
          {loading ? '...' : 'COMMIT'}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-8 pb-[120px]">
        <section className="space-y-3">
          <input 
            type="text" 
            value={title}
            placeholder="赋予此档案一个名称..."
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-transparent text-[20px] font-bold text-[#1C1C1E] outline-none placeholder:text-black/10"
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
              placeholder="耗时 (20min)..."
              onChange={e => setTime(e.target.value)}
              className="w-full bg-white border border-black/[0.05] rounded-[4px] px-3 py-1.5 text-[12px] font-bold outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 py-1">
            {['低脂', '高蛋白', '快手', '家常', '硬菜', '创意'].map(tag => (
              <button 
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2.5 py-1 rounded-[3px] text-[10px] font-bold tracking-tight transition-all ${
                  tags.includes(tag) ? 'bg-[#1C1C1E] text-white' : 'bg-white border border-black/5 text-black/30'
                }`}
              >
                {tag}
              </button>
            ))}
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
                <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-[50%]">
                   {assets.filter(a => a.type === 'ingredient').slice(0, 4).map(asset => (
                     <button key={asset.id} onClick={() => {
                       const next = [...ingredientGroups];
                       const items = next[gIdx].items;
                       items[items.length - 1] = (items[items.length - 1] + " " + asset.name).trim();
                       setIngredientGroups(next);
                     }} className="whitespace-nowrap px-1.5 py-0.5 bg-blue-500/5 text-blue-500/40 rounded-[2px] text-[8px] font-bold">
                       + {asset.name}
                     </button>
                   ))}
                </div>
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
          <button 
            onClick={() => addGroup('ing')}
            className="w-full border border-dashed border-black/5 rounded-[4px] py-2 text-[10px] font-bold text-black/20 tracking-widest hover:border-black/10 hover:text-black/40 transition-all"
          >
            + ADD INGREDIENT GROUP
          </button>
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
          <button 
            onClick={() => addGroup('step')}
            className="w-full border border-dashed border-black/5 rounded-[4px] py-2 text-[10px] font-bold text-black/20 tracking-widest hover:border-black/10 hover:text-black/40 transition-all"
          >
            + ADD PROCESS GROUP
          </button>
        </div>
      </main>

      <BottomDock activeTab="compose" />
    </motion.div>
  );
}
