const mongoose = require("mongoose");

const softwareSchema = new mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    builtBy: { type: String, required: true },
    price: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    latestVersion: { type: String, required: true },
    platform: [{ type: String, required: true }],
    os: [{ type: String, required: true }],
});

module.exports = mongoose.model("Software", softwareSchema);
