import { hash, compare } from "bcrypt";
export const hashPass = async (toHash) => {
  return await hash(toHash, 12);
};
export const compareHash = async (hash, hashToCompare) => {
  return await compare(hash, hashToCompare);
};
