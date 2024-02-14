const express = require('express');
const router  = express.Router(); 
const reviewController = require('../controller/reviewController'); 

 router.post('/', reviewController.newReview);
 router.get('/', reviewController.getAllReviews);
 router.put('/:id', reviewController.updateReview);
 router.delete('/:id', reviewController.deleteReview);






module.exports = router;