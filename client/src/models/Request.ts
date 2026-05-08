import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema(
  {
    bloodGroup: {
      type: String,
      required: true,
    },

    units: {
      type: Number,
      required: true,
    },

    urgency: {
      type: String,
      enum: ["normal", "emergency"],
      default: "normal",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "fulfilled"],
      default: "pending",
    },

    
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

   
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      default: null,
    },

    // optional: message / note
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Request ||
  mongoose.model("Request", requestSchema);