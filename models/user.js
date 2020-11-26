var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin:   {
        type: Boolean,
        default: false
    }
});
//
User.plugin(passportLocalMongoose);
// var User= new Schema({
//   //will be added aytomatically by plugin
//     // username :{
//     //     type : String,
//     //     required : true,
//     //     unique : true
//     // },
//     // password :{
//     //     type : String,
//     //     required : true
//     // },
//     admin :{
//         type : Boolean,
//         default : false
//     }
// });
// User.plugin(passportLocalMongoose);


module.exports= mongoose.model('User',User);
