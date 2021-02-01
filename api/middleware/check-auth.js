const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
    const token = req.headers.authorization.split(" ") [1];//access 2nd segment after white space as token is Bearer token
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY); //error will return if fail
    req.userData = decoded;
    next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}