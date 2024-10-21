const dotenv = require("dotenv");
const envFound = dotenv.config();

if (envFound.error) {
    throw new Error("Couldn't find .env file ⚠️");
}

const ENV = "DEV";

module.exports = {
	app: {
		port: process.env.PORT, 
		frontend_url: process.env.FE_URL , 
		backend_url: process.env.BE_URL , 
	},
	database: {
		local: process.env.db_local, // Use local db URL if needed for dev
		remote: process.env.db_URL, // The actual remote database URL
	},
};
