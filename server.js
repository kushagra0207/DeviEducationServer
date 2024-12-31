require("dotenv").config();// allowing to use .env file and waiting for the env file loading
const express = require('express');
const cors = require('cors')

const app = express();
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/database");
const errorMidleware = require("./middlewares/error-middleware");



// handling cors policy issue. Connecting my server local host 5000 to frontend client localhost 5173
// Allowing acces to frontend client connection using cors


const corsOptions = {
    origin: "https://statuesque-faloodeh-1aa267.netlify.app",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,

};

app.use(cors(corsOptions));


// new
app.use(express.json());



app.use("/api/auth", authRoute); // middleware abh api and auth apke url me hona jruri hai
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

app.use(errorMidleware);


// const PORT = 5000;
const PORT = process.env.PORT || 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening at ${PORT}, Home Server Link is http://localhost:5000/api/auth `);
    });

});
