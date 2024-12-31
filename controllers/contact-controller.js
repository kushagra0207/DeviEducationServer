const Contact = require("../models/contact-model");

const contactForm = async(req,res)=>{

    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({message:"Message Sent Successfully"});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Message Not Sent"});
        
    }

}

module.exports = contactForm;