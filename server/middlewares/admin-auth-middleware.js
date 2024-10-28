const jwt = require('jsonwebtoken');
const Admin = require('../models/admin-model');

const adminAuthMiddleware = async (req, res, next) => {
    const webtoken = req.header('Authorization');
    if (!webtoken) {
        return res.status(401).json({ msg: 'Unauthorized HTTP, Token not Provided' });
    }
    
    console.log("Token from auth middleware:", webtoken);
    
    const token = webtoken.replace('Bearer ', '').trim(); // Ensure the space is included
    try {
        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(isVerified);

        const AdminData = await Admin.findOne({ adminemail: isVerified.ademail }).select({ adminpassword: 0 });
        
        if (!AdminData) {
            return res.status(401).json({ msg: 'Unauthorized, Admin Not Found' });
        }

        req.user = AdminData;
        req.gettoken = token;
        req.userID = AdminData._id;
        console.log(AdminData);
        next();
    } catch (error) {
        console.error("Token verification error:", error); // Log the error for debugging
        return res.status(401).json({ msg: 'Unauthorized, Invalid Token' });
    }
}

module.exports = adminAuthMiddleware;
