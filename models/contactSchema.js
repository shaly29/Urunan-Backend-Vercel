const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    email  : {
        type : String,
        required : true
    },
    // Phone : {
    //     type : Boolean,
    //     required : true
    // },
    message : {
        type : String,
        required : true
    }


});

var Items = mongoose.model('contact',contactSchema);
module.exports  = Items;