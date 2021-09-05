import { isValidObjectId } from '../db/db.js';

export const isValidMongoId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error_description: 'Id erroneo.' });
  }
  next();
};
