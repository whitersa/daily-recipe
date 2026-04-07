import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './views/Home';
import RecipeDetail from './views/RecipeDetail';
import EditRecipe from './views/EditRecipe';
import NewRecipe from './views/NewRecipe';
import Settings from './views/Settings';
import Assets from './views/Assets';
import AssetModule from './views/AssetModule';
import UpdatePrompt from './components/UpdatePrompt';
import { AnimatePresence } from 'framer-motion';

import { MOCK_RECIPES, Recipe } from './lib/mocks';
import { readCache, writeCache, CACHE_KEYS } from './lib/cache';

// ─── 骨架屏占位组件 ───────────────────────────────────────────────────────────

function SkeletonScreen() {
  return (
    <div className="flex flex-col h-[100vh] w-full overflow-hidden bg-background">
      <div className="px-6 pt-[env(safe-area-inset-top,0px)] mt-2 pb-2 flex flex-col flex-none">
        <div className="pt-1.5">
          <div className="h-10 rounded-lg bg-foreground/[0.04] animate-pulse" />
        </div>
        <div className="pt-4 pb-5 flex gap-2">
          {[48, 36, 36, 36, 44, 36].map((w, i) => (
            <div
              key={i}
              className="h-7 rounded-lg bg-foreground/[0.04] animate-pulse flex-none"
              style={{ width: w, animationDelay: `${i * 0.06}s` }}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-6">
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-foreground/[0.04] animate-pulse"
              style={{ height: 100, animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>
      </div>
      <div className="pb-8 flex justify-center">
        <span className="text-[10px] font-bold tracking-[0.2em] text-foreground/20 uppercase animate-pulse">
          正在同步食谱档案...
        </span>
      </div>
    </div>
  );
}

// ─── 主应用 ───────────────────────────────────────────────────────────────────

export default function App() {
  const location = useLocation();

  /**
   * 初始状态：
   * - recipes: 空数组，useEffect 里异步读 IDB 后立刻更新
   * - loading: true，读到 IDB 缓存后立即变 false（≈0延迟）
   */
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * 主数据同步函数
   * 1. 读 IDB 缓存 → 立即渲染（取消 loading）
   * 2. fetch 最新数据 → writeCache 比较哈希 → 有变化才更新 UI
   */
  const syncRecipes = async () => {
    // Step 1: 读缓存，有就立即显示（用户感知不到加载）
    const cached = await readCache<Recipe[]>(CACHE_KEYS.RECIPES);
    if (cached) {
      setRecipes(cached);
      setLoading(false);
    }

    // Step 2: 后台 fetch，比较版本
    try {
      const res = await fetch('/api/recipes');
      const fresh = await res.json();

      const changed = await writeCache(CACHE_KEYS.RECIPES, fresh);
      if (changed || !cached) {
        // 数据有变化 or 首次启动，更新 UI
        setRecipes(fresh);
      }
    } catch {
      // 离线或接口失败：使用缓存，没缓存才 fallback mock
      if (!cached) {
        setRecipes(MOCK_RECIPES);
        await writeCache(CACHE_KEYS.RECIPES, MOCK_RECIPES);
      }
    } finally {
      setLoading(false); // 确保骨架屏一定会消失
    }
  };

  useEffect(() => {
    syncRecipes();
  }, []);

  if (loading) return <SkeletonScreen />;

  return (
    <>
      <UpdatePrompt />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home recipes={recipes} />} />
          <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
          <Route path="/recipe/:id/edit" element={<EditRecipe recipes={recipes} onRefresh={syncRecipes} />} />
          <Route path="/recipe/new" element={<NewRecipe onRefresh={syncRecipes} />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/assets/:module" element={<AssetModule />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
