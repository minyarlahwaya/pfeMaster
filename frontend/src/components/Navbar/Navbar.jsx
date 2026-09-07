import "./Navbar.css";
import SearchModal from "../Search/SearchModal";

import { useEffect, useState } from "react";

import {
    FaSearch,
    FaShoppingCart,
    FaUser,
    FaBars,
    FaTimes,
    FaBoxOpen,
    FaSignInAlt,
    FaUserPlus,
    FaSignOutAlt
} from "react-icons/fa";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    getProfile,
    logout
} from "../../services/apiuser";

import { useCart } from "../../context/CartContext";


function Navbar() {

    const navigate = useNavigate();

    // =========================
    // STATES
    // =========================

    const [searchOpen, setSearchOpen] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    const [accountOpen, setAccountOpen] = useState(false);

    const [user, setUser] = useState(null);

    const [loadingUser, setLoadingUser] = useState(true);


    // =========================
    // PANIER
    // =========================

    const { cartCount } = useCart();


    // =========================
    // VERIFIER UTILISATEUR
    // =========================

    const checkUser = async () => {

        try {

            const response = await getProfile();

            console.log(
                "👤 Utilisateur Navbar :",
                response.data
            );

            setUser(response.data.user);

        }

        catch (error) {

            console.log(
                "ℹ️ Aucun utilisateur connecté."
            );

            setUser(null);

        }

        finally {

            setLoadingUser(false);

        }

    };


    // =========================
    // CHARGEMENT NAVBAR
    // =========================

    useEffect(() => {

        // Vérifier au chargement
        checkUser();


        // Écouter les changements
        const handleAuthChanged = () => {

            console.log(
                "🔄 Authentification modifiée"
            );

            checkUser();

        };


        window.addEventListener(
            "authChanged",
            handleAuthChanged
        );


        // Nettoyage
        return () => {

            window.removeEventListener(
                "authChanged",
                handleAuthChanged
            );

        };

    }, []);


    // =========================
    // DECONNEXION
    // =========================

    const handleLogout = async () => {

        try {

            await logout();

            console.log(
                "✅ Déconnexion réussie"
            );


            // Supprimer utilisateur Navbar
            setUser(null);


            // Fermer menus
            setAccountOpen(false);

            setMenuOpen(false);


            // Informer les autres composants
            window.dispatchEvent(
                new Event("authChanged")
            );


            // Retour accueil
            navigate("/");

        }

        catch (error) {

            console.error(
                "❌ Erreur déconnexion :",
                error
            );

        }

    };


    // =========================
    // FERMER MENUS
    // =========================

    const closeMenus = () => {

        setAccountOpen(false);

        setMenuOpen(false);

    };


    // =========================
    // AFFICHAGE
    // =========================

    return (

        <>

            <nav className="navbar-landolsi">

                <div className="container navbar-container">


                    {/* =========================
                        LOGO
                    ========================= */}

                    <Link
                        to="/"
                        className="navbar-brand logo"
                        onClick={closeMenus}
                    >
                        LANDOLSI
                    </Link>


                    {/* =========================
                        MENU PRINCIPAL
                    ========================= */}

                    <div
                        className={`navbar-menu ${
                            menuOpen
                                ? "mobile-menu-open"
                                : ""
                        }`}
                    >

                        <ul className="navbar-nav">


                            {/* ACCUEIL */}

                            <li className="nav-item">

                                <Link
                                    to="/"
                                    className="nav-link"
                                    onClick={closeMenus}
                                >
                                    Accueil
                                </Link>

                            </li>


                            {/* PNEUS */}

                            <li className="nav-item">

                                <Link
                                    to="/pneus"
                                    className="nav-link"
                                    onClick={closeMenus}
                                >
                                    Pneus
                                </Link>

                            </li>


                            {/* MARQUES */}

                            <li className="nav-item">

                                <a
                                    href="#"
                                    className="nav-link"
                                    onClick={(e) => {

                                        e.preventDefault();

                                        closeMenus();

                                    }}
                                >
                                    Marques
                                </a>

                            </li>


                            {/* CONTACT */}

                            <li className="nav-item">

                                <a
                                    href="#"
                                    className="nav-link"
                                    onClick={(e) => {

                                        e.preventDefault();

                                        closeMenus();

                                    }}
                                >
                                    Contact
                                </a>

                            </li>


                        </ul>

                    </div>


                    {/* =========================
                        ICONES
                    ========================= */}

                    <div className="icons">


                        {/* =========================
                            RECHERCHE
                        ========================= */}

                        <button
                            type="button"
                            className="icon-button"
                            onClick={() =>
                                setSearchOpen(true)
                            }
                            aria-label="Rechercher"
                        >

                            <FaSearch />

                        </button>


                        {/* =========================
                            COMPTE
                        ========================= */}

                        <div className="account-wrapper">

                            <button
                                type="button"
                                className="icon-button account-button"
                                onClick={() =>
                                    setAccountOpen(
                                        !accountOpen
                                    )
                                }
                                aria-label="Mon compte"
                            >

                                <FaUser />

                            </button>


                            {/* =========================
                                MENU COMPTE
                            ========================= */}

                            {accountOpen && (

                                <div className="account-dropdown">


                                    {/* CHARGEMENT */}

                                    {loadingUser ? (

                                        <div className="account-loading">

                                            Chargement...

                                        </div>

                                    ) : user ? (

                                        <>

                                            {/* =========================
                                                UTILISATEUR CONNECTÉ
                                            ========================= */}

                                            <div className="account-header">

                                                <div className="account-avatar">

                                                    <FaUser />

                                                </div>


                                                <div>

                                                    <strong>

                                                        Bonjour{" "}

                                                        {user.prenom}

                                                    </strong>


                                                    <span>

                                                        {user.email}

                                                    </span>

                                                </div>

                                            </div>


                                            <div className="account-divider" />


                                            {/* PROFIL */}

                                            <Link
                                                to="/profile"
                                                className="account-link"
                                                onClick={closeMenus}
                                            >

                                                <FaUser />

                                                <span>
                                                    Mon profil
                                                </span>

                                            </Link>


                                            {/* COMMANDES */}

                                            <Link
                                                to="/mes-commandes"
                                                className="account-link"
                                                onClick={closeMenus}
                                            >

                                                <FaBoxOpen />

                                                <span>
                                                    Mes commandes
                                                </span>

                                            </Link>


                                            <div className="account-divider" />


                                            {/* DECONNEXION */}

                                            <button
                                                type="button"
                                                className="account-logout"
                                                onClick={handleLogout}
                                            >

                                                <FaSignOutAlt />

                                                <span>
                                                    Se déconnecter
                                                </span>

                                            </button>

                                        </>

                                    ) : (

                                        <>

                                            {/* =========================
                                                UTILISATEUR NON CONNECTÉ
                                            ========================= */}

                                            <div className="account-header">

                                                <div className="account-avatar">

                                                    <FaUser />

                                                </div>


                                                <div>

                                                    <strong>
                                                        Mon compte
                                                    </strong>

                                                    <span>
                                                        Connectez-vous
                                                        pour continuer
                                                    </span>

                                                </div>

                                            </div>


                                            <div className="account-divider" />


                                            {/* CONNEXION */}

                                            <Link
                                                to="/login"
                                                className="account-link"
                                                onClick={closeMenus}
                                            >

                                                <FaSignInAlt />

                                                <span>
                                                    Se connecter
                                                </span>

                                            </Link>


                                            {/* INSCRIPTION */}

                                            <Link
                                                to="/register"
                                                className="account-link"
                                                onClick={closeMenus}
                                            >

                                                <FaUserPlus />

                                                <span>
                                                    Créer un compte
                                                </span>

                                            </Link>

                                        </>

                                    )}

                                </div>

                            )}

                        </div>


                        {/* =========================
                            PANIER
                        ========================= */}

                        <Link
                            to="/panier"
                            className="icon-link cart-icon"
                            aria-label="Panier"
                        >

                            <FaShoppingCart />


                            {cartCount > 0 && (

                                <span className="cart-badge">

                                    {cartCount}

                                </span>

                            )}

                        </Link>


                        {/* =========================
                            MENU MOBILE
                        ========================= */}

                        <button
                            type="button"
                            className="mobile-menu-button"
                            onClick={() =>
                                setMenuOpen(!menuOpen)
                            }
                            aria-label="Menu"
                        >

                            {menuOpen ? (
                                <FaTimes />
                            ) : (
                                <FaBars />
                            )}

                        </button>


                    </div>

                </div>

            </nav>


            {/* =========================
                RECHERCHE
            ========================= */}

            {searchOpen && (

                <SearchModal
                    onClose={() =>
                        setSearchOpen(false)
                    }
                />

            )}

        </>

    );

}


export default Navbar;