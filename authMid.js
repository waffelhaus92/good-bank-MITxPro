const jwt = require('jsonwebtoken');

// Middleware for generating JWT
const generateToken = (user) => {
    return jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' }); // Token expires in 1 hour
};

// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp <= currentTime) {
            return res.status(401).json({ message: 'Token expired' });
        }
        // Attach decoded user information to the request object for further processing
        req.user = decoded;
        next();
    });
};

module.exports = { generateToken, verifyToken };