const Athlete = require("../models/Athlete");

// Get all athletes
const getAllAthletes = async () => {
  return await Athlete.find();
};

// Get athlete by ID
const getAthleteById = async (id) => {
  return await Athlete.findById(id);
};

// Check duplicate athlete
const findDuplicate = async (name, sport, age, academy) => {
  return await Athlete.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
    sport: { $regex: new RegExp(`^${sport}$`, "i") },
    age: age,
    academy: { $regex: new RegExp(`^${academy}$`, "i") },
  });
};

// Create new athlete
const createAthlete = async (data) => {
  const athlete = new Athlete(data);
  return await athlete.save();
};

// Delete athlete by ID
const deleteAthlete = async (id) => {
  return await Athlete.findByIdAndDelete(id);
};

module.exports = {
  getAllAthletes,
  getAthleteById,
  findDuplicate,
  createAthlete,
  deleteAthlete,
};