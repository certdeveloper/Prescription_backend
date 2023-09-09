import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
  userId: {
    type: ObjectId,
    requried: true,
  },
  title: {
    type: String,
  },
  headImg: {
    type: ObjectId,
  },
  url: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Prescription = mongoose.model('Prescription', PrescriptionSchema);

export default Prescription;