import axios from "axios";

const apiURL = "http://localhost:5001/commandes";

// ==============================
// CRÉER UNE COMMANDE
// ==============================

export const createCommande = (items) => {

    return axios.post(
        apiURL,
        {
            items
        },
        {
            withCredentials: true
        }
    );

};
export const getMesCommandes = () => {

    return axios.get(
        `${apiURL}/mes-commandes`,
        {
            withCredentials: true
        }
    );

};

export const getCommandeById = (id) => {

    return axios.get(
        `${apiURL}/${id}`,
        {
            withCredentials: true
        }
    );

};