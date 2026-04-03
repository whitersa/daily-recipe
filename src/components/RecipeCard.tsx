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
  
  // Theme selection: Warm for hot, Cold for cool
  const theme = isHot 
    ? { bg: 'bg-[#FFF2F0]/80', border: 'border-[#FF4D4F]/10', iconBg: 'bg-white/80', accentColor: 'text-[#FF4D4F]' }
    : { bg: 'bg-[#F0F5FF]/80', border: 'border-[#2F54EB]/10', iconBg: 'bg-white/80', accentColor: 'text-[#2F54EB]' };

  return (
    <Link to={`/recipe/${recipe.id}`} className="block">
      <motion.div 
        whileTap={{ scale: 0.98 }}
        className={`relative overflow-hidden ${theme.bg} border ${theme.border} p-3 rounded-[16px] flex gap-4 items-center shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm`}
      >
        {/* Borderless Floating Emoji */}
        <div className="flex-none w-20 h-16 flex items-center justify-center text-[44px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)] transform group-hover:scale-110 transition-transform">
          {recipe.emoji || (isHot ? '🔥' : '❄️')}
        </div>

        {/* Right Side: Informative Core */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1 opacity-60">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.accentColor}`}>
              {recipe.category}
            </span>
            <span className="text-[10px] font-bold text-black/40 uppercase tracking-tighter">{recipe.time}</span>
          </div>
          
          <h3 className="text-[19px] font-bold text-[#1C1C1E] line-clamp-1 mb-0.5 tracking-tight leading-tight">
            {recipe.title}
          </h3>
          
          <p className="text-[12px] font-medium text-black/30 line-clamp-1 tracking-tight">
            {recipe.description}
          </p>
        </div>

        {/* Right Indicator */}
        <div className={`mr-2 opacity-10 ${theme.accentColor}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </motion.div>
    </Link>
  );
}
