// 临时：全手工 MOCK 模式，彻底断开 @vercel/postgres 依赖
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const MOCK = [{ id: 1, title: '隔离测试模式', description: '如果能看到这个，说明 API 路由通了，之前是数据库代码在挂掉。', category: '测试' }];

  return res.status(200).json(MOCK);
}
