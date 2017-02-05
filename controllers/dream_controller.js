// const express = require('express');
// const app = express();
// const Dream = require('../models/dream.js');
const db = require("../models");
const moment = require('moment');

let now = moment(new Date());
let nowMoment = moment(now).format('YYYY-MM-DD hh:mm:ss');

module.exports = (app) => {
        let dreamUsers;
    app.get('/', (req, res) => {
        db.DreamUser.findAll({
                raw: true
        }).then((results) => {
            dreamUsers = results;
            console.log(dreamUsers);

            db.Dream.findAll({
                    raw: true
            })
            .then((result) => {
                let devouredRows = [];
                let notDevouredRows = [];
                result.forEach((itm) => {
                    if (itm.devoured === 0) {
                        notDevouredRows.push(itm);
                    } else if (itm.devoured === 1) {
                        devouredRows.push(itm);
                    }
                });
                res.render("index", {
                    devoured: devouredRows,
                    dreams: notDevouredRows,
                    users: dreamUsers
                });
            });
        });
    });

    app.get('/:userdreams', (req, res) => {
        db.Dream.findAll({
                raw: true,
                where: {
                    user: req.params.userdreams
                }
        }).then((result) => {
            console.log(result);
            res.send(result);
        });
    });

    app.post('/', (req, res) => {
        db.DreamUser.create({
            dream_user_name: req.body.dreamUser,
            dream_owned: req.body.dream,
            date: nowMoment
        });

        db.Dream.create({
            dream_name: req.body.dream,
            devoured: 0,
            date: nowMoment,
            user: req.body.dreamUser
        });

        db.Dream.findOne({
            raw: true,
            order: [
                ['id', 'DESC']
            ],
        }).then((result) => {
            res.send(result.id.toString());
        });
    });

    app.post('/:id', (req, res) => {
        db.Dream.update({
            devoured: 1
        }, {
            where: {
                id: req.params.id
            }
        });
    });

}
