import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, res, message = "Success") => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    secure: false,
    maxAge: 3600000,
    sameSite: "Lax",
  });
  res.status(statusCode).json({
    message,
    token,
  });
};
