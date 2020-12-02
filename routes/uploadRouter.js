const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');


const storage = multer.diskStorage({
            // u can just assign a location where the files where be stored destination des
              destination : (req, file , cb  ) => {
                  // cb a callbackfunction
                  cb(null,'public/images'); // two arguments err and destination

              },
              filename : (req, file ,cb ) =>{
                  cb(null,file.originalname);
              }
});

/// file filter provided by

const imageFileFilter = (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
              return cb(new Error(' You can upload only image files'),false);
        }
        else {
          cb(null,true); /// let it be uploaded
        }
};

const upload = multer({storage: storage,fileFilter:imageFileFilter});

const uploadRouter  = express.Router();
uploadRouter.use(bodyParser.json());

// pload.single('imageFile') only a single file

uploadRouter.route('/')
.post(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,upload.single('imageFile'),(req,res) => {
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(req.file);   /// url of the object ???
      res.end('Image uploaded');
})
.get(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
      res.statusCode=403;
      res.end('get operation not supported on /dishes');
})
.put(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
      res.statusCode=403;
      res.end('PUT operation not supported on /dishes');
})
.delete(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
      res.statusCode=403;
      res.end('delete operation not supported on /dishes');
})

module.exports  = uploadRouter;
