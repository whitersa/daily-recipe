import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Recipe, IngredientGroup, StepGroup } from "@/lib/mocks";

interface Asset {
  id: number;
  name: string;
  type: string;
  description: string;
}

const COLORS = [
  { bloom: 'bloom-1' },
  { bloom: 'bloom-2' },
  { bloom: 'bloom-3' },
  { bloom: 'bloom-4' },
  { bloom: 'bloom-5' },
];

export default function RecipeDetail({ recipes }: { recipes: Recipe[] }) {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === Number(id));
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    fetch('/api/assets').then(res => res.json()).then(setAssets).catch(console.error);
  }, []);

  if (!recipe) {
    return <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-[12px] font-bold tracking-widest text-foreground/40">未找到指定档案</div>
    </div>;
  }

  const highlightAssets = (text: string) => {
    if (!assets.length || typeof text !== 'string') return text;
    const sortedAssets = [...assets].sort((a, b) => b.name.length - a.name.length);
    const pattern = new RegExp(`(${sortedAssets.map(a => a.name).join('|')})`, 'g');
    const parts = text.split(pattern);
    return parts.map((part, i) => {
      const asset = assets.find(a => a.name === part);
      if (asset) {
        return (
          <span key={i} className={`asset-link ${asset.type === 'ingredient' ? 'asset-ingredient' : 'asset-term'} font-bold transition-all`} title={asset.description}>
            <span className="asset-dot" />{part}
          </span>
        );
      }
      return part;
    });
  };

  const color = COLORS[recipe.id % COLORS.length];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[100vh] w-full relative overflow-hidden bg-background"
    >
      <div className="absolute top-0 left-0 w-full h-[60vh] overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-32 -left-20 w-[450px] h-[450px] rounded-[6px] ${color.bloom} blur-[100px] opacity-70`}></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full flex justify-between z-30 px-6 pt-[env(safe-area-inset-top,0.5rem)]">
         <Link to="/" className="p-3 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-sm rounded-[6px] text-foreground opacity-70 hover:opacity-100 transition-opacity">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
         </Link>
         <Link to={`/recipe/${id}/edit`} className="p-3 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-sm rounded-[6px] text-foreground opacity-70 hover:opacity-100 transition-opacity">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round"/></svg>
         </Link>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 w-full px-8 pt-32 pb-40">
         <div className="mb-14">
            <div className="flex items-center gap-3 mb-4 opacity-40">
               <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">{recipe.category}</span>
               <span className="w-1 h-1 rounded-full bg-foreground"></span>
               <span className="text-[10px] font-semibold tracking-wider text-foreground">{recipe.time}</span>
            </div>
            <h1 className="text-[44px] leading-[1.05] font-bold tracking-tight text-foreground mb-6 pr-4">{recipe.title}</h1>
            {recipe.description && <p className="text-[17px] text-foreground opacity-80 leading-relaxed font-medium">{recipe.description}</p>}
         </div>

         {/* --- GROUPED INGREDIENTS --- */}
         <div className="mb-14 space-y-10">
            <h3 className="text-[11px] font-bold text-foreground/40 tracking-widest uppercase border-b border-foreground/[0.04] pb-2">食材系统配置</h3>
            {(recipe.ingredients || []).map((group: any, gIdx: number) => (
              <div key={gIdx} className="space-y-4">
                <h4 className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.22em] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary/40"></div>
                  {typeof group === 'string' ? '基础' : group.name}
                </h4>
                <div className="space-y-1">
                  {(typeof group === 'string' ? [group] : group.items).map((item: string, iIdx: number) => (
                    <div key={iIdx} className="text-[16px] text-foreground font-medium border-b border-foreground/[0.04] py-3 pl-3">
                      {highlightAssets(item)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
         </div>

         {/* --- GROUPED STEPS --- */}
         <div className="space-y-12">
            <h3 className="text-[11px] font-bold text-foreground/40 tracking-widest uppercase border-b border-foreground/[0.04] pb-2">核心作业流程</h3>
            {(recipe.steps || []).map((group: any, gIdx: number) => (
              <div key={gIdx} className="space-y-6">
                <h4 className="text-[10px] font-bold text-accent/80 uppercase tracking-[0.22em] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent/60"></div>
                  {typeof group === 'string' ? '制作步骤' : group.name}
                </h4>
                <div className="space-y-6">
                  {(typeof group === 'string' ? [group] : group.items).map((step: string, sIdx: number) => (
                    <div key={sIdx} className="flex gap-4 items-start pl-3">
                      <span className="text-[14px] font-bold text-foreground opacity-30 w-6 shrink-0 pt-0.5">{sIdx + 1}.</span>
                      <div className="text-[16px] text-foreground leading-relaxed font-medium opacity-90">
                        {highlightAssets(step)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
         </div>
      </div>
    </motion.div>
  );
}
