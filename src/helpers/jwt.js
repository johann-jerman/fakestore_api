import jwt from "jsonwebtoken";
import { PAYLOADJWT } from "../config/envs.js";
const secret = PAYLOADJWT;
export const createJWT = (data) => {
  return jwt.sign(data, secret);
};
export const compareJWT = (data) => {
  return jwt.verify(data, secret);
};
