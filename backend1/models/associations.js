const User = require("./UserModel");
const Pneu = require("./PneuModel");
const Marque = require("./MarqueModel");
const Vehicule = require("./VehiculeModel");
const VehiculePneu = require("./VehiculePneuModel");
const Commande = require("./Commande");
const CommandeItem = require("./CommandeItem");


// ========================================
// Relation Marque - Pneu
// ========================================

Marque.hasMany(Pneu, {
    foreignKey: "marqueId",
    as: "pneus"
});

Pneu.belongsTo(Marque, {
    foreignKey: "marqueId",
    as: "marque"
});


// ========================================
// Relation Vehicule - Pneu
// ========================================

Vehicule.belongsToMany(Pneu, {
    through: VehiculePneu,
    foreignKey: "vehiculeId",
    otherKey: "pneuId",
    as: "pneus"
});

Pneu.belongsToMany(Vehicule, {
    through: VehiculePneu,
    foreignKey: "pneuId",
    otherKey: "vehiculeId",
    as: "vehicules"
});


// ========================================
// Relation User - Commande
// ========================================

User.hasMany(Commande, {
    foreignKey: "userId",
    as: "commandes"
});

Commande.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});


// ========================================
// Relation Commande - CommandeItem
// ========================================

Commande.hasMany(CommandeItem, {
    foreignKey: "commandeId",
    as: "items"
});

CommandeItem.belongsTo(Commande, {
    foreignKey: "commandeId",
    as: "commande"
});


// ========================================
// Relation Pneu - CommandeItem
// ========================================

Pneu.hasMany(CommandeItem, {
    foreignKey: "pneuId",
    as: "commandeItems"
});

CommandeItem.belongsTo(Pneu, {
    foreignKey: "pneuId",
    as: "pneu"
});


// ========================================
// Export
// ========================================

module.exports = {
    User,
    Pneu,
    Marque,
    Vehicule,
    VehiculePneu,
    Commande,
    CommandeItem
};