const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res
            .status(401)
            .json({ msg: 'No token received, unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;

        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ msg: 'Token is invalid' });
    }
};
