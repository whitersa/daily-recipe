import { Link } from 'react-router-dom';

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
  { bloom: 'bloom-1' },
  { bloom: 'bloom-2' },
  { bloom: 'bloom-3' },
  { bloom: 'bloom-4' },
  { bloom: 'bloom-5' },
];

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const color = COLORS[recipe.id % COLORS.length];

  return (
    <Link 
      to={`/recipe/${recipe.id}`}
      className="group flex gap-1.5 items-center bg-white/90 backdrop-blur-2xl p-2.5 rounded-[8px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
    >
      {/* Light Bloom Origin */}
      <div className={`w-[60px] h-[60px] flex-none flex items-center justify-center text-[28px] relative pointer-events-none`}>
        {/* Softly bleeding optical spot */}
        <div className={`absolute inset-0 ${color.bloom} blur-2xl group-hover:blur-3xl transition-all duration-500`}></div>
        <span className="relative z-10 drop-shadow-md group-hover:-translate-y-0.5 transition-transform duration-500 ease-out">🍲</span>
      </div>

      {/* Pure Floating Typography - No Container Boundaries */}
      <div className="flex-1 min-w-0 mt-0.5">
        <div className="flex items-center gap-2 mb-1.5 opacity-40">
          <span className={`text-[10px] font-bold uppercase tracking-widest`}>
            {recipe.category}
          </span>
          <span className="w-0.5 h-0.5 rounded-[8px] bg-black shrink-0"></span>
          <span className="text-[10px] font-semibold tracking-wider">
            {recipe.time}
          </span>
        </div>
        <h3 className="text-[17px] font-bold text-[#1C1C1E] line-clamp-1 mb-0.5 tracking-tight">
          {recipe.title}
        </h3>
        <p className="text-[13px] text-black/40 line-clamp-2 leading-relaxed font-medium">
          {recipe.description}
        </p>
      </div>
    </Link>
  );
}
