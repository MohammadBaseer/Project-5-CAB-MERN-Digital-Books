import jwt from "jsonwebtoken";

const generateToken = (userID) => {
  const payload = {
    sub: userID,
  };
  // const secretOrPrivateKey = process.env.JWT_SECRET;
  const secretOrPrivateKey = "this is the password that we sett it by self";
  const signOption = {
    expiresIn: "2d",
  };
  const token = jwt.sign(payload, secretOrPrivateKey, signOption);
  return token;
};

export default generateToken;
