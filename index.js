const express = require('express');
const config = require('config');
const path = require('path');

const app = express();
const port = config.get('PORT') || 3000;
const newsRoutes = require('./router/news');
const corsMiddleware = require('./middleware/cors');

app.use(corsMiddleware);
app.use(express.json({ extended: true }));
app.use('/api/news', newsRoutes);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`);
});
