import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RecipeCard from "@/components/RecipeCard";
import SearchHeader from "@/components/SearchHeader";
import BottomDock from "@/components/BottomDock";
import { Recipe } from "@/lib/mocks";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Home({ recipes }: { recipes: Recipe[] }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedCat = searchParams.get('cat') || '全部';
  const filteredRecipes = selectedCat === '全部' ? recipes : recipes.filter(r => r.category === selectedCat);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col h-[100vh] w-full relative overflow-hidden bg-background"
    >
      {/* Absolute Header Area floating shapeless - elevated z-index for modals */}
      <header className="px-6 pt-[env(safe-area-inset-top,0px)] mt-2 pb-2 flex flex-col z-[60] flex-none relative">
        <div className="pt-1.5">
          <SearchHeader />
        </div>
        
        {/* Compact Pill Navigation - Refined Scale */}
        <nav className="pt-4 pb-5">
          <ToggleGroup 
            type="single" 
            value={selectedCat} 
            onValueChange={(v: any) => {
              if (v) navigate(`/?cat=${v}`);
            }}
            className="flex gap-2 justify-start overflow-x-auto no-scrollbar pb-1"
          >
            {['全部', '早餐', '午餐', '晚餐', '甜点', '轻食'].map((cat) => (
              <ToggleGroupItem
                key={cat}
                value={cat}
                className="flex-none px-3.5 py-1.5 h-auto rounded-lg border border-foreground/[0.03] bg-white/80 text-[11px] font-bold text-foreground/40 transition-all duration-300 data-[pressed]:bg-primary data-[pressed]:text-white hover:text-primary/60 hover:bg-white shadow-sm"
              >
                <span className="-translate-y-[0.5px] tracking-tight">{cat}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </nav>
      </header>

      <section className="flex-1 overflow-y-auto no-scrollbar px-6 pt-0 pb-[120px] relative z-10">
        <div className="grid grid-cols-2 gap-3">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe: Recipe, index: number) => (
              <div key={recipe.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.04}s` }}>
                <RecipeCard recipe={recipe} />
              </div>
            ))
          ) : (
            <div className="py-24 text-center mt-4 col-span-2">
              <span className="text-4xl opacity-20 grayscale">📦</span>
              <p className="text-foreground/40 text-[13px] font-semibold mt-4">未找到相关的食谱档案。</p>
            </div>
          )}
        </div>
      </section>

      <BottomDock activeTab="home" />
    </motion.div>
  );
}
