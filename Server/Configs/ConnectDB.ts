import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("DB Connected");
  } catch (error) {
    console.error("ERROR : ", error);
  }
};
