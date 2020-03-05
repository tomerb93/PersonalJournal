const jwt = require('jsonwebtoken');
const config = require('config');

let jwtSecret;

if (config.get('jwtSecret') === undefined) {
    // production mode
    jwtSecret = process.env.JWT_SECRET;
} else {
    jwtSecret = config.get('jwtSecret');
}

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res
            .status(401)
            .json({ msg: 'No token received, unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded.user;

        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ msg: 'Token is invalid' });
    }
};
