const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB COnnected");
    } catch (error) {
        console.log("MongoDB COnnection Failed", error)
    }
}

module.exports = connectDB;