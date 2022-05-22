const profileController = require("../controllers/profile.controller");
const express = require("express");
const router = express.Router();

router.get("/", profileController.getAllProfiles);

router.get("/:id", profileController.getProfileById);

router.post("/", profileController.addNewProfile);

router.put("/:id", profileController.editProfile);

router.delete("/:id", profileController.deleteProfile);

module.exports = router;
