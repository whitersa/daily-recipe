import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import RecipeCard from "@/components/RecipeCard";
import SearchHeader from "@/components/SearchHeader";
import BottomDock from "@/components/BottomDock";
import { Recipe } from "@/lib/mocks";

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
      <header className="px-6 pt-[calc(0.5rem+env(safe-area-inset-top))] pb-0 flex flex-col z-[60] flex-none relative">
        <div className="pt-2">
          <SearchHeader />
        </div>
        
        {/* Compact Pill Navigation - Refined Scale */}
        <nav className="flex gap-2 overflow-x-auto no-scrollbar pt-4 pb-5">
          {['全部', '早餐', '午餐', '晚餐', '甜点', '轻食'].map((cat) => {
            const isActive = cat === selectedCat;
            return (
              <Link
                key={cat}
                to={`/?cat=${cat}`}
                className={`flex-none flex items-center justify-center px-3.5 py-1.5 rounded-[4px] text-[11.5px] font-bold transition-all duration-300 outline-none ${
                    isActive 
                    ? 'bg-[#1C1C1E] text-white shadow-sm' 
                    : 'bg-white border border-black/[0.03] text-black/40 hover:text-black/60 hover:bg-black/[0.01]'
                  }`}
              >
                <span className="-translate-y-[0.5px]">{cat}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <section className="flex-1 overflow-y-auto no-scrollbar px-6 pt-1 pb-[100px] relative z-10">
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
