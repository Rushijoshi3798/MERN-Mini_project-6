const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    Fname: String,
    Lname: String,
    email: String,
    mobile: Number,
    dob: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = {
  UserModel,
};
