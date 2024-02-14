const order = require("../schema/orderSchema");


// post parts
const newOrder = (req, res, next) => {

    console.log(req.body)
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const orderDetailsSchema = new order({
        address: req.body.address,
        name: req.body.name
       
    });

    orderDetailsSchema.save(orderDetailsSchema).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};

// get Parts
const getAllOrders = (req, res) => {
  
    order.find()
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
const updateOrder= (req, res) => {
    console.log(req.body);
          if (req.body.name == null) {
          return res.status(400).send({
            message: "Data to update can not be empty!"
          });
        }
      const id = req.params.id;
    
      order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

// delete order
const deleteOrder = (req, res) => {
    const id = req.params.id;
  
    order.findByIdAndDelete(id)
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
    newOrder,
    getAllOrders,
    updateOrder,
    deleteOrder
}