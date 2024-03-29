import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  /*
        1°: Objeto de asociacion del token (Usuario)
        2°: Clave privada del cifrado
        3°: Tiempo de expiracion
    */
  const token = jwt.sign({ user }, "<secretKey>", { expiresIn: "12h" });
  return token;
};
//se genera el token
console.log(
  generateToken({
    _id: "65fe20bac08e9a187ecd376c",
    first_name: "ana",
    last_name: "anas",
    age: 33,
    password: "$2b$15$/V4NXuXjuRhchY1vEnzfReXf9iNPKmyiZyzgseNrerEtcicxkMV9u",
    email: "adminCoder@coder.com",
    rol: "User",
    __v: 0,
  })
);
