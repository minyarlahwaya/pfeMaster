const User = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const maxAge = 2 * 60


const createToken = (id) => {
    return jwt.sign( { id }, 'net pneus secret', { expiresIn: maxAge, }
    )
}






// =====================================
// Inscription d'un nouvel utilisateur
// =====================================
module.exports.signup = async (req, res) => {

    try {

        // Récupérer les données envoyées par le frontend
        const {
            nom,
            prenom,
            email,
            password,
            telephone,
            adresse,
            ville,
            codePostal,
            pays,
            typeClient,
            raisonSociale,
            activite,
            identifiantEntreprise,
            numeroTVA,
            secteur
        } = req.body;



        // Création de l'utilisateur
        // IMPORTANT :
        // Le password sera automatiquement haché
        // grâce au hook beforeCreate dans User.js
        const user = await User.create({

            nom,
            prenom,
            email,
            password,

            telephone,
            adresse,
            ville,
            codePostal,
            pays,

            typeClient,

            // Informations professionnelles
            raisonSociale,
            activite,
            identifiantEntreprise,
            numeroTVA,
            secteur

            // role n'est pas envoyé
            // par sécurité
            // Sequelize met automatiquement:
            // role = "client"

        });



        // Réponse envoyée au client
        return res.status(201).json({

            success: true,

            message: "Compte créé avec succès",

            user: {

                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                typeClient: user.typeClient

            }

        });



    } catch (error) {


        console.log(error);


        return res.status(500).json({

            success: false,

            message: "Erreur lors de la création du compte"

        });

    }

};
module.exports.login_post = async (req, res) => {

    try {

        // ==============================
        // 1. Récupérer les données
        // ==============================

        const { email, password } = req.body;


        // ==============================
        // 2. Vérifier les champs
        // ==============================

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "L'adresse e-mail et le mot de passe sont obligatoires."

            });

        }


        // ==============================
        // 3. Rechercher l'utilisateur
        // ==============================

        const user = await User.findOne({

            where: {
                email: email.trim().toLowerCase()
            }

        });


        // Debug : on affiche seulement l'email
        console.log(
            "Tentative de connexion :",
            email
        );


        // ==============================
        // 4. Vérifier l'e-mail
        // ==============================

        if (!user) {

            return res.status(400).json({

                success: false,

                message:
                    "Adresse e-mail incorrecte."

            });

        }


        // ==============================
        // 5. Vérifier si le compte est actif
        // ==============================

        if (!user.isActive) {

            return res.status(403).json({

                success: false,

                message:
                    "Votre compte est désactivé."

            });

        }


        // ==============================
        // 6. Vérifier le mot de passe
        // ==============================

        const auth = await bcrypt.compare(

            password,

            user.password

        );


        if (!auth) {

            return res.status(400).json({

                success: false,

                message:
                    "Mot de passe incorrect."

            });

        }


        // ==============================
        // 7. Créer le JWT
        // ==============================

        const token = createToken(user.id);


        // ==============================
        // 8. Envoyer le cookie
        // ==============================

        res.cookie(

            "jwt_token",

            token,

            {

                httpOnly: true,

                secure: false,

                sameSite: "lax",

                maxAge: maxAge * 1000

            }

        );


        // ==============================
        // 9. Connexion réussie
        // ==============================

        console.log(
            "Connexion réussie pour :",
            user.email
        );


        return res.status(200).json({

            success: true,

            message:
                "Connexion réussie",

            user: {

                id: user.id,

                nom: user.nom,

                prenom: user.prenom,

                email: user.email,

                telephone: user.telephone,

                role: user.role,

                typeClient: user.typeClient

            }

        });


    } catch (error) {

        console.error(
            "Erreur login :",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Une erreur est survenue lors de la connexion."

        });

    }

};


module.exports.logout = (req, res) => {

    // Supprimer le cookie JWT
    res.clearCookie("jwt_token");

    return res.status(200).json({
        success: true,
        message: "Déconnexion réussie"
    });

};

// =====================================
// Récupérer le profil de l'utilisateur connecté
// =====================================

module.exports.getProfile = async (req, res) => {

    try {

        // Récupérer l'utilisateur grâce à l'id du token JWT
        const user = await User.findByPk(req.userId, {

            attributes: [
                "id",
                "nom",
                "prenom",
                "email",
                "telephone",
                "adresse",
                "ville",
                "codePostal",
                "pays",
                "typeClient",
                "raisonSociale",
                "activite",
                "identifiantEntreprise",
                "numeroTVA",
                "secteur",
                "role"
            ]

        });



        // Si utilisateur non trouvé
        if (!user) {

            return res.status(404).json({

                message: "Utilisateur introuvable"

            });

        }



        // Retourner les informations
        res.status(200).json({

            success: true,

            user: user

        });



    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Erreur serveur"

        });

    }

};



// =====================================
// Modifier le profil de l'utilisateur connecté
// =====================================

module.exports.updateProfile = async (req, res) => {

    try {

        // ID récupéré depuis le JWT
        const userId = req.userId;

        // Données envoyées par le frontend
        const {
            nom,
            prenom,
            telephone,
            adresse,
            ville,
            codePostal,
            pays,
            raisonSociale,
            activite,
            identifiantEntreprise,
            numeroTVA,
            secteur
        } = req.body;


        // ==============================
        // Récupérer l'utilisateur
        // ==============================

        const user = await User.findByPk(userId);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "Utilisateur introuvable."

            });

        }


        // ==============================
        // Modifier les informations
        // ==============================

        user.nom = nom;
        user.prenom = prenom;
        user.telephone = telephone;
        user.adresse = adresse;
        user.ville = ville;
        user.codePostal = codePostal;
        user.pays = pays;


        // ==============================
        // Informations professionnelles
        // ==============================

        user.raisonSociale = raisonSociale;
        user.activite = activite;
        user.identifiantEntreprise = identifiantEntreprise;
        user.numeroTVA = numeroTVA;
        user.secteur = secteur;


        // ==============================
        // Sauvegarder
        // ==============================

        await user.save();


        // ==============================
        // Réponse
        // ==============================

        return res.status(200).json({

            success: true,

            message: "Profil modifié avec succès.",

            user: {

                id: user.id,

                nom: user.nom,

                prenom: user.prenom,

                email: user.email,

                telephone: user.telephone,

                adresse: user.adresse,

                ville: user.ville,

                codePostal: user.codePostal,

                pays: user.pays,

                typeClient: user.typeClient,

                raisonSociale: user.raisonSociale,

                activite: user.activite,

                identifiantEntreprise:
                    user.identifiantEntreprise,

                numeroTVA: user.numeroTVA,

                secteur: user.secteur,

                role: user.role

            }

        });


    } catch (error) {

        console.error(
            "Erreur modification profil :",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Impossible de modifier le profil."

        });

    }

};