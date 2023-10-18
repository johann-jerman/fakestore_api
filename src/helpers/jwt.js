import jwt from "jsonwebtoken";
import { hashSync } from "bcrypt";
import { PAYLOADJWT } from "../config/envs.js";
const secret = hashSync(PAYLOADJWT, 20);
export const createJWT = (data) => {
  return jwt.sign(data, secret);
};
export const compareJWT = (data) => {
  return jwt.verify(data, secret);
};
