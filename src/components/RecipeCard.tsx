import { Link } from 'react-router-dom';

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    description: string;
    category: string;
    image_url?: string;
    time: string;
    tags?: string[];
  };
}

const COLORS = [
  { bloom: 'bloom-1' },
  { bloom: 'bloom-2' },
  { bloom: 'bloom-3' },
  { bloom: 'bloom-4' },
  { bloom: 'bloom-5' },
];

const TAG_STYLES: Record<string, string> = {
  'bloom-1': 'bg-blue-50 text-blue-600/80',
  'bloom-2': 'bg-rose-50 text-rose-600/80',
  'bloom-3': 'bg-cyan-50 text-cyan-600/80',
  'bloom-4': 'bg-amber-50 text-amber-600/80',
  'bloom-5': 'bg-purple-50 text-purple-600/80',
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const color = COLORS[recipe.id % COLORS.length];
  const tagStyle = TAG_STYLES[color.bloom] || 'bg-black/[0.03] text-black/40';

  return (
    <Link 
      to={`/recipe/${recipe.id}`}
      className="group flex gap-3.5 items-center bg-white/95 backdrop-blur-2xl p-2.5 rounded-[6px] border border-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-500"
    >
      {/* Physical Capsule for Image/Icon - Rigid 1:1 Aspect Ratio */}
      <div className="w-16 h-16 rounded-[6px] overflow-hidden bg-[#F2F2F7] flex-none relative flex items-center justify-center shadow-sm shrink-0">
        {recipe.image_url ? (
          <img 
            src={recipe.image_url} 
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
        ) : (
          <>
            <div className={`absolute inset-0 ${color.bloom} blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
            <span className="relative z-10 text-[26px] drop-shadow-sm group-hover:-translate-y-0.5 transition-transform duration-500 ease-out">
              {recipe.category === '午餐' ? '🍲' : recipe.category === '早餐' ? '🍳' : recipe.category === '甜点' ? '🍰' : '🥗'}
            </span>
          </>
        )}
      </div>

      {/* Pure Floating Typography - Compact Informative Block */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5 opacity-30">
          <span className="text-[10px] font-medium uppercase tracking-wider">
            {recipe.category}
          </span>
          <span className="w-1 h-[1px] bg-black/20"></span>
          <span className="text-[10px] font-medium">
            {recipe.time}
          </span>
        </div>
        <h3 className="text-[17px] font-bold text-[#1C1C1E] line-clamp-1 mb-1 tracking-tight">
          {recipe.title}
        </h3>
        
        {/* Refined Metadata Row (Tags) */}
        <div className="flex flex-wrap gap-1">
          {(recipe.tags || ['家常', '快手']).map(tag => (
            <span key={tag} className={`px-1.5 py-0.5 rounded-[4px] ${tagStyle} text-[9px] font-medium tracking-wide`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
