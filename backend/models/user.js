import { Schema, Types, model } from "mongoose";
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String, 
    required: true,
  },
  lastName: {
    type: String, 
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todo: [
    {
      type: Types.ObjectId,
      ref: "Todo",
    },
  ],
});

export default model("User", userSchema);
