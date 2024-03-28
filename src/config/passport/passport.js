import local from "passport-local";
import passport from "passport";
import GithubStrategy from "passport-github2";
import { userModel } from "../../models/user.js";
import { createHash, validatePassword } from "../../utils/bcrypt.js";
import { strategyJWT } from "./strategies/jwtStrategy.js";
const localStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, password, age } = req.body;
          const findUser = await userModel.findOne({ email: email });
          if (findUser) {
            return done(null, false);
          } else {
            const user = await userModel.create({
              first_name: first_name,
              last_name: last_name,
              email: email,
              age: age,
              password: createHash(password),
            });
            return done(null, user);
          }
        } catch (e) {
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username }).lean();
          if (user && validatePassword(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (e) {
          return done(e);
        }
      }
    )
  );
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.61c76e534853eba7",
        clientSecret: "678210ca0d2f3a38b781057f6aa01f018ad9372a",
        callbakckURL: "http://localhost:8080/api/session/githubSession",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(accessToken);
          console.log(refreshToken);
          const user = await userModel
            .findOne({ email: profile._json.email })
            .lean();
          if (user) {
            done(null, user);
          } else {
            const userCreate = await userModel.create({
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              age: 18,
              password: createHash(`${profile._json.name}`),
            });
            return done(null, userCreate);
          }
        } catch (e) {
          return done(e);
        }
      }
    )
  );
  passport.use("jwt", strategyJWT);
};

export default initializePassport;
