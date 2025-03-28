const fs = require("fs");
const crypto = require("crypto");

// Đọc private key & public key từ file
const privateKey = fs.readFileSync("config/keys/private.pem", "utf8");
const publicKey = fs.readFileSync("config/keys/public.pem", "utf8");

// Hàm mã hóa password bằng public key
const encryptPassword = (password) => {
    const encrypted = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        },
        Buffer.from(password)
    );
    return encrypted.toString("base64");
};

// Hàm giải mã password bằng private key
const decryptPassword = (encryptedPassword) => {
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        },
        Buffer.from(encryptedPassword, "base64")
    );
    return decrypted.toString();
};

module.exports = { encryptPassword, decryptPassword };
