import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Atlas bağlantısı başarılı!");
  } catch (error) {
    console.error("❌ MongoDB bağlantı hatası:", error.message);
    process.exit(1);
  }
};
