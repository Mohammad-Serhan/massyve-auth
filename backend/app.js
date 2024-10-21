const express = require("express");
const app = express(); 
const config = require("./src/config/index");

// Body-parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());         // can not read the request message unless transform it to json



// CORS setup to allow frontend to communicate with backend
const cors = require("cors");
app.use(
	cors({
		// origin: "config.app.port",
		origin: config.app.frontend_url, // Frontend URL from the config
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
const port = config.app.port;
app.listen(port, () => {
    console.log(" 🔥 Server is up and running on port : " + port);
})
