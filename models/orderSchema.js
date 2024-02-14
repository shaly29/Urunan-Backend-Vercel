const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    address : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
    

});

var Items = mongoose.model('orders',orderSchema);
module.exports  = Items;