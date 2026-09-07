import "./CommandeDetails.css";

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    FaCheckCircle,
    FaMapMarkerAlt,
    FaPhone,
    FaBoxOpen,
    FaArrowLeft,
    FaShoppingBag
} from "react-icons/fa";

import { getCommandeById } from "../../services/commandeApi";


function CommandeDetails() {

    const { id } = useParams();

    const [commande, setCommande] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ========================================
    // RÉCUPÉRER LA COMMANDE
    // ========================================

    useEffect(() => {

        const fetchCommande = async () => {

            try {

                const response =
                    await getCommandeById(id);

                if (response.data.success) {

                    setCommande(
                        response.data.commande
                    );

                }

            } catch (error) {

                console.error(
                    "Erreur récupération commande :",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Impossible de récupérer la commande."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchCommande();

    }, [id]);


    // ========================================
    // CHARGEMENT
    // ========================================

    if (loading) {

        return (

            <div className="commande-page">

                <div className="commande-loading">

                    <div className="commande-loader"></div>

                    <p>
                        Chargement de votre commande...
                    </p>

                </div>

            </div>

        );

    }


    // ========================================
    // ERREUR
    // ========================================

    if (error || !commande) {

        return (

            <div className="commande-page">

                <div className="commande-error">

                    <h2>
                        Commande introuvable
                    </h2>

                    <p>
                        {error}
                    </p>

                    <Link
                        to="/pneus"
                        className="commande-back-btn"
                    >
                        <FaArrowLeft />
                        Retour aux pneus
                    </Link>

                </div>

            </div>

        );

    }


    return (

        <div className="commande-page">

            <div className="commande-container">


                {/* ========================================
                    BREADCRUMB
                ======================================== */}

                <div className="commande-breadcrumb">

                    <Link to="/">
                        Accueil
                    </Link>

                    <span> / </span>

                    <Link to="/panier">
                        Panier
                    </Link>

                    <span> / </span>

                    <strong>
                        Commande #{commande.id}
                    </strong>

                </div>


                {/* ========================================
                    HEADER SUCCÈS
                ======================================== */}

                <div className="commande-success-card">

                    <div className="commande-success-icon">

                        <FaCheckCircle />

                    </div>


                    <div className="commande-success-text">

                        <h1>
                            Commande confirmée
                        </h1>

                        <p>
                            Merci pour votre commande,
                            <strong>
                                {" "}
                                {commande.prenom}
                            </strong>.
                        </p>

                        <span>
                            Votre commande a bien été enregistrée.
                        </span>

                    </div>


                    <div className="commande-number">

                        <span>
                            N° commande
                        </span>

                        <strong>
                            #{commande.id}
                        </strong>

                    </div>

                </div>


                {/* ========================================
                    STATUT
                ======================================== */}

                <div className="commande-status-card">

                    <div>

                        <span className="status-label">
                            Statut de la commande
                        </span>

                        <strong className="status-value">
                            {commande.statut}
                        </strong>

                    </div>


                    <div className="status-step">

                        <div className="status-circle active">
                            ✓
                        </div>

                        <span>
                            Commande reçue
                        </span>

                    </div>


                    <div className="status-line"></div>


                    <div className="status-step">

                        <div className="status-circle">
                            2
                        </div>

                        <span>
                            Préparation
                        </span>

                    </div>


                    <div className="status-line"></div>


                    <div className="status-step">

                        <div className="status-circle">
                            3
                        </div>

                        <span>
                            Livraison
                        </span>

                    </div>

                </div>


                {/* ========================================
                    CONTENU PRINCIPAL
                ======================================== */}

                <div className="commande-grid">


                    {/* ========================================
                        COLONNE GAUCHE
                    ======================================== */}

                    <div className="commande-main">


                        {/* ARTICLES */}

                        <div className="commande-card">

                            <div className="commande-card-header">

                                <div>

                                    <FaShoppingBag />

                                    <h2>
                                        Articles commandés
                                    </h2>

                                </div>

                                <span>
                                    {commande.items.length} article
                                    {commande.items.length > 1 ? "s" : ""}
                                </span>

                            </div>


                            <div className="commande-items">

                                {commande.items.map((item) => (

                                    <div
                                        className="commande-item"
                                        key={item.id}
                                    >


                                        {/* IMAGE */}

                                        <div className="commande-item-image">

                                            <img
                                                src={`http://localhost:5001/uploadPneu/${item.pneu.image}`}
                                                alt={item.pneu.modele}
                                            />

                                        </div>


                                        {/* INFOS */}

                                        <div className="commande-item-info">

                                            <h3>
                                                {item.pneu.modele}
                                            </h3>

                                            <p>
                                                {item.pneu.dimension}
                                            </p>

                                            <span>
                                                Saison :{" "}
                                                {item.pneu.saison}
                                            </span>

                                            <span>
                                                Quantité :{" "}
                                                {item.quantite}
                                            </span>

                                        </div>


                                        {/* PRIX */}

                                        <div className="commande-item-price">

                                            <span>
                                                {Number(item.prix).toFixed(2)} DT / unité
                                            </span>

                                            <strong>
                                                {(
                                                    Number(item.prix) *
                                                    Number(item.quantite)
                                                ).toFixed(2)} DT
                                            </strong>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* INFORMATIONS CLIENT */}

                        <div className="commande-card">

                            <div className="commande-card-header">

                                <div>

                                    <FaMapMarkerAlt />

                                    <h2>
                                        Adresse de livraison
                                    </h2>

                                </div>

                            </div>


                            <div className="livraison-content">

                                <div className="livraison-icon">

                                    <FaMapMarkerAlt />

                                </div>


                                <div>

                                    <strong>
                                        {commande.prenom}{" "}
                                        {commande.nom}
                                    </strong>

                                    <p>
                                        {commande.adresse}
                                    </p>

                                    <p>
                                        {commande.codePostal}{" "}
                                        {commande.ville}
                                    </p>

                                    <p className="telephone">

                                        <FaPhone />

                                        {commande.telephone}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ========================================
                        COLONNE DROITE
                    ======================================== */}

                    <aside className="commande-sidebar">


                        {/* RÉSUMÉ */}

                        <div className="commande-summary-card">

                            <div className="summary-header">

                                <FaBoxOpen />

                                <h2>
                                    Résumé
                                </h2>

                            </div>


                            <div className="summary-line">

                                <span>
                                    Sous-total
                                </span>

                                <strong>
                                    {Number(commande.total).toFixed(2)} DT
                                </strong>

                            </div>


                            <div className="summary-line">

                                <span>
                                    Livraison
                                </span>

                                <span className="summary-gray">
                                    À déterminer
                                </span>

                            </div>


                            <div className="summary-separator"></div>


                            <div className="summary-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    {Number(commande.total).toFixed(2)} DT
                                </strong>

                            </div>


                            <div className="summary-payment">

                                Paiement à la livraison

                            </div>

                        </div>


                        {/* ACTIONS */}

                        <Link
                            to="/pneus"
                            className="commande-shopping-btn"
                        >

                            <FaShoppingBag />

                            Continuer mes achats

                        </Link>


                        <Link
                            to="/"
                            className="commande-home-btn"
                        >

                            Retour à l'accueil

                        </Link>

                    </aside>

                </div>

            </div>

        </div>

    );

}

export default CommandeDetails;