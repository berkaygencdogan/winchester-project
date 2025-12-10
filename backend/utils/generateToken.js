import jwt from "jsonwebtoken";

export function generateToken(uid) {
  return jwt.sign({ uid }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}
