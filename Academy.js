const mongoose = require("mongoose");

const academySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    location: { type: String, required: true },
    distanceKm: { type: Number },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Academy", academySchema);