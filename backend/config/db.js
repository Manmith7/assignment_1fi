import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connection Success");
    } catch (error) {
        console.log("Error connecting MongoDB : ", error.message)
    }

}

