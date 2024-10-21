const express = require("express");
const app = express(); 

const bodyParser = require("body-parser");
app.use(bodyParser.json());         // can not read the request message unless transform it to json



const cors = require("cors");
// to allow access from # resources.
// CORS will add a response header access-control-allow-origins
// for using Cookies and it is a part of security. 
// If you want to allow credentials then your Access-Control-Allow-Origin must not use *.
// You will have to specify the exact protocol + domain + port.
app.use(
  cors({
    // origin: "https://menu-admin1.netlify.app",
    origin: "http://localhost:3000",
    credentials: true,
  })
);



// connect to Mongoose database
require("./src/db"); 


// Route Middleware
// a function that executes when routes hit    "/"
const userRoutes = require("./src/routes/userRoutes");
app.use("/", userRoutes);


// listen to the server 
const config = require("./src/config/index");
const port = config.app.port || 5000;
app.listen(port, () => {
    console.log(" 🔥 Server is up and running on port : " + port);
})
