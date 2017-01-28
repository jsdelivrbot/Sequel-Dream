// const express = require('express');
// const dream = require('../models/dream.js');
const dreams = require('../models/orm.js');

// const app = express();

module.exports = (app) => {

  app.get('/', (req, res) => {
      dreams.selectAll(res);
      // orm.selectAllDevoured(res);
  });

  app.get('/selectall', (req, res) => {
      dreams.selectAll();
  });

  app.post('/', (req, res) => {
      dreams.insertOne(req.body.dream);
  });

  app.post('/:id', (req, res) => {
      dreams.updateOne(req.params.id, res);
  });

}
