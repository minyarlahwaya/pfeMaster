const express = require("express");
const router = express.Router();

const vehiculeController = require("../controllers/vehiculeController");

router.get(
    "/immatriculation/:immatriculation",
    vehiculeController.searchVehicule
);

module.exports = router;