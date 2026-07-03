const express = require("express");
const router = express.Router();
const athleteRepo = require("../repositories/athleteRepository");

// GET all athletes
router.get("/", async (req, res) => {
  try {
    const athletes = await athleteRepo.getAllAthletes();
    res.json(athletes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET athlete by ID
router.get("/:id", async (req, res) => {
  try {
    const athlete = await athleteRepo.getAthleteById(req.params.id);
    if (!athlete) return res.status(404).json({ message: "Athlete not found" });
    res.json(athlete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create athlete
router.post("/", async (req, res) => {
  try {
    const { name, sport, age, academy } = req.body;

    const isDuplicate = await athleteRepo.findDuplicate(
      name,
      sport,
      age,
      academy
    );
    if (isDuplicate) {
      return res.status(409).json({ message: "Athlete already exists!" });
    }

    const athlete = await athleteRepo.createAthlete({
      name,
      sport,
      age,
      academy,
    });
    res.status(201).json(athlete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE athlete by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await athleteRepo.deleteAthlete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Athlete not found" });
    res.json({ message: "Deleted athlete with id " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;