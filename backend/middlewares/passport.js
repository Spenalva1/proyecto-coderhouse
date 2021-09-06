import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import User from '../models/User.js';

export default new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const id = payload?.user?._id;
      if (!id) {
        return done(null, user);
      }
      const user = await User.findById(id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      console.error(error);
    }
  }
);

export function passportAuth() {
  return passport.authenticate('jwt', { session: false });
}
