import Link from 'next/link';

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    description: string;
    category: string;
    image_url?: string;
    time: string;
  };
}

const COLORS = [
  { bg: 'placeholder-sage', text: 'text-[#5D6B67]', lightBg: 'bg-[#5D6B67]/10' },
  { bg: 'placeholder-clay', text: 'text-[#A68A7E]', lightBg: 'bg-[#A68A7E]/10' },
  { bg: 'placeholder-slate', text: 'text-[#7E8C9A]', lightBg: 'bg-[#7E8C9A]/10' },
  { bg: 'placeholder-sand', text: 'text-[#B2A595]', lightBg: 'bg-[#B2A595]/10' },
  { bg: 'placeholder-moss', text: 'text-[#8B9A7E]', lightBg: 'bg-[#8B9A7E]/10' },
];

export default function RecipeCard({ recipe }: RecipeCardProps) {
  // pick a color based on ID to ensure consistency
  const color = COLORS[recipe.id % COLORS.length];

  return (
    <Link 
      href={`/recipe/${recipe.id}`}
      className="group relative bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-black/10 flex gap-4 items-center"
    >
      {/* Dynamic Earth-Tone Placeholder */}
      <div className={`w-20 h-20 rounded-lg ${color.bg} flex-none flex items-center justify-center text-2xl shadow-sm relative overflow-hidden`}>
        <span className="opacity-80 group-hover:opacity-100 transition-opacity">🍲</span>
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity"></div>
      </div>

      {/* Content - Sharper Geo & High Readability */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${color.lightBg} ${color.text}`}>
            {recipe.category}
          </span>
          <span className="text-[9px] font-bold text-[#8E8C87] italic">
            {recipe.time}
          </span>
        </div>
        <h3 className="text-[15px] font-bold text-[#1A1918] line-clamp-1 mb-0.5 tracking-tight uppercase">
          {recipe.title}
        </h3>
        <p className="text-[11px] text-[#4A4742] line-clamp-2 leading-relaxed font-semibold">
          {recipe.description}
        </p>
      </div>

      {/* Subtle Arrow */}
      <div className={`w-8 h-8 rounded-lg border border-black/10 flex items-center justify-center ${color.text} group-hover:border-current transition-all`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
      </div>
    </Link>
  );
}
