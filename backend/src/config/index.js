const dotenv = require("dotenv");
const envFound = dotenv.config();

if (envFound.error) {
    throw new Error("Couldn't find .env file ⚠️");
}

const ENV = "DEV";

module.exports = {
	app: {
		port: parseInt(process.env.PORT) || 3000, // The port for the backend server
		frontend_url: process.env.FE_URL , // The frontend URL for CORS
		backend_url: process.env.BE_URL , // The frontend URL for CORS
	},
	database: {
		local: process.env.db_local, // Use local db URL if needed for dev
		remote: process.env.db_URL, // The actual remote database URL
	},
};
