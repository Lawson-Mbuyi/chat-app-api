import jwt from "jsonwebtoken";
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETE_KEY, {
    expiresIn: "1d",
  });
};
