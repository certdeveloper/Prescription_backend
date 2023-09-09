import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/Users";

type UserData = {
  phoneNumber: string,
  password: string,
  name: string,
  _id: string,
}

const signUpWithNumber = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      name,
      cPassword,
      phoneNumber
    } = req.body;

    if (!phoneNumber || !name || !password) {
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

  } catch (err) {
    console.error(err);

    res.json({
      status: 500,
      messag: "Server ERR!"
    })
  }
}

const signInWithPassword = async (req: Request, res: Response) => {
  try {
    const {
      phoneNumber,
      password,
    } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (
      !user
      || !(await bcrypt.compare(password, user.password))
    ) {

      return res.json({
        status: 400,
        message: "Invalid Credential!",
        type: "warning",
      });

    } else {

      const token = generateJWT({
        phoneNumber: user.phoneNumber,
        name: user.name,
        _id: user._id.toString(),
        password: user.password
      });

      return res.json({
        status: 200,
        access_token: token,
      });

    }
  } catch (error) {
    console.error(error),
      res.json({
        status: 500,
        message: "Server ERR!"
      })
  }
}

const generateJWT = (userData: UserData) => {
  const token = jwt.sign({
    phoneNumber: userData.phoneNumber,
    name: userData.name,
    password: userData.password,
  }, process.env.SECRET_KEY!)

  return token;
}

const signInWithJWT = async (req: Request, res: Response) => {
  try {
    let token = req.headers["authorization"] as unknown as string;
    const user: UserData = jwt.verify(token, process.env.SECRET_KEY!) as UserData

    token = generateJWT(user)
    res.json({ user, access_token: token });
    return;
  } catch (error) {
    res.json({
      message: 'Not authorized',
      status: 403
    })
  }
}

export default {
  signUpWithNumber,
  signInWithPassword,
  signInWithJWT,
}