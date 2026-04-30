import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema({
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Hospital",
  },

  bloodGroup: String,
  units: Number,

  urgency: {
    type: String,
    enum: ["normal", "emergency"],
  },

  status: {
    type: String,
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.models.Request ||
  mongoose.model("Request", requestSchema);