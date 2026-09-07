import axios from "axios";

const apiURL = "http://localhost:5001/marques";

// Récupérer toutes les marques
export const getAllMarques = () => {

    return axios.get(apiURL);
}

// Rechercher les pneus d'une marque
export const searchPneusByMarque = (marqueId) => {
    return axios.get(`${apiURL}/search/${marqueId}/pneus`);
};