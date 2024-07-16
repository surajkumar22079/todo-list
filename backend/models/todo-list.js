import { Schema, Types, model } from "mongoose";
const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    type:{
        type: String,
        required: true,
        enum: ["Official", "Personal", "Hobby"],
        default: "Official"
    },
    deadline: {
      type: Date, 
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    userId: [{
      type: Types.ObjectId,
      ref: "User",
      required:true
    }],
  },
  { timestamps: true }
);

export default model("Todo", listSchema);
