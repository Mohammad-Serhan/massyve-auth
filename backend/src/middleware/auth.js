const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const envFound = dotenv.config();

if (envFound.error) {
	throw new Error("Couldn't find .env file ⚠️");
}


const authenticateToken = (req, res, next) => {
    
  try {
        // console.log("cookie = " + req.headers.cookie.split('; '));
        const authHeader = req.headers["authorization"];
        // console.log("header = ------" + authHeader+"-----");
        const token = authHeader && (authHeader.split(" ")[1] || authHeader);
        // console.log("token = -------" + token + "----------")
        if (token === null) {
            return res.status(401).send({
                authenticated: false,
            });
        }

        
        jwt.verify(token, process.env.token, function (err, decoded) {
			if(err) {
			    console.log("------error verify");
			    return res.status(401).send({
			        authenticated: false,
			        message: err.message,
			    });
			}
			
			req.user = decoded.user; // Save user info for use in next middleware
			next();
		});

    } catch (error) {
        return res.status(401).send({
            authenticated: false,
            error: error.message,
        });
    }
    
};

module.exports = authenticateToken;
