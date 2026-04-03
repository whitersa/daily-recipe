import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    description: string;
    category: string;
    image_url?: string;
    time: string;
    tags?: string[];
    emoji?: string;
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  // Determine if it's "Hot" or "Cold" based on category
  const isHot = ['午餐', '晚餐', '硬菜'].includes(recipe.category);
  
  // Refined 'Sage & Stone' Palette Evolution
  const theme = isHot 
    ? { accentColor: 'text-[#9A7D69]', indicatorColor: 'bg-[#9A7D69]/5' }
    : { accentColor: 'text-[#6C8E99]', indicatorColor: 'bg-[#6C8E99]/5' };

  return (
    <Link to={`/recipe/${recipe.id}`} className="block h-full">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex flex-col h-full px-3 py-2.5 bg-white border border-black/[0.04] rounded-[6px] shadow-[0_1px_6px_rgba(0,0,0,0.01)] transition-all duration-300 relative overflow-hidden group"
      >
        {/* Main Header / Top Section */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
           {/* Top Meta info: Category (Left) - Time (Right) */}
           <div className="flex justify-between items-center w-full">
             <span className={`text-[8.5px] font-black uppercase tracking-[0.15em] ${theme.accentColor} opacity-40`}>
               {recipe.category}
             </span>
             <span className="text-[9px] font-bold text-black/10 tabular-nums uppercase pr-0.5">{recipe.time}</span>
           </div>
           
           <div className="flex justify-between items-center gap-3">
             <h3 className="text-[14px] leading-[1.25] font-bold text-[#1C1C1E]/90 line-clamp-2 tracking-tight">
               {recipe.title}
             </h3>
             <div className="text-[22px] flex-none opacity-90 group-hover:scale-110 transition-transform duration-500">
               {recipe.emoji || (isHot ? '🔥' : '❄️')}
             </div>
           </div>
        </div>
        
        {/* Bottom Section: Flavor Tags (Replacing Description) */}
        <div className="mt-2.5 pt-2 border-t border-black/[0.02] flex flex-wrap gap-1">
          {recipe.tags && recipe.tags.length > 0 ? (
            recipe.tags.map((tag) => (
              <span 
                key={tag} 
                className={`px-1.5 py-0.5 rounded-[2px] text-[8px] font-bold tracking-tight bg-black/[0.02] text-black/30 border border-black/[0.01] uppercase`}
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-[8px] font-bold text-black/10 uppercase tracking-tighter">无标签记录</span>
          )}
        </div>

        {/* Subtle accent indicator at the bottom edge */}
        <div className={`absolute bottom-0 left-3 right-3 h-[1.5px] ${theme.accentColor.replace('text-', 'bg-')} opacity-[0.08]`} />
      </motion.div>
    </Link>
  );
}
