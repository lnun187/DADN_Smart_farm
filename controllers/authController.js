const { encryptPassword } = require("../utils/cryptoUtils");
const { decryptPassword } = require("../utils/cryptoUtils");
const User = require("../models/user");

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        // Mã hóa password bằng public key
        const hashedPassword = encryptPassword(password);

        // Lưu vào database
        const newUser = new User({ User_Name: username, HashPassword: hashedPassword, User_Role: role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Tìm user trong database
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: "User not found" });

        // Giải mã password trong DB
        const decryptedPassword = decryptPassword(user.password);

        // Kiểm tra password nhập vào
        if (password !== decryptedPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

module.exports = { register, login };