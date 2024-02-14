const express = require('express');
const router  = express.Router(); 
const contactController = require('../controller/contactController'); 

 router.post('/', contactController.newContact);
 router.get('/', contactController.getAllContact);
 


module.exports = router;