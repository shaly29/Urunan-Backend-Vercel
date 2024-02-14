const contact = require("../schema/contactSchema");


// get api contact
const getAllContact = (req, res) => {
  
    contact.find()
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



// post contact
const newContact = (req, res, next) => {

    console.log(req.body)
    // Validate request
    if (!req.body.userName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const contactmeSchema = new contact({
        userName: req.body.userName,
        email: req.body.email,
        // phone: req.body.phone,
        message: req.body.message
    });

    contactmeSchema.save(contactmeSchema).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};



module.exports = {
    newContact,
    getAllContact   
}