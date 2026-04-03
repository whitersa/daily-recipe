module.exports = function handler(req, res) {
  res.status(200).json({ 
    status: 'pong',
    time: new Date().toISOString(),
    message: 'Vercel API Routing is working (CommonJS fallback)!' 
  });
}
