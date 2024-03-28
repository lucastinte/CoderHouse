import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userModel } from "../../../models/user";

const cookieExtractor = (req) => {
  console.log(req.cookies);
  const token = req.cookies ? req.cookies.jwtCookie : [];
  console.log(token);
  return token;
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //cuando creo un token contiene una encriptacion propia del servidor
  secretOrKey: "coderhouse",
};
export const strategyJWT = new JwtStrategy(
  jwtOptions,
  async (payload, done) => {
    try {
      console.log(payload);
      const user = await userModel.findById(payload._id);
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (e) {
      //hubo error el ususario no se logeo
      done(e, null);
    }
  }
);
