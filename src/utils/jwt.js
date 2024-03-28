import { Jwt } from "jsonwebtoken";
export const generateToken = (user) => {
  // Objeto de asociacion del toke
  //clave
  //tiempo de wexpiracion
  const token = jwt.sign({ user }, "coderhouse", { expiresIn: "12h" });
  return token;
};
