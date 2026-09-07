const sequelize = require("../db/db");

const User = require("../models/UserModel");
const Pneu = require("../models/PneuModel");
const Marque = require("../models/MarqueModel");
const Vehicule = require("../models/VehiculeModel");
const VehiculePneu = require("../models/VehiculePneuModel");

const Commande = require("../models/Commande");
const CommandeItem = require("../models/CommandeItem");


// ========================================
// CRÉER UNE COMMANDE
// ========================================

module.exports.createCommande = async (req, res) => {

    const transaction = await sequelize.transaction();

    try {

        // ========================================
        // UTILISATEUR CONNECTÉ
        // ========================================

        const userId = req.userId;

        console.log(
            "Utilisateur connecté :",
            userId
        );


        // ========================================
        // VÉRIFIER L'UTILISATEUR
        // ========================================

        const user = await User.findByPk(userId);

        if (!user) {

            await transaction.rollback();

            return res.status(404).json({

                success: false,

                message: "Utilisateur introuvable."

            });

        }


        // ========================================
        // RÉCUPÉRER LE PANIER
        // ========================================

        const { items } = req.body;


        if (
            !items ||
            !Array.isArray(items) ||
            items.length === 0
        ) {

            await transaction.rollback();

            return res.status(400).json({

                success: false,

                message: "Le panier est vide."

            });

        }


        // ========================================
        // VÉRIFIER LES ARTICLES
        // ========================================

        let total = 0;

        const produits = [];


        for (const item of items) {

            // ========================================
            // Vérifier les données
            // ========================================

            if (
                !item.pneuId ||
                !item.quantite
            ) {

                await transaction.rollback();

                return res.status(400).json({

                    success: false,

                    message:
                        "pneuId et quantite sont obligatoires."

                });

            }


            // ========================================
            // Récupérer le pneu
            // ========================================

            const pneu = await Pneu.findByPk(
                item.pneuId,
                {
                    transaction
                }
            );


            if (!pneu) {

                await transaction.rollback();

                return res.status(404).json({

                    success: false,

                    message:
                        `Pneu ${item.pneuId} introuvable.`

                });

            }


            // ========================================
            // Vérifier la quantité
            // ========================================

            const quantite = Number(item.quantite);


            if (
                !Number.isInteger(quantite) ||
                quantite <= 0
            ) {

                await transaction.rollback();

                return res.status(400).json({

                    success: false,

                    message: "La quantité est invalide."

                });

            }


            // ========================================
            // Vérifier le stock
            // ========================================

            if (
                Number(pneu.stock) < quantite
            ) {

                await transaction.rollback();

                return res.status(400).json({

                    success: false,

                    message:
                        `Stock insuffisant pour ${pneu.modele}.`

                });

            }


            // ========================================
            // Calcul du total
            // ========================================

            total +=
                Number(pneu.prix) *
                quantite;


            // ========================================
            // Stocker le produit
            // ========================================

            produits.push({

                pneu,

                quantite

            });

        }


        // ========================================
        // CRÉER LA COMMANDE
        // ========================================

        const commande = await Commande.create({

            userId: user.id,

            nom: user.nom,

            prenom: user.prenom,

            telephone: user.telephone,

            adresse: user.adresse,

            ville: user.ville,

            codePostal: user.codePostal,

            total: total,

            statut: "en attente"

        }, {

            transaction

        });


        // ========================================
        // CRÉER LES ARTICLES
        // ========================================

        for (const produit of produits) {

            const pneu = produit.pneu;

            const quantite = produit.quantite;


            // ========================================
            // CommandeItem
            // ========================================

            await CommandeItem.create({

                commandeId: commande.id,

                pneuId: pneu.id,

                quantite: quantite,

                prix: pneu.prix

            }, {

                transaction

            });


            // ========================================
            // DIMINUER LE STOCK
            // ========================================

            await pneu.update({

                stock:
                    Number(pneu.stock) -
                    quantite

            }, {

                transaction

            });

        }


        // ========================================
        // VALIDER
        // ========================================

        await transaction.commit();


        // ========================================
        // RÉPONSE
        // ========================================

        return res.status(201).json({

            success: true,

            message:
                "Commande créée avec succès.",

            commande: {

                id: commande.id,

                total: commande.total,

                statut: commande.statut

            }

        });


    } catch (error) {

        console.error(
            "Erreur création commande :",
            error
        );


        // ========================================
        // ANNULER LA TRANSACTION
        // ========================================

        try {

            await transaction.rollback();

        } catch (rollbackError) {

            console.error(
                "Erreur rollback :",
                rollbackError
            );

        }


        return res.status(500).json({

            success: false,

            message:
                "Impossible de créer la commande.",

            error:
                error.message

        });

    }

};



// ========================================
// RÉCUPÉRER UNE COMMANDE PAR ID
// ========================================

module.exports.getCommandeById = async (req, res) => {

    try {

        const { id } = req.params;

        const userId = req.userId;


        // ========================================
        // VÉRIFIER L'UTILISATEUR
        // ========================================

        const user = await User.findByPk(userId);

        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "Utilisateur introuvable."

            });

        }


        // ========================================
        // RÉCUPÉRER LA COMMANDE
        // ========================================

        const commande = await Commande.findOne({

            where: {

                id: id,

                userId: userId

            },


            include: [

                {

                    model: CommandeItem,

                    as: "items",


                    include: [

                        {

                            model: Pneu,

                            as: "pneu",


                            attributes: [

                                "id",

                                "modele",

                                "dimension",

                                "saison",

                                "prix",

                                "image"

                            ],


                            // ========================================
                            // MARQUE DU PNEU
                            // ========================================

                            include: [

                                {

                                    model: Marque,

                                    as: "marque",

                                    attributes: [

                                        "id",

                                        "nom"

                                    ]

                                }

                            ]

                        }

                    ]

                }

            ]

        });


        // ========================================
        // COMMANDE INTROUVABLE
        // ========================================

        if (!commande) {

            return res.status(404).json({

                success: false,

                message:
                    "Commande introuvable."

            });

        }


        // ========================================
        // RÉPONSE
        // ========================================

        return res.status(200).json({

            success: true,

            commande: commande

        });


    } catch (error) {

        console.error(
            "❌ Erreur récupération commande :",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Impossible de récupérer la commande.",

            error:
                error.message

        });

    }

};



// ========================================
// MES COMMANDES
// ========================================

module.exports.getMesCommandes = async (req, res) => {

    try {

        const userId = req.userId;


        console.log(
            "🔥 Récupération commandes utilisateur :",
            userId
        );


        const commandes = await Commande.findAll({

            where: {

                userId: userId

            },


            include: [

                {

                    model: CommandeItem,

                    as: "items",


                    include: [

                        {

                            model: Pneu,

                            as: "pneu",


                            attributes: [

                                "id",

                                "modele",

                                "dimension",

                                "saison",

                                "prix",

                                "image"

                            ],


                            // ========================================
                            // MARQUE
                            // ========================================

                            include: [

                                {

                                    model: Marque,

                                    as: "marque",

                                    attributes: [

                                        "id",

                                        "nom"

                                    ]

                                }

                            ]

                        }

                    ]

                }

            ],


            order: [

                ["createdAt", "DESC"]

            ]

        });


        console.log(
            "🔥 Nombre de commandes :",
            commandes.length
        );


        return res.status(200).json({

            success: true,

            count: commandes.length,

            commandes: commandes

        });


    } catch (error) {

        console.error(
            "❌ ERREUR MES COMMANDES :",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Impossible de récupérer vos commandes.",

            error:
                error.message

        });

    }

};