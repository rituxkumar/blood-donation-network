import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema(
  {
    bloodGroup: String,
    units: Number,
    urgency: String,

    status: {
      type: String,
      default: "pending",
    },

   
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Request ||
  mongoose.model("Request", requestSchema);