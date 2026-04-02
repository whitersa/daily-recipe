import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import RecipeCard from "@/components/RecipeCard";
import SearchHeader from "@/components/SearchHeader";
import BottomDock from "@/components/BottomDock";
import { Recipe } from "@/App";

export default function Home({ recipes }: { recipes: Recipe[] }) {
  const [searchParams] = useSearchParams();
  const selectedCat = searchParams.get('cat') || '全部';
  const filteredRecipes = selectedCat === '全部' ? recipes : recipes.filter(r => r.category === selectedCat);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col h-[100dvh] overflow-hidden bg-[#F5F5F7] relative"
    >
      {/* Absolute Header Area floating shapeless - elevated z-index for modals */}
      <header className="px-6 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-0 flex flex-col z-[60] flex-none relative">
        <div className="mb-2 flex justify-between items-center">
          <h1 className="text-[34px] font-extrabold tracking-tight text-[#1C1C1E] leading-tight">
            每日食谱<span className="text-[#0A84FF]">.</span>
          </h1>
        </div>
        
        <SearchHeader />
        
        {/* Completely Shapeless Navigation without dots */}
        <nav className="flex gap-6 overflow-x-auto no-scrollbar pt-3 pb-2 pl-2">
          {['全部', '早餐', '午餐', '晚餐', '甜点', '轻食'].map((cat) => (
            <Link
              key={cat}
              to={`/?cat=${cat}`}
              className={`flex-none text-[14px] tracking-wide transition-all duration-300 outline-none ${
                cat === selectedCat 
                ? 'text-[#1C1C1E] font-extrabold' 
                : 'text-black/40 font-semibold hover:text-[#1C1C1E] hover:opacity-70'
              }`}
            >
              {cat}
            </Link>
          ))}
        </nav>
      </header>

      <section className="flex-1 overflow-y-auto no-scrollbar px-6 pt-1 pb-[220px] relative z-10">
        <div className="grid grid-cols-1 gap-2.5">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe: Recipe, index: number) => (
              <div key={recipe.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.04}s` }}>
                <RecipeCard recipe={recipe} />
              </div>
            ))
          ) : (
            <div className="py-24 text-center mt-4">
              <span className="text-4xl opacity-20 grayscale">📦</span>
              <p className="text-black/40 text-[13px] font-semibold mt-4">未找到相关的食谱档案。</p>
            </div>
          )}
        </div>
      </section>

      <BottomDock activeTab="home" />
    </motion.div>
  );
}
