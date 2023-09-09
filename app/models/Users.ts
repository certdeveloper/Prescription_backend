import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  verified: {
    type: String,
  },
  role: {
    type: String,
  },
}, {
  timestamps: true,
}
);

const User = mongoose.model('User', UserSchema);

export default User;