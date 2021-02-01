const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const Event = require('../models/events');
const { json } = require('body-parser');

router.post('/create', checkAuth, (req, res, next) => {
    console.log(req);
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        price: req.body.price,
        date: req.body.date,
        description: req.body.description
    });
    event.save()
           .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created Event successfully',
                createdEvent: {
                    _id: result._id,
                    title: result.title,
                    price: result.price,
                    date: result.date,
                    description: result.description
                }
            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });    
});

router.get('/', (req, res, next) => {
    Event.find() 
    .select('title price date description') 
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            products: docs.map( doc => {
                return {
                    title: doc.title,
                    price: doc.price,
                    date: doc.date,
                    description: doc.description
                }
            })
        };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;