import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './views/Home';
import RecipeDetail from './views/RecipeDetail';
import EditRecipe from './views/EditRecipe';
import NewRecipe from './views/NewRecipe';
import Settings from './views/Settings';
import Assets from './views/Assets';
import UpdatePrompt from './components/UpdatePrompt';
import { AnimatePresence } from 'framer-motion';

import { MOCK_RECIPES, Recipe } from './lib/mocks';

export default function App() {
  const location = useLocation();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = () => {
    setLoading(true);
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch recipes, falling back to local mocks", err);
        setRecipes(MOCK_RECIPES);
        setLoading(false);
      });
  };

  // 全局只请求一次数据，后续全在客户端纯内存运转
  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
        <div className="text-[12px] font-bold tracking-widest text-black/40 animate-pulse">同步核心云端库...</div>
      </div>
    );
  }

  return (
    <>
      <UpdatePrompt />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home recipes={recipes} />} />
          <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
          <Route path="/recipe/:id/edit" element={<EditRecipe recipes={recipes} onRefresh={fetchRecipes} />} />
          <Route path="/recipe/new" element={<NewRecipe onRefresh={fetchRecipes} />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
