import mongoose, { Schema } from "mongoose";

const donorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    location: {
      type: String,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    image: {
      url: { type: String },
      public_id: { type: String },
    },

    donationsCount: {
      type: Number,
      default: 0,
    },

    totalUnitsDonated: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Donor ||
  mongoose.model("Donor", donorSchema);