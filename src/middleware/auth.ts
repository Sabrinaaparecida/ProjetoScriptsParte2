import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  userId: number;
  userName: string;
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;

    res.locals.userId = decoded.userId;
    res.locals.userName = decoded.userName;

    next();
  } catch (error) {
    res.clearCookie('jwt');
    return res.redirect('/');
  }
};