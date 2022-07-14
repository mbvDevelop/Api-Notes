const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('token');
    if(!token) return res.status(401).send("Access denied");

    try {
        const verified = jwt.verify(token, "42");
        req.user = verified;
        next();
    } catch(err)  {
        res.status(401).send('Invalid Token');
    }
}
