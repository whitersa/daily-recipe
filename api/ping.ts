export default function handler(req: any, res: any) {
  res.status(200).json({ 
    status: 'pong',
    time: new Date().toISOString(),
    message: 'Vercel API Routing is working!' 
  });
}
