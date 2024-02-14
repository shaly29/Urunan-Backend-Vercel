const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    message : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
    

});

var Items = mongoose.model('reviews',reviewSchema);
module.exports  = Items;