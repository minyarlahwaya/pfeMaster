
import axios from "axios";

const apiURL = "http://localhost:5001/marques";

// Récupérer toutes les marques
export const getAllMarques = () => {
    return axios.get(apiURL);
};

// Rechercher les pneus d'une marque
export const searchPneusByMarque = (marqueId) => {
    return axios.get(`${apiURL}/search/${marqueId}/pneus`);
};

// Ajouter une marque avec son logo
export const addMarque = (formData) => {
    return axios.post(apiURL, formData);
};

// Modifier une marque avec son logo
export const updateMarque = (id, formData) => {
    return axios.put(`${apiURL}/${id}`, formData);
};

// Supprimer une marque
export const deleteMarque = (id) => {
    return axios.delete(`${apiURL}/${id}`);
};

// Récupérer une marque par son identifiant
export const getMarqueById = (id) => {
    return axios.get(`${apiURL}/${id}`);
};