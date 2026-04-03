// 极致鲁棒版诊断 API：彻底防止函数“猝死”
export default async function handler(req: any, res: any) {
  // 基础跨域
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // 1. 静态数据备份
  const MOCK = [{ id: 1, title: '诊断模式：演示数据', description: '由于数据库还在排查中，这是占位数据。', category: '系统' }];

  // 2. 局部捕获环境信息
  const pgUrl = process.env.POSTGRES_URL;
  const envStatus = pgUrl ? (pgUrl.startsWith('postgres') ? 'Format OK' : 'Format Invalid (Missing Prefix)') : 'Env Missing';

  try {
    // 3. 动态按需加载数据库（防止顶层加载崩溃）
    const { sql } = await import('@vercel/postgres');

    if (req.method === 'GET') {
      if (!pgUrl) {
        return res.status(200).json(MOCK);
      }

      try {
        const { rows } = await sql`SELECT * FROM recipes ORDER BY id DESC`;
        return res.status(200).json(rows);
      } catch (dbError: any) {
        // 如果表不存在，立刻静默创建
        if (dbError.message && (dbError.message.includes('recipes') || dbError.message.includes('relation'))) {
           await sql`CREATE TABLE IF NOT EXISTS recipes (id SERIAL PRIMARY KEY, title TEXT NOT NULL, description TEXT, category TEXT, time TEXT, ingredients TEXT, steps TEXT, image_url TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`;
           return res.status(200).json(MOCK);
        }
        throw dbError; // 抛出让外层捕获
      }
    }

    if (req.method === 'POST') {
      const r = req.body;
      if (!pgUrl) return res.status(200).json({ id: Date.now() });
      const { rows } = await sql`INSERT INTO recipes (title, description, category, time, ingredients, steps) VALUES (${r.title}, ${r.description}, ${r.category}, ${r.time}, ${JSON.stringify(r.ingredients)}, ${JSON.stringify(r.steps)}) RETURNING id`;
      return res.status(200).json(rows[0]);
    }

  } catch (error: any) {
    // 4. 绝对捕获：确保无论如何都返回 JSON
    console.error('API CRASH LOG:', error);
    return res.status(500).json({
      status: 'CRASH_CAUGHT',
      message: error.message || 'Unknown Server Error',
      diagnostics: {
        env: envStatus,
        pgUrlExists: !!pgUrl,
        errorType: error.name || 'Generic Error'
      }
    });
  }
}
