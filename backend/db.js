const mongoose = require('mongoose')

const mongoURI = "mongodb://127.0.0.1:27017/tododb"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.error("MongoDB connection error:", error)
        process.exit(1)
    }
}

module.exports = connectToMongo