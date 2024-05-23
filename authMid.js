const jwt = require('jsonwebtoken');

// Middleware for generating JWT
const generateToken = (user) => {
    return jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' }); // Token expires in 1 hour
};

// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token[1], 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp <= currentTime) {
            return res.status(401).json({ message: 'Token expired' });
        }
        // Attach decoded user information to the request object for further processing
        req.userId = decoded.userId;
        next();
    });
};

module.exports = { generateToken, verifyToken };