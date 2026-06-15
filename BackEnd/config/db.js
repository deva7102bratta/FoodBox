import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(
      "mongodb+srv://devabratta:js82jJu72hH77WHWOJSYN1937H@cluster0.d41rm7j.mongodb.net/?appName=Cluster0"
    ).then(()=>console.log("DB Connected"))
}
