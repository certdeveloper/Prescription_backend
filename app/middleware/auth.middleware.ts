import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  const token = req.headers['authorization'] as unknown as string;
  if (!token) {
    return res.json({
      status: 401,
      message: "Not authorized",
    })
  }

  try {
    const decode = jwt.verify(token, SECRET_KEY);
    req.user = decode as UserData;
    return next()
  } catch (error) {
    console.log(error);
    return res.json({
      status: 401,
      message: "Invalid authentication token"
    })
  }
}

export default {
  authenticate
}