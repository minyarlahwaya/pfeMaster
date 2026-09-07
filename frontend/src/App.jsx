import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Profile from "./pages/Profile";
import Pneus from "./pages/pneu";
import PneuDetails from "./pages/PneuDetails";
import Cart from "./pages/Cart/Cart";

import SearchResults from "./pages/SearchResults/SearchResult";
import SearchResultsMarque from "./pages/SearchResults/SearchResultsMarque";
import SearchResultsSaison from "./pages/SearchResults/SearchResultsSaison";
import SearchResultsImmatriculation from "./pages/SearchResults/SearchResultsImmatriculation";

import { CartProvider, useCart } from "./context/CartContext";

import Notification from "./components/Notification/Notification";
import CommandeDetails from "./pages/CommandeDetails/CommandeDetails";
import MesCommandes from "./components/Commandes/MesCommandes";
import CommandeDetailss from "./components/Commandes/CommandeDetailss";


// ========================================
// CONTENU DE L'APPLICATION
// ========================================

function AppContent() {

    const {
        notification,
        setNotification
    } = useCart();


    return (

        <BrowserRouter>

            <Navbar />


            {/* ==============================
                NOTIFICATION
            ============================== */}

            <Notification
                notification={notification}
                onClose={() => setNotification(null)}
            />


            {/* ==============================
                ROUTES
            ============================== */}

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/pneus"
                    element={<Pneus />}
                />

                <Route
                    path="/recherche-pneus"
                    element={<SearchResults />}
                />

                <Route
                    path="/pneu/:id"
                    element={<PneuDetails />}
                />

                <Route
                    path="/recherche-pneus-marque"
                    element={<SearchResultsMarque />}
                />

                <Route
                    path="/recherche-pneus-saison"
                    element={<SearchResultsSaison />}
                />

                <Route
                    path="/recherche/immatriculation"
                    element={<SearchResultsImmatriculation />}
                />

                <Route
                    path="/panier"
                    element={<Cart />}
                />
                  <Route
    path="/commande/:id"
    element={<CommandeDetails />}
/>

<Route
    path="/mes-commandes"
    element={<MesCommandes />}
/>
<Route
    path="/commande/:id"
    element={<CommandeDetailss />}
/>
            </Routes>

        </BrowserRouter>

    );

}


// ========================================
// APP PRINCIPALE
// ========================================

function App() {

    return (

        <CartProvider>

            <AppContent />

        </CartProvider>

    );

}


export default App;