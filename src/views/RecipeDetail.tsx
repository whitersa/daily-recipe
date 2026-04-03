import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Recipe } from "@/App";

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

  if (!recipe) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
      <div className="text-[12px] font-bold tracking-widest text-black/40">未寻找到指定档案</div>
    </div>;
  }

  const color = COLORS[recipe.id % COLORS.length];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col h-[100dvh] overflow-hidden bg-[#F5F5F7] relative"
    >
      {/* Amorphous Background Glow. No Card Headers. */}
      <div className="absolute top-0 left-0 w-full h-[60vh] overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-32 -left-20 w-[450px] h-[450px] rounded-[6px] ${color.bloom} blur-[100px] opacity-70`}></div>
        <div className={`absolute top-20 right-[-100px] w-[300px] h-[300px] rounded-[6px] ${color.bloom} blur-[80px] opacity-40`}></div>
      </div>
      
      {/* Subtle Ghost Capsules for Top Nav */}
      <div className="absolute top-0 left-0 w-full flex justify-between z-30 px-6 pt-[calc(1.5rem+env(safe-area-inset-top,0px))]">
         <Link to="/" className="p-3 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-sm rounded-[6px] text-[#1C1C1E] opacity-70 hover:opacity-100 transition-opacity outline-none">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7"/></svg>
         </Link>
         <Link to={`/recipe/${id}/edit`} className="p-3 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-sm rounded-[6px] text-[#1C1C1E] opacity-70 hover:opacity-100 transition-opacity outline-none">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
         </Link>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 w-full px-8 pt-32 pb-40">
         {/* Containerless Content Header Stack */}
         <div className="mb-14">
            <div className="flex items-center gap-3 mb-4 opacity-40">
               <span className="text-[10px] font-bold uppercase tracking-widest">{recipe.category}</span>
               <span className="w-1 h-1 rounded-[6px] bg-[#1C1C1E]"></span>
               <span className="text-[10px] font-semibold tracking-wider">{recipe.time}</span>
            </div>
            
            <h1 className="text-[44px] leading-[1.05] font-bold tracking-tight text-[#1C1C1E] mb-6 pr-4">
              {recipe.title}
            </h1>
            
            <p className="text-[17px] text-[#1C1C1E] opacity-70 leading-relaxed font-medium">
              {recipe.description}
            </p>
         </div>

         {/* Ghostly Segment Division Lines Instead of Massive Boxes */}
         <div className="mb-12">
            <h3 className="text-[11px] font-bold text-black/40 tracking-widest mb-6">配置原材料</h3>
            <div className="space-y-1">
              {(recipe.ingredients || []).map((item, idx) => (
                <div key={idx} className="text-[16px] text-[#1C1C1E] font-medium border-b border-black/[0.04] py-3">{item}</div>
              ))}
            </div>
         </div>

         <div>
            <h3 className="text-[11px] font-bold text-black/40 tracking-widest mb-6">核心制作步骤</h3>
            <div className="space-y-6">
              {(recipe.steps || []).map((step, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span className="text-[14px] font-bold text-[#1C1C1E] opacity-30 w-6 shrink-0 pt-0.5">{idx + 1}.</span>
                  <p className="text-[16px] text-[#1C1C1E] leading-relaxed font-medium opacity-90">{step}</p>
                </div>
              ))}
            </div>
         </div>
      </div>
    </motion.div>
  );
}
