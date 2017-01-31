// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Dream" model that matches up with DB
var Dream = sequelize.define("Dream", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  dream_name: {
    type: Sequelize.STRING
  },
  devoured: {
    type: Sequelize.BOOLEAN
  },
  date: {
    type: Sequelize.DATE
  }
}, {
  timestamps: false
});

// Syncs with DB
Dream.sync();

// Makes the Dream Model available for other files (will also create a table)
module.exports = Dream;
