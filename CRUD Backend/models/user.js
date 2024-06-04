const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "branch"],
    default: "user",
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  accessRights: [
    {
      type: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
