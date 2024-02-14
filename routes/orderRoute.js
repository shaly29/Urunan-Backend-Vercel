const express = require('express');
const router  = express.Router(); 
const orderController = require('../controller/orderController'); 

 router.post('/', orderController.newOrder);
 router.get('/', orderController.getAllOrders);
 router.put('/:id', orderController.updateOrder);
 router.delete('/:id', orderController.deleteOrder);

module.exports = router;