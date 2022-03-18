const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const client = require('../config/mongoDb');

var time = new Date(
    new Date().getTime() + new Date().getTimezoneOffset() * 60000 + 3600000 * +5.5
).toLocaleString();

const db = client.db('Valtus');
const collection = db.collection('userInfo');

// post a Contact from message
router.post('/', (req, res) => {
    const message = {
        ...req.body,
        messageTime: time,
    };
    // insert new message into database
    collection.insertOne(message, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send({ message: 'userInfo added successfully' });
        }
    });
});

// get all message
router.get('/', (req, res) => {
    collection
        .find({})
        .sort({ _id: -1 })
        .toArray((err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
});

//  Delete a  message by id
router.delete('/:id', (req, res) => {
    collection.deleteOne(
        { _id: new mongodb.ObjectId(req.params.id) },
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send({ message: 'userInfo deleted successfully' });
            }
        }
    );
});

module.exports = router;
