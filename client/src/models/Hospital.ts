import mongoose, { Schema } from "mongoose";

const hospitalSchema = new Schema(
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

    contactNumbers: [
      {
        type: String,
      },
    ],

    address: {
      type: String,
    },

    location: {
      type: String,
    },

    image: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Hospital ||
  mongoose.model("Hospital", hospitalSchema);