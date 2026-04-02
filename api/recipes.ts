import { sql } from '@vercel/postgres';

const MOCK_RECIPES = [
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
  }
];

export default async function handler(req: any, res: any) {
  // Setup CORS to allow Vite dev server calls if testing locally detached
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const isDBConnected = !!process.env.POSTGRES_URL;

  try {
    if (req.method === 'GET') {
      if (!isDBConnected) return res.status(200).json(MOCK_RECIPES);
      const { rows } = await sql`SELECT * FROM recipes ORDER BY id DESC`;
      return res.status(200).json(rows);
    }
    
    if (req.method === 'POST') {
      const recipe = req.body;
      if (!isDBConnected) {
        // Return mock created ID
        return res.status(200).json({ id: Date.now() });
      }
      const { rows } = await sql`
        INSERT INTO recipes (title, description, category, time, ingredients, steps)
        VALUES (${recipe.title}, ${recipe.description}, ${recipe.category}, ${recipe.time}, ${JSON.stringify(recipe.ingredients)}, ${JSON.stringify(recipe.steps)})
        RETURNING id
      `;
      return res.status(200).json(rows[0]);
    }

    if (req.method === 'PUT') {
      const recipe = req.body;
      if (!isDBConnected) return res.status(200).json({ success: true });
      await sql`
        UPDATE recipes 
        SET title = ${recipe.title}, description = ${recipe.description}, category = ${recipe.category}, time = ${recipe.time}, ingredients = ${JSON.stringify(recipe.ingredients)}, steps = ${JSON.stringify(recipe.steps)}
        WHERE id = ${recipe.id}
      `;
      return res.status(200).json({ success: true });
    }
    
  } catch (error) {
    console.error('Vercel API Error:', error);
    if (!isDBConnected) return res.status(200).json(MOCK_RECIPES); // fallback
    return res.status(500).json({ error: String(error) });
  }
}
