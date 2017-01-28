const orm = require('../config/orm.js');

module exports = (name, devour, id) => {
  orm.selectAll();

  orm.insertOne(name, devour);

  orm.updateOne(name, devour, id);
}
