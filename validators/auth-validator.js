const {z} = require("zod");


const loginSchema = z.object({

    email:z.string({required_error: "Email is Required"})
    .trim()
    .email({message: "Invalid Email address"})
    .min(3, {message: "Name must be at least 3 characters"})
    .max(255, {message: "Name must not be more than 255 character"}), 

    password:z.string({required_error: "Password is Required"})
    .min(7, {message: "Password must be atleast of 7 characters"})
    .max(1024, {message: "Password can not be greater than 1024 characters"}), 


});



const signupSchema = loginSchema.extend({
    username: z.string({required_error: "Name is Required"})
    .trim()
    .min(3, {message: "Name must be at least 3 characters"})
    .max(255, {message: "Name must not be more than 255 character"}),
 

    phone:z.string({required_error: "Phone is Required"})
    .trim()
    .min(10, {message: "Phone Number must be of 10 Characters"})
    .max(15, {message: "Phone Number must be of 10 Characters"}), 

    


});



module.exports = {signupSchema, loginSchema};