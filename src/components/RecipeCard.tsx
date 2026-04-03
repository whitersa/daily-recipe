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
    ? { 
        bg: 'bg-[#FCF6F2]', 
        border: 'border-[#F2DFD4]', 
        iconBg: 'bg-white/60', 
        accentColor: 'text-[#9A7D69]', 
        indicatorColor: 'text-[#9A7D69]/20',
        bgColor: 'bg-[#FDF9F6]'
      }
    : { 
        bg: 'bg-[#F2F6F7]', 
        border: 'border-[#DDE7E9]', 
        iconBg: 'bg-white/60', 
        accentColor: 'text-[#6C8E99]', 
        indicatorColor: 'text-[#6C8E99]/20',
        bgColor: 'bg-[#F5F9FA]'
      };

  return (
    <Link to={`/recipe/${recipe.id}`} className="block">
      <motion.div 
        whileHover={{ scale: 1.012 }}
        whileTap={{ scale: 0.985 }}
        className={`flex items-center gap-3.5 py-2.5 px-3.5 ${theme.bg} border border-black/[0.04] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.015)] transition-all duration-300 relative overflow-hidden group`}
      >
        {/* Floating Emoji - No Background Box */}
        <div className="flex-none w-16 h-12 flex items-center justify-center text-[36px] drop-shadow-[0_4px_6px_rgba(0,0,0,0.08)] transform group-hover:scale-110 transition-transform">
          {recipe.emoji || (isHot ? '🔥' : '❄️')}
        </div>

        {/* Informative Core */}
        <div className="flex-1 min-w-0 pr-1 py-1">
          <div className="flex items-center gap-2 mb-1 pt-0.5">
            <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-wider ${theme.accentColor} bg-white/80 border border-black/[0.03]`}>
              {recipe.category}
            </span>
            <span className="text-[10px] font-bold text-black/10 uppercase tracking-tighter">{recipe.time}</span>
          </div>
          
          <h3 className="text-[17px] font-bold text-[#1C1C1E]/90 line-clamp-1 mb-0.5 tracking-tight leading-tight">
            {recipe.title}
          </h3>
          
          <p className="text-[11.5px] font-medium text-black/20 line-clamp-1 tracking-tight">
            {recipe.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
