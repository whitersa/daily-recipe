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

const MOCK_RECIPES: any[] = [
  {
    id: 1,
    title: '番茄牛腩面',
    emoji: '🍜',
    description: '浓郁酸甜的番茄汤底，搭配筋道的牛腩。',
    category: '午餐',
    time: '45 min',
    tags: ['硬菜', '家常'],
    ingredients: [
      { name: '主要食材', items: ['牛腩 500g', '番茄 3个', '手擀面 200g'] }
    ],
    steps: [
      { name: '准备步骤', items: ['牛腩切块焯水', '番茄炒成浓汤'] },
      { name: '正式烹饪', items: ['加入牛腩慢炖'] }
    ]
  },
  {
    id: 2,
    title: '牛油果吐司',
    emoji: '🥑',
    description: '健康的油脂，开启活力满满的一天。',
    category: '早餐',
    time: '10 min',
    tags: ['低脂', '快手'],
    ingredients: [
      { name: '食材清单', items: ['吐司 2片', '牛油果 1个', '鸡蛋 1个'] }
    ],
    steps: [
      { name: '制作过程', items: ['吐司烤至金黄', '牛油果捣碎抹开'] }
    ]
  }
];

export interface IngredientGroup {
  name: string;
  items: string[];
}

export interface StepGroup {
  name: string;
  items: string[];
}

export interface Recipe {
  id: number;
  title: string;
  emoji?: string; // New Icon support
  description: string;
  category: string;
  time: string;
  tags: string[];
  ingredients: IngredientGroup[]; // Correctly grouped
  steps: StepGroup[]; // Correctly grouped
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
