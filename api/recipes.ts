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
  // 1. 设置跨域头 (保持之前的逻辑)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. 核心诊断：检查环境变量
  const pgUrl = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
  const isDBConnected = !!pgUrl;

  try {
    // 3. GET 逻辑 (添加了对 sql 对象存在性的检查)
    if (req.method === 'GET') {
      if (!isDBConnected) {
        console.warn('POSTGRES_URL missing, falling back to MOCK.');
        return res.status(200).json(MOCK_RECIPES);
      }
      
      try {
        const { rows } = await sql`SELECT * FROM recipes ORDER BY id DESC`;
        return res.status(200).json(rows);
      } catch (dbError: any) {
        // 如果是表不存在，尝试自动初始化
        if (dbError.message && dbError.message.includes('recipes')) {
           await sql`
            CREATE TABLE IF NOT EXISTS recipes (
              id SERIAL PRIMARY KEY,
              title TEXT NOT NULL,
              description TEXT,
              category TEXT,
              time TEXT,
              ingredients TEXT,
              steps TEXT,
              image_url TEXT,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
           `;
           return res.status(200).json(MOCK_RECIPES);
        }
        throw dbError;
      }
    }
    
    // ... 其他方法保持原逻辑，但包装在 try 里
    if (req.method === 'POST') {
      const recipe = req.body;
      if (!isDBConnected) return res.status(200).json({ id: Date.now() });
      const { rows } = await sql`
        INSERT INTO recipes (title, description, category, time, ingredients, steps)
        VALUES (${recipe.title}, ${recipe.description}, ${recipe.category}, ${recipe.time}, ${JSON.stringify(recipe.ingredients)}, ${JSON.stringify(recipe.steps)})
        RETURNING id
      `;
      return res.status(200).json(rows[0]);
    }

  } catch (error: any) {
    // 4. 极致诊断：捕获所有未知崩溃并返回
    console.error('CRITICAL API ERROR:', error);
    return res.status(500).json({ 
      error: 'API Execution Failed', 
      message: error.message || String(error),
      env_status: isDBConnected ? 'Connected (Env OK)' : 'Disconnected (Env Missing)',
      stack: error.stack ? 'Details in Vercel Logs' : null
    });
  }
}
