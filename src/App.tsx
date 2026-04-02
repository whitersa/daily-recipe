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

const MOCK_RECIPES = [
  {
    id: 1,
    title: '番茄牛腩面',
    description: '浓郁酸甜的番茄汤底，搭配筋道的牛腩，是冬日里最温暖的选择。',
    category: '午餐',
    time: '45 min',
    ingredients: ['牛腩 500g', '番茄 3个', '手擀面 200g', '生姜', '大葱'],
    steps: ['牛腩切块焯水', '番茄炒成浓汤', '加入牛腩慢炖', '煮面并淋入汤汁']
  },
  {
    id: 2,
    title: '晨间牛油果吐司',
    description: '健康的油脂，清爽的口感，开启活力满满的一天。',
    category: '早餐',
    time: '10 min',
    ingredients: ['吐司 2片', '牛油果 1个', '鸡蛋 1个', '黑胡椒'],
    steps: ['吐司烤至金黄', '牛油果捣碎抹开', '放上水波蛋', '撒盐和黑胡椒']
  }
];

export interface Recipe {
  id: number;
  title: string;
  description: string;
  category: string;
  time: string;
  ingredients: string[];
  steps: string[];
  image_url?: string;
}

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
