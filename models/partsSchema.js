const mongoose = require('mongoose');

const partsSchema = mongoose.Schema({
    partsImage : {
        type : String,
        required : true
    },
    partsName  : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    discription : {
        type : String,
        required : true
    }


});

var Items = mongoose.model('parts',partsSchema);
module.exports  = Items;