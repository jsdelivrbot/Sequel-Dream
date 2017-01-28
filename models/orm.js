const mysql = require('mysql');
const connection = require('../config/connection.js');
const moment = require('moment');

let now = moment(new Date());
let nowMoment = moment(now).format('YYYY-MM-DD hh:mm:ss');

module.exports = {
  selectAll: (dreamRes) => {
      connection.query('SELECT * FROM dreams', (err, rows, fields) => {
          if (err) throw err;
          let devouredRows = [];
          let notDevouredRows = [];
          rows.forEach(function(itm) {
            if(itm.devoured === 0) {
              notDevouredRows.push(itm);
            } else if (itm.devoured === 1) {
              devouredRows.push(itm);
            }
          });
          dreamRes.render("index", {devoured: devouredRows, dreams: notDevouredRows});
      });
  },
  insertOne: (name) => {
      connection.query('INSERT INTO dreams SET ?', {dream_name: name, date: nowMoment}, (err) => {
          if (err) throw err;
        });
  },
  updateOne: (id, dreamRes) => {
      connection.query('UPDATE dreams SET devoured = 1 WHERE id = ?', [id], (err) => {
          if (err) throw err;
      });
  }
}
