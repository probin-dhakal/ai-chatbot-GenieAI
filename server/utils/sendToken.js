import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, res, message = "Success") => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "Strict",
  });
  res.status(statusCode).json({
    message,
    token,
  });
};
