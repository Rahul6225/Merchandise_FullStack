import mongoose from "mongoose";

const connectDB = async () => {
  const URI = process.env.MONGO_URI;
try {
  if (!URI) {
    throw new Error("MONGO_URI is not defined in the environment variables.");
  }

  const connect = await mongoose.connect(URI, {
    dbName: "VeneraDB",
  });
  console.log("Connected To mongoDB");
} catch (error) {
  console.log(`ERROR IS ${error}`);
}
};

export  {connectDB};


