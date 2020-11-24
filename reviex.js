const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');

const promos = require('../models/leaders');


const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next)=>{
    promos.find({})
    .then((promos)=>{
        res.statusCode=200;
        res.setHeader('Content-type','Application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req, res, next) => {

    promos.create(req.body)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
})


    //res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    promos.remove({})
    .then((resp)=>{
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
promoRouter.route('/:promoId')
.get((req,res,next) => {
    promos.findById(req.params.promoId)
    .then((promo)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));

})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put( (req, res, next) => {
    promos.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    promos.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports=promoRouter;
