const express = require("express");
const router = express.Router();
const academyRepo = require("../repositories/academyRepository");

// GET all academies
router.get("/", async (req, res) => {
  try {
    const academies = await academyRepo.getAllAcademies();
    res.json(academies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET academies by sport
router.get("/sport/:sport", async (req, res) => {
  try {
    const academies = await academyRepo.getAcademiesBySport(req.params.sport);
    res.json(academies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET academies by distance
router.get("/distance/:maxKm", async (req, res) => {
  try {
    const academies = await academyRepo.getAcademiesByDistance(
      req.params.maxKm
    );
    res.json(academies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET verified academies
router.get("/verified/all", async (req, res) => {
  try {
    const academies = await academyRepo.getVerifiedAcademies();
    res.json(academies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET academy by ID
router.get("/:id", async (req, res) => {
  try {
    const academy = await academyRepo.getAcademyById(req.params.id);
    if (!academy) return res.status(404).json({ message: "Academy not found" });
    res.json(academy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create academy
router.post("/", async (req, res) => {
  try {
    const { name, sport, location, distanceKm, verified } = req.body;

    const isDuplicate = await academyRepo.findDuplicate(name, sport, location);
    if (isDuplicate) {
      return res.status(409).json({ message: "Academy already exists!" });
    }

    const academy = await academyRepo.createAcademy({
      name,
      sport,
      location,
      distanceKm,
      verified,
    });
    res.status(201).json(academy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update academy
router.put("/:id", async (req, res) => {
  try {
    const academy = await academyRepo.updateAcademy(req.params.id, req.body);
    if (!academy) return res.status(404).json({ message: "Academy not found" });
    res.json(academy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE academy
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await academyRepo.deleteAcademy(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Academy not found" });
    res.json({ message: "Deleted academy with id " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;