const { encryptPassword } = require("../utils/cryptoUtils");
const { decryptPassword } = require("../utils/cryptoUtils");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const secretKey = process.env.PRIVATE_KEY_PASSPHRASE

const register = async (req, res) => {
    try {
        console.log("Registering user...");
        const { Email, Password, Name, Phone, Role } = req.body;
        // Mã hóa password bằng public key
        const HashPassword = encryptPassword(Password);

        // Lưu vào database
        const newUser = new User({ Email: Email , HashPassword: HashPassword, Name : Name, Phone: Phone, Role: Role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

const login = async (req, res) => {
    try {
        const { Email, password } = req.body;

        // Tìm user trong database
        const user = await User.findOne({ Email: Email });
        if (!user) return res.status(401).json({ message: "User not found" });

        // Giải mã password trong DB
        const decryptedPassword = decryptPassword(user.HashPassword);
        // Kiểm tra password nhập vào
        if (password !== decryptedPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { userId: user._id, Email: user.Email, Role: user.Role },
            secretKey,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

module.exports = { register, login };