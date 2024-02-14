const addParts = require("../schema/partsSchema");


// post parts
const newParts = (req, res, next) => {

    console.log(req.body)
    // Validate request
    if (!req.body.partsName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const partSchema = new addParts({
        partsImage: req.body.partsImage,
        partsName: req.body.partsName,
        price: req.body.price,
        discription: req.body.discription
    });

    partSchema.save(partSchema).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};

// get Parts
const getAllParts = (req, res) => {
  
    addParts.find()
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
const updatePart= (req, res) => {
    console.log(req.body);
          if (req.body.partsName == null) {
          return res.status(400).send({
            message: "Data to update can not be empty!"
          });
        }
      const id = req.params.id;
    
      addParts.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
const deletePart = (req, res) => {
    const id = req.params.id;
  
    addParts.findByIdAndDelete(id)
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
    newParts,
    getAllParts,
    updatePart,
    deletePart
}