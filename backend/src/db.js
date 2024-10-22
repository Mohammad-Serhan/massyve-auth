const mongoose = require("mongoose");
const config = require("./config/index");

//connect to DB
// Environment : Development or Production
mongoose.connect(config.database.remote, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 });

let conn = mongoose.connection; // to hook events to know connection is working correctly
conn.on("connected", function () {
	console.log("MongoDB connected  successfully ☘️");
});

conn.on("disconnected", function () {
	console.log("Error in connection to db ⚠️ :  !!");
});

conn.on("error", console.error.bind(console, " error: "));

module.exports = conn;
