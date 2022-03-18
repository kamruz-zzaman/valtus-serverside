const express = require('express');
const mongodb = require('mongodb');
const client = require('../config/mongoDb');
const router = express.Router();

const time = new Date(
    new Date().getTime() + new Date().getTimezoneOffset() * 60000 + 3600000 * +5.5
).toLocaleString();

const db = client.db('Valtus');
const collection = db.collection('carousel');

// post a carousel image
router.post('/', (req, res) => {
    const encodedImage = req.files.image.data.toString('base64');
    const image = Buffer.from(encodedImage, 'base64');
    const newBlog = {
        createdAt: time,
        image,
    };
    // insert new carousel image into database
    collection.insertOne(newBlog, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send({ message: 'Carousel added successfully' });
        }
    });
});

// get all carousel image
router.get('/', (req, res) => {
    collection
        .find({})
        .sort({ _id: -1 })
        .toArray((err, blogs) => {
            if (err) {
                res.send(err);
            } else {
                res.send(blogs);
            }
        });
});

// delete a carousel image
router.delete('/:id', (req, res) => {
    collection.deleteOne(
        { _id: new mongodb.ObjectId(req.params.id) },
        (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'Blog deleted successfully' });
        }
    );
});

module.exports = router;
