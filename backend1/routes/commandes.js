const express = require("express");

const router = express.Router();

const commandeController = require("../controllers/CommandeController");

const requireAuth = require("../middleware/requireAuth");


// ========================================
// CRÉER UNE COMMANDE
// ========================================

router.post(
    "/",
    requireAuth,
    commandeController.createCommande
);


// ========================================
// MES COMMANDES
// ========================================
router.get(
    "/mes-commandes",
    requireAuth,
    commandeController.getMesCommandes
);

// ========================================
// UNE COMMANDE PAR ID
// ========================================

router.get(
    "/:id",
    requireAuth,
    commandeController.getCommandeById
);


module.exports = router;