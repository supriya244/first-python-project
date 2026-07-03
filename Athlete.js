const mongoose = require('mongoose');

const athleteSchema = new mongoose.Schema({
    name:    { type: String, required: true },
    sport:   { type: String, required: true },
    age:     { type: Number, required: true },
    academy: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Athlete', athleteSchema);