import mongoose from "mongoose";

const connectDB = async () => {
    try {

        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB')
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

    } catch (error) {

        console.log("Error",error);
        

    }

}

export default connectDB

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     mongoose.connection.on('connected',()=>{
//         console.log('HI');
        
//     })
//     await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
//     console.log("MongoDB Connected");
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err.message);
//     process.exit(1);
//   }
// };

// export default connectDB;
