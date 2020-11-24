// ################################################# Handling comments ################################
///////////////////////////////////////////////////////////////////////////////////////////////////////

promoRouter.route('/:promoId/comments')
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promo) => {
        if (promo != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo.comments);
        }
        else {
            err = new Error('promo ' + req.params.promoId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Promotions.findById(req.params.promoId)
    .then((promo) => {
        if (promo != null) {
            promo.comments.push(req.body);
            promo.save()
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err));
        }
        else {
            err = new Error('promo ' + req.params.promoId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Promotions/'
        + req.params.promoId + '/comments');
})
.delete((req, res, next) => {
    Promotions.findById(req.params.promoId)
    .then((promo) => {
        if (promo != null) {
            for (var i = (promo.comments.length -1); i >= 0; i--) {
                promo.comments.id(promo.comments[i]._id).remove();
            }
            promo.save()
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err));
        }
        else {
            err = new Error('promo ' + req.params.promoId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

promoRouter.route('/:promoId/comments/:commentId')
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promo) => {
        if (promo != null && promo.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo.comments.id(req.params.commentId));
        }
        else if (promo == null) {
            err = new Error('promo ' + req.params.promoId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Promotions/'+ req.params.promoId
        + '/comments/' + req.params.commentId);
})
.put((req, res, next) => {
    Promotions.findById(req.params.promoId)
    .then((promo) => {
        if (promo != null && promo.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                promo.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                promo.comments.id(req.params.commentId).comment = req.body.comment;
            }
            promo.save()
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err));
        }
        else if (promo == null) {
            err = new Error('promo ' + req.params.promoId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Promotions.findById(req.params.promoId)
    .then((promo) => {
        if (promo != null && promo.comments.id(req.params.commentId) != null) {
            promo.comments.id(req.params.commentId).remove();
            promo.save()
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err));
        }
        else if (promo == null) {
            err = new Error('promo ' + req.params.promoId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});
