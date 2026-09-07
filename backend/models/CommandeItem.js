const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const CommandeItem = sequelize.define(
    "CommandeItem",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        commandeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        pneuId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        quantite: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        prix: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        tableName: "commande_items",
        timestamps: true
    }
);

module.exports = CommandeItem;