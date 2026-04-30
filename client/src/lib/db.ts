import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  console.log(process.env.MONGO_URI);
  
  await mongoose.connect(process.env.MONGO_URI as string);

};