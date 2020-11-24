const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
.all((req,res,next) => {
      res.statusCode=200;
      res.setHeader('Content-type','text/plain');
      next();
})
.get((req,res,next) => {
    res.end('will send all the leaderes to you !');
})

.post((req,res,next) => {
    res.end('will add the leader  :' + req.body.name + ' with details : ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode=403;
    res.end('PUT operation not supported in on leaders ');
})
.delete((req,res,next) => {
    res.end('Deleting all leaders ! ');
})
.get('/:leaderId',(req,res,next) => {
    res.end('will send details of the leader : '+req.params.leaderId +' to you ! ');
})
.post('/:leaderId',(req,res,next) => {

      res.end('Post operation not supported on /leaders/'+leaderId );
})
.put('/:leaderId',(req,res,next) => {
      res.write('Updating leader : ' + req.params.leaderId);
      res.end('will update the leader '+req.params.name +' with details '+ req.body.description );
})
.delete('/:leaderId',(req,res,next) => {
    res.end('Deleting  the leader  '+req.params.leaderId);
});

module.exports =leaderRouter;
