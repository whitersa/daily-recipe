const { sql } = require('@vercel/postgres');

/**
 * 资产类型 (Assets): 食材 (ingredient), 术语 (term), 度量 (unit)
 */
module.exports = async function handler(req, res) {
  const pgUrl = process.env.POSTGRES_URL;

  try {
    if (req.method === 'GET') {
      if (!pgUrl) {
        // 兜底 Mock
        return res.status(200).json([
          { id: 1, name: '顶级牛腩', type: 'ingredient', description: '选用法式排酸工艺。' },
          { id: 2, name: '低温慢煮', type: 'term', description: 'Sous-vide 精准温控。' }
        ]);
      }
      
      try {
        const { rows } = await sql`SELECT * FROM assets ORDER BY name ASC`;
        return res.status(200).json(rows);
      } catch (e) {
        // 首次连接自动建表
        await sql`CREATE TABLE IF NOT EXISTS assets (id SERIAL PRIMARY KEY, name TEXT UNIQUE NOT NULL, type TEXT, description TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`;
        return res.status(200).json([]);
      }
    }

    if (req.method === 'POST') {
      const { name, type, description } = req.body;
      const { rows } = await sql`INSERT INTO assets (name, type, description) VALUES (${name}, ${type}, ${description}) ON CONFLICT (name) DO UPDATE SET type = ${type}, description = ${description} RETURNING *`;
      return res.status(200).json(rows[0]);
    }

    res.status(405).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
