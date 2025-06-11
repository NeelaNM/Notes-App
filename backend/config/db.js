import mongoose from "mongoose";


export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected.. ');
    } catch(err){
        console.log('Error in connecting..')
    }
}