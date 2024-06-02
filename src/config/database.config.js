const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        const dbURI = "mongodb://localhost:27017/softwareDB";
        await mongoose.connect(dbURI);
    } catch (error) {
        console.error("Error connecting to the database", error);
    }
}

module.exports = connectToDatabase;
