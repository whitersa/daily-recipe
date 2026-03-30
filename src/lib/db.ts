import { sql } from '@vercel/postgres';

// Mock data for local development when database is not connected
const MOCK_RECIPES: Recipe[] = [
  {
    id: 1,
    title: '番茄牛腩面',
    description: '浓郁酸甜的番茄汤底，搭配筋道的牛腩，是冬日里最温暖的选择。',
    category: '午餐',
    image_url: '',
    time: '45 min',
    ingredients: ['牛腩 500g', '番茄 3个', '手擀面 200g', '生姜', '大葱'],
    steps: ['牛腩切块焯水', '番茄炒成浓汤', '加入牛腩慢炖', '煮面并淋入汤汁']
  },
  {
    id: 2,
    title: '晨间牛油果吐司',
    description: '健康的油脂，清爽的口感，开启活力满满的一天。',
    category: '早餐',
    image_url: '',
    time: '10 min',
    ingredients: ['吐司 2片', '牛油果 1个', '鸡蛋 1个', '黑胡椒'],
    steps: ['吐司烤至金黄', '牛油果捣碎抹开', '放上水波蛋', '撒盐和黑胡椒']
  },
  {
    id: 3,
    title: '法式焦糖布丁',
    description: '丝滑如绸缎般的口感，轻轻敲碎表面的焦糖，是极致的味觉享受。',
    category: '甜点',
    image_url: '',
    time: '30 min',
    ingredients: ['淡奶油 200ml', '蛋黄 3个', '细砂糖 30g', '香草精'],
    steps: ['奶油加热混合蛋黄', '过滤装模', '150度水浴烘烤', '表面撒糖喷火烧焦']
  },
  {
    id: 4,
    title: '照烧鸡腿饭',
    description: '经典日式风味，鸡肉皮脆肉嫩，酱汁拌饭一绝。',
    category: '晚餐',
    image_url: '',
    time: '20 min',
    ingredients: ['鸡腿 2个', '西兰花', '米饭', '照烧汁'],
    steps: ['鸡腿去骨煎至皮黄', '倒入自制照烧汁', '收汁切块', '配上蔬菜装盘']
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

// Settings Types
export interface AppSettings {
  default_unit: string;
  preferred_equipment: string[];
  auto_save: boolean;
  procedural_variables: Record<string, string>;
}

const DEFAULT_SETTINGS: AppSettings = {
  default_unit: 'metric',
  preferred_equipment: ['Oven', 'Stove', 'Whisk', 'Chef Knife'],
  auto_save: true,
  procedural_variables: {
    'prep_buffer': '5 mins',
    'rest_time': '10 mins'
  }
};

export async function getRecipes(category?: string) {
  // If no DB URL, return mock data
  if (!process.env.POSTGRES_URL) {
    if (category && category !== '全部') {
      return MOCK_RECIPES.filter(r => r.category === category);
    }
    return MOCK_RECIPES;
  }

  try {
    if (category && category !== '全部') {
      const { rows } = await sql`
        SELECT * FROM recipes 
        WHERE category = ${category}
        ORDER BY id DESC
      `;
      return rows;
    } else {
      const { rows } = await sql`
        SELECT * FROM recipes 
        ORDER BY id DESC
      `;
      return rows;
    }
  } catch (error) {
    console.error('Database Error:', error);
    return MOCK_RECIPES;
  }
}

export async function getRecipeById(id: string) {
  if (!process.env.POSTGRES_URL) {
    return MOCK_RECIPES.find(r => r.id === Number(id)) || null;
  }

  try {
    const { rows } = await sql`
      SELECT * FROM recipes 
      WHERE id = ${id}
    `;
    return rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    return MOCK_RECIPES.find(r => r.id === Number(id)) || null;
  }
}

export async function createRecipe(recipe: Recipe) {
  try {
    const { rows } = await sql`
      INSERT INTO recipes (title, description, category, time, ingredients, steps)
      VALUES (${recipe.title}, ${recipe.description}, ${recipe.category}, ${recipe.time}, ${JSON.stringify(recipe.ingredients)}, ${JSON.stringify(recipe.steps)})
      RETURNING id
    `;
    return rows[0];
  } catch (e) {
    const newId = MOCK_RECIPES.length + 1;
    MOCK_RECIPES.push({ ...recipe, id: newId });
    return { id: newId };
  }
}

export async function updateRecipe(id: string, recipe: Recipe) {
  try {
    await sql`
      UPDATE recipes 
      SET title = ${recipe.title}, 
          description = ${recipe.description}, 
          category = ${recipe.category}, 
          time = ${recipe.time}, 
          ingredients = ${JSON.stringify(recipe.ingredients)}, 
          steps = ${JSON.stringify(recipe.steps)}
      WHERE id = ${id}
    `;
    return true;
  } catch (e) {
    const index = MOCK_RECIPES.findIndex(r => r.id === Number(id));
    if (index !== -1) {
      MOCK_RECIPES[index] = { ...recipe, id: Number(id) };
    }
    return true;
  }
}

export async function getSettings(): Promise<AppSettings> {
  return DEFAULT_SETTINGS;
}

export async function updateSettings(settings: AppSettings) {
  Object.assign(DEFAULT_SETTINGS, settings);
  return true;
}
