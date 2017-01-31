// const express = require('express');
// const app = express();
const Dream = require('../models/dream.js');
const moment = require('moment');

let now = moment(new Date());
let nowMoment = moment(now).format('YYYY-MM-DD hh:mm:ss');

module.exports = (app) => {

  app.get('/', (req, res) => {
      Dream.findAll({
        raw: true
      })
        .then(function(result) {
            let devouredRows = [];
            let notDevouredRows = [];
            result.forEach(function(itm) {
              if(itm.devoured === 0) {
                notDevouredRows.push(itm);
              } else if (itm.devoured === 1) {
                devouredRows.push(itm);
              }
            });
            res.render("index", {devoured: devouredRows, dreams: notDevouredRows});
      });
  });

  app.post('/', (req, res) => {
      Dream.create({
        dream_name: req.body.dream,
        devoured: 0,
        date: nowMoment
      });

      Dream.findOne({
          raw: true,
          order: [ [ 'id', 'DESC' ]],
      }).then(function(result){
        console.log(result.id);
        res.send(result.id.toString());
      });
  });

  app.post('/:id', (req, res) => {
      Dream.update(
        {devoured: 1},
        {where: {id: req.params.id}}
      );
  });

}
