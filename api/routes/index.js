const express = require('express');
const router = express.Router();

// Child Routes
const AuthRoutes = require('./AuthRoutes');

module.exports = (app) => {
  // Custom route like authentication

  router.use('/auth', AuthRoutes);

  router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      status: 200,
      message: 'Healthy!'
    });
  });

  app.use('/api', router);
};
