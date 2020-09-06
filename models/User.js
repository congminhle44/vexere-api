const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  userType: { type: String, default: "client" },
  avatar: { type: String },
});

// Trước khi đăng ký thì hash mật khẩu
UserSchema.pre("save", function beforeSave(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt
    .genSalt(10) // Độ khó của chuỗi muối
    .then((salt) => bcrypt.hash(user.password, salt)) //Bắt đầu encrypt cũng với chuỗi muối
    .then((hash) => {
      user.password = hash;
      next();
    });
});

const User = mongoose.model("User", UserSchema, "User");

module.exports = {
  UserSchema,
  User,
};
