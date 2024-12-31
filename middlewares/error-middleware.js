
// The Default Error Handler as a Express Package
const errorMidleware = (err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "BackEnd Department Error";
    const extraDetails = err.extraDetails || "Error From BackEnd Side";


    return res.status(status).json({message, extraDetails});



}


module.exports = errorMidleware;