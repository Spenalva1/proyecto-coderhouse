import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import config from '../config/config.js';
import logger from '../lib/logger.js';
import UserDAO from '../dao/UserDAO.js';

export default new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET || 'secretoparajwt123321',
  },
  async (payload, done) => {
    try {
      const id = payload?._id;
      if (!id) {
        return done(null, user);
      }
      const user = await UserDAO.findById(id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      logger.error(`Error de passport. ${error}`);
    }
  }
);

export function passportAuth() {
  return passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/unauthorized',
  });
}
