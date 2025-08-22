const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = decoded; // Attach user info to request object
            next(); // Proceed to the next middleware or route handler
        }

        )
    }
    else {
        return res.status(401).json({ message: 'No token provided' });
    }   
}

module.exports = validateToken; 