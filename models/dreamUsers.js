// Dependencies
// =============================================================

// This may be confusing but here DataTypes (capital) references the standard library
// var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
// var sequelize = require("../config/connection.js");
// const Dream = require("./dream.js");

module.exports = function(sequelize, DataTypes) {
    // Creates a "Dream" model that matches up with DB
    let DreamUser = sequelize.define("DreamUser", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dream_user_name: {
            type: DataTypes.STRING
        },
        dream_owned: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: false
    });

    // DreamUser.hasOne(Dream);

    // Syncs with DB
    DreamUser.sync();

    return DreamUser;

    // Makes the Dream Model available for other files (will also create a table)
}
