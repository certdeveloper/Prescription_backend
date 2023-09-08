import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/Users";

const signUpWithNumber = async (req: Request, res: Response) => {
  const {
    email,
    password,
    name,
    cPassword,
    phoneNumber
  } = req.body;
  console.log(req.body)
  if (!phoneNumber || !name || !password ) {
    return res.json({
      status: 400,
      message: "Invalid Form data!",
    })
  }

  if (password !== cPassword) {
    return res.json({
      status: 400,
      message: "Password is not equal to confirmed Password"
    });
  }

  const users = await User.find({ phoneNumber });
  if (users.length > 0) {
    return res.json({
      status: 304,
      message: "This Email is in using, Please another Email!"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    name,
    role: "doctor",
    phoneNumber
  })

  await user.save();
  return res.status(200).json({
    status: 200,
    message: "Suceeded in Registration",
  });

}

export default {
  signUpWithNumber,
}