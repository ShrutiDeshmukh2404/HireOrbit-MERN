import mangoose from "mongoose";
const connectDB =async()=>{ 
    try {
         await mangoose.connect(process.env.MANGO_URI);
         console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
      
    }
}
export default connectDB;