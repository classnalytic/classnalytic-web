const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    if (process.env.NODE_ENV !== 'production') {
      const proxy = require('http-proxy-middleware');
      server.use('/api/predict', proxy({ target: 'https://classnalytic.app', changeOrigin: true }));
      server.use('/api', proxy({ target: 'http://localhost:5000', changeOrigin: true }));
    }

    server.get('/classroom/:id/detail', (req, res) => {
      const actualPage = '/classroom/detail';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/classroom/:id/report', (req, res) => {
      const actualPage = '/classroom/detail';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
