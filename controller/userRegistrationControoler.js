//const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");

//Register a user or Create a user
const registerUser = catchAsyncErrors(async (req, res, nex) => {
  const { username, email, password } = req.body;

  //console.log(req.body);
  const user = await User.create({
    username,
    email,
    password,
  });
  // console.log(user);
  const token = user.getJWTToken();
  //console.log(token);
  res.status(201).json({
    success: true,
    message: "User has been created successfully",
    user,
    token,
  });
});

module.exports = registerUser;