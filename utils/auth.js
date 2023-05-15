const jwt = require('jsonwebtoken');
const signToken = (data) => {
    const token = jwt.sign(data, 'koderahasia', {expiresIn: '1h'});
    return token;
};

const verifyToken = (token) => {
    const data = jwt.verify(token, 'koderahasia');
    return data;
};

module.exports = {signToken, verifyToken};