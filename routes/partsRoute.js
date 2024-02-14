const express = require('express');
const router  = express.Router(); 
const partsController = require('../controller/partsController'); 

 router.post('/', partsController.newParts);
 router.get('/', partsController.getAllParts);
 router.put('/:id', partsController.updatePart);
 router.delete('/:id', partsController.deletePart);






module.exports = router;