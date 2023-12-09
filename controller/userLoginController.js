//const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");

const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if the user is not given a password and email
  if (!email || !password) {
    //return next(new ErrorHandler("Please Enter Email & Password", 400));
    return res.status(400).json({
        success:false,
        message:"Please Enter Email & Password"
    }) 
  }

  const user = await User.findOne({ email }).select("+password");

  //if not found
  if (!user) {
    //return next(new ErrorHandler("Invalid Email or Password", 401));
    return res.status(401).json({
        success:false,
        message:"Invalid Email or Password"
    })
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    //return next(new ErrorHandler("Invalid Email or Password", 401));
    return res.status(401).json({
        success:false,
        message:"Invalid Password"
    })
  }

  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    message: "User Login successfully!",
    token,
  });
});

module.exports = loginUser;
