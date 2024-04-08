import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // sign() creates token gaven payload, secret & propertites of the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "50d",
  });

  // set jwt token as http only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 50, // same as expiresIn: '50d'
  });
};

export default generateToken;
