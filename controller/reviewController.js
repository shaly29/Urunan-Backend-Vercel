const addReview = require("../schema/reviewSchema");


// post parts
const newReview = (req, res, next) => {

    console.log(req.body)
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const FeedBackSchema = new addReview({
        message: req.body.message,
        name: req.body.name
       
    });

    FeedBackSchema.save(FeedBackSchema).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};

// get Parts
const getAllReviews = (req, res) => {
  
    addReview.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// update parts
const updateReview= (req, res) => {
    console.log(req.body);
          if (req.body.partsName == null) {
          return res.status(400).send({
            message: "Data to update can not be empty!"
          });
        }
      const id = req.params.id;
    
      addReview.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id
          });
        });
};

// delete bikes
const deleteReview = (req, res) => {
    const id = req.params.id;
  
    addReview.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };



module.exports = {
    newReview,
    getAllReviews,
    updateReview,
    deleteReview
}