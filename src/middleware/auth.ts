import { Request, Response, NextFunction } from 'express';
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/');
  }
};