const addBikes = require("../schema/bikeSchema");

// post bikes
const newBikes = (req, res, next) => {

    console.log(req.body)
    // Validate request
    if (!req.body.bikeName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const bikesSchema = new addBikes({
        bikeImage: req.body.bikeImage,
        bikeName: req.body.bikeName,
        price: req.body.price,
        discription: req.body.discription
    });

    bikesSchema.save(bikesSchema).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};

// get Bikes
const getAllBikes = (req, res) => {
  
    addBikes.find()
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

// update bikes
const updateBike= (req, res) => {
    console.log(req.body);
          if (req.body.bikeName == null) {
          return res.status(400).send({
            message: "Data to update can not be empty!"
          });
        }
      const id = req.params.id;
    
      addBikes.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
const deleteBike = (req, res) => {
    const id = req.params.id;
  
    addBikes.findByIdAndDelete(id)
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
    newBikes,
    getAllBikes,
    updateBike,
    deleteBike
}