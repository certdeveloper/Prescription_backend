import fs, { existsSync } from "fs";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import Prescription from "../models/Prescriptions";

const add = (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user!;
    const { name } = req.body;
    if (!req.file || !name) {
      return res.json({
        status: 400,
        message: "Bad request!"
      })
    }
    const url = req.file.destination + "/" + req.file.filename;

    const prescription = new Prescription({
      userId: new ObjectId(user._id),
      url,
      name
    });

    prescription.save();

    return res.json({
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

const get = async (req: Request, res: Response) => {
  try {
    const { prescriptionId } = req.query;

    if (!prescriptionId) {
      return res.json({
        status: 400,
        message: 'Bad request!'
      });
    }

    const prescription = await Prescription.findById(prescriptionId);
    if (prescription) {
      const url = prescription.url;
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

const deleteOne = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.user?._id;
    if (!req.file) {
      return res.json({
        status: 400,
        message: "Bad request",
      })
    }

    const prescription = await Prescription.findOne({ _id: new ObjectId(id) });
    const url = process.cwd() + "/" + prescription?.url;
    await Prescription.deleteOne({ _id: new ObjectId(id) });

    if (existsSync(url)) {
      fs.unlinkSync(url)
    }

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

const getAll = async (req: AuthenticatedRequest, res: Response) => {
 try{
   const userId = req.user!._id;

  const data = await Prescription.find({userId: new ObjectId(userId)});

  return res.json({
    status: 200,
    data,
  })
  } catch(error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Server Error"
    })
  }
}

export default {
  add,
  deleteOne,
  get,
  getAll,
}