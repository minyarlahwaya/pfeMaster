const express = require("express");

const router = express.Router();

const compatibiliteController = require("../controllers/compatibiliteController");

router.post(
    "/",
    compatibiliteController.ajouterCompatibilite
);

router.get(
    "/vehicule/:vehiculeId",
    compatibiliteController.getCompatibilitesVehicule
);
router.delete(
    "/:vehiculeId/:pneuId",
    compatibiliteController.supprimerCompatibilite
);


module.exports = router;