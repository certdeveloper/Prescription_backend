import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const HeadImageSchema = new Schema({
  useId: {
    type: ObjectId,
    requried: true,
  },
  name: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const HeadImage = mongoose.model('HeadImage', HeadImageSchema);

export default HeadImage;