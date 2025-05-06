const jwt = require('jsonwebtoken');
const secretKey = process.env.PRIVATE_KEY_PASSPHRASE;

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];  // Lấy token từ header Authorization: Bearer <token>

    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }
    
    console.log("Middleware authenticateToken is running...");

    // Xác minh token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user;  // Thêm thông tin người dùng vào request object
        next();  // Tiếp tục với các API tiếp theo
    });
}

module.exports = { authenticateToken };
