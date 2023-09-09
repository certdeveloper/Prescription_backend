import { Request, Response } from "express";
import HeadImage from "../models/HeadImages";
import { ObjectId } from "mongodb";

const addLeadHeadImage = (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user!;
    const { name } = req.body;
    if (!name || !req.file) {
      return res.json({
        status: 400,
        message: "Bad request!"
      })
    }
    const url = req.file.destination + "/" + req.file.filename;

    const headImage = new HeadImage({
      userId: new ObjectId(user._id),
      url,
      name
    });

    headImage.save();

    res.json({
      status: 200,
      message: "success"
    })
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: "Server Error!"
    });
  }
}



export default {
  addLeadHeadImage
}