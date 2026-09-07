
import "./PneuDetail.css";

import { useState } from "react";
import { useCart } from "../../context/CartContext";

function PneuDetail({ pneu }) {

    const { addToCart } = useCart();


    // ==============================
    // QUANTITÉ
    // ==============================

    const [quantity, setQuantity] = useState(1);


    // ==============================
    // VÉRIFIER LE STOCK
    // ==============================

    const stockDisponible = Number(pneu.stock) > 0;


    // ==============================
    // AUGMENTER LA QUANTITÉ
    // ==============================

    const increaseQuantity = () => {

        setQuantity((ancienneQuantite) => {

            // Ne pas dépasser le stock
            if (ancienneQuantite >= Number(pneu.stock)) {
                return ancienneQuantite;
            }

            return ancienneQuantite + 1;

        });

    };


    // ==============================
    // DIMINUER LA QUANTITÉ
    // ==============================

    const decreaseQuantity = () => {

        setQuantity((ancienneQuantite) => {

            // Minimum = 1
            if (ancienneQuantite <= 1) {
                return 1;
            }

            return ancienneQuantite - 1;

        });

    };


    // ==============================
    // AJOUTER AU PANIER
    // ==============================

    const handleAddToCart = () => {

        console.log("BOUTON AJOUT PANIER CLIQUÉ");

        console.log("Pneu :", pneu);

        console.log("Stock :", pneu.stock);

        console.log("Quantité :", quantity);


        if (!stockDisponible) {

            console.log("Pneu en rupture de stock");

            return;

        }


        // Pour le moment on garde
        // exactement le fonctionnement
        // de PneuCard

        addToCart(pneu, quantity);


        console.log("Pneu ajouté au panier");

    };


    return (

        <main className="pneu-detail-page">

            <div className="pneu-detail-container">


                {/* ==============================
                    IMAGE
                ============================== */}

                <div className="pneu-detail-image-box">

                    <div className="pneu-image-wrapper">

                        <img
                            src={`http://localhost:5001/uploadPneu/${pneu.image}`}
                            alt={pneu.modele}
                        />

                    </div>

                </div>


                {/* ==============================
                    INFORMATIONS
                ============================== */}

                <div className="pneu-detail-info">


                    {/* ==============================
                        MARQUE
                    ============================== */}

                    <div className="brand-info">

                        <div className="brand-logo">

                            {pneu.marque?.logo && (

                                <img
                                    src={`http://localhost:5001/images/${pneu.marque.logo}`}
                                    alt={pneu.marque.nom}
                                />

                            )}

                        </div>


                        <div>

                            <span className="brand-label">
                                MARQUE
                            </span>

                            <h2>
                                {pneu.marque?.nom || "Marque inconnue"}
                            </h2>

                        </div>

                    </div>


                    {/* ==============================
                        MODELE
                    ============================== */}

                    <h1 className="pneu-title">

                        {pneu.modele}

                    </h1>


                    {/* ==============================
                        DIMENSION
                    ============================== */}

                    <div className="dimension">

                        <span>
                            Dimension
                        </span>

                        <strong>
                            {pneu.dimension}
                        </strong>

                    </div>


                    {/* ==============================
                        PRIX + STOCK
                    ============================== */}

                    <div className="price-stock">

                        <div>

                            <span className="price-label">
                                Prix
                            </span>

                            <span className="price">
                                {pneu.prix} DT
                            </span>

                        </div>


                        <div className="stock">

                            <span className="stock-dot"></span>

                            {stockDisponible
                                ? `En stock (${pneu.stock})`
                                : "Rupture de stock"
                            }

                        </div>

                    </div>


                    {/* ==============================
                        SEPARATION
                    ============================== */}

                    <div className="detail-separator"></div>


                    {/* ==============================
                        CARACTÉRISTIQUES
                    ============================== */}

                    <div className="specifications">

                        <h3>
                            Caractéristiques
                        </h3>


                        <div className="spec-grid">


                            <div className="spec-item">

                                <span>
                                    Largeur
                                </span>

                                <strong>
                                    {pneu.largeur || "-"} mm
                                </strong>

                            </div>


                            <div className="spec-item">

                                <span>
                                    Hauteur
                                </span>

                                <strong>
                                    {pneu.hauteur || "-"}
                                </strong>

                            </div>


                            <div className="spec-item">

                                <span>
                                    Diamètre
                                </span>

                                <strong>
                                    R{pneu.diametre || "-"}
                                </strong>

                            </div>


                            <div className="spec-item">

                                <span>
                                    Saison
                                </span>

                                <strong>
                                    {pneu.saison || "-"}
                                </strong>

                            </div>


                        </div>

                    </div>


                    {/* ==============================
                        DESCRIPTION
                    ============================== */}

                    <div className="description">

                        <h3>
                            Description
                        </h3>

                        <p>

                            {pneu.description ||
                                "Aucune description disponible."
                            }

                        </p>

                    </div>


                    {/* ==============================
                        ACTION PANIER
                    ============================== */}

                    <div className="detail-actions">


                        {/* ==============================
                            QUANTITÉ
                        ============================== */}

                        <div className="quantity">


                            {/* MOINS */}

                            <button
                                type="button"
                                onClick={decreaseQuantity}
                                disabled={
                                    !stockDisponible ||
                                    quantity <= 1
                                }
                            >
                                −
                            </button>


                            {/* VALEUR */}

                            <span>
                                {quantity}
                            </span>


                            {/* PLUS */}

                            <button
                                type="button"
                                onClick={increaseQuantity}
                                disabled={
                                    !stockDisponible ||
                                    quantity >= Number(pneu.stock)
                                }
                            >
                                +
                            </button>


                        </div>


                        {/* ==============================
                            AJOUTER AU PANIER
                        ============================== */}

                        <button
                            type="button"
                            className="add-cart-btn"
                            onClick={handleAddToCart}
                            disabled={!stockDisponible}
                        >   

                            {stockDisponible
                                ? "Ajouter au panier"
                                : "Rupture de stock"
                            }

                        </button>


                    </div>


                    {/* ==============================
                        INFORMATION STOCK
                    ============================== */}

                    {stockDisponible && (

                        <p className="quantity-info">

                            Maximum disponible : {pneu.stock} pneu
                            {Number(pneu.stock) > 1 ? "s" : ""}

                        </p>

                    )}


                </div>

            </div>

        </main>

    );
}

export default PneuDetail;
