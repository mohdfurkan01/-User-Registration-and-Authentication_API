const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  var token = req.headers.authorization;

  //console.log(token);
  if (!token) {
    return res.status(401).json({
        success: false,
        message:"Please Login to access this resource"
    })
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

module.exports = isAuthenticatedUser;
