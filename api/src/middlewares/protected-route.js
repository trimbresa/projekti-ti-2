const {verifyJwtToken} = require("../utils/utils");
const protectedRoute = async (req, res, next) => {
    try {
        await verifyJwtToken(req?.headers?.token ?? '');
        next();
    } catch (error) {
        console.log(error.message);
        res.status(403).json({ "message": "Unauthorized!" })
    }
}

module.exports = protectedRoute;
