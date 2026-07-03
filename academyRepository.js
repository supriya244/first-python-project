const Academy = require("../models/Academy");

// Get all academies
const getAllAcademies = async () => {
  return await Academy.find();
};

// Get academy by ID
const getAcademyById = async (id) => {
  return await Academy.findById(id);
};

// Get academies by sport
const getAcademiesBySport = async (sport) => {
  return await Academy.find({
    sport: { $regex: new RegExp(`^${sport}$`, "i") },
  });
};

// Get academies within max distance
const getAcademiesByDistance = async (maxKm) => {
  return await Academy.find({
    distanceKm: { $lte: parseFloat(maxKm) },
  });
};

// Get verified academies
const getVerifiedAcademies = async () => {
  return await Academy.find({ verified: true });
};

// Check duplicate academy
const findDuplicate = async (name, sport, location) => {
  return await Academy.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
    sport: { $regex: new RegExp(`^${sport}$`, "i") },
    location: { $regex: new RegExp(`^${location}$`, "i") },
  });
};

// Create new academy
const createAcademy = async (data) => {
  const academy = new Academy(data);
  return await academy.save();
};

// Update academy by ID
const updateAcademy = async (id, data) => {
  return await Academy.findByIdAndUpdate(id, data, { new: true });
};

// Delete academy by ID
const deleteAcademy = async (id) => {
  return await Academy.findByIdAndDelete(id);
};

module.exports = {
  getAllAcademies,
  getAcademyById,
  getAcademiesBySport,
  getAcademiesByDistance,
  getVerifiedAcademies,
  findDuplicate,
  createAcademy,
  updateAcademy,
  deleteAcademy,
};