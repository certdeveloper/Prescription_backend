import { Request, Response } from "express";
import HeadImage from "../models/HeadImages";
import { ObjectId } from "mongodb";

const addLeadHeadImage = (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user!;
    const { name } = req.body;
    if (!req.file) {
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

const getLetterHeadImage = async (req: Request, res: Response) => {
  try {
    const { imageId } = req.query;

    if (!imageId) {
      return res.json({
        status: 400,
        message: 'Bad request!'
      });
    }

    const headImage = await HeadImage.findById(imageId);
    if (headImage) {
      const url = headImage.url;
      console.log(url, 'path')
      console.log(process.cwd())
      res.sendFile(process.cwd() + '/' + url);

    } else {
      return res.json({
        status: 400,
        message: "invalid image request!"
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      status: 500,
      message: "Server Error!"
    })
  }

}

const updateLetterHeadImage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!req.file) {
      return res.json({
        status: 400,
        message: "Bad request",
      })
    }
    const url = req.file?.destination + "/" + req.file?.filename;
    const name = req.body.name;

    await HeadImage.updateOne({ userId: userId }, { url: url, name });

    return res.json({
      status: 200,
      message: "Success!",
    })
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Server Error"
    })
  }
}

export default {
  addLeadHeadImage,
  getLetterHeadImage,
  updateLetterHeadImage
}