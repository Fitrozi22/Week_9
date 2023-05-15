const { verifyToken } = require('../utils/auth.js');

const authMiddleware = (req, res, next) => {
    const data = verifyToken(req.params.token);
    console.log(data);
    if (data.role === 'Electrician') {
        next();
    } else {
        res.status(401).json({message: 'Unauthorized'})
    }
};

module.exports = authMiddleware;