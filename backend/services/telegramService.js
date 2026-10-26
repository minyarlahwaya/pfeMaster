
const axios = require("axios");

async function envoyerNotificationTelegram(message) {
    try {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            console.error("Configuration Telegram manquante dans .env");
            return;
        }

        await axios.post(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                chat_id: chatId,
                text: message
            }
        );

        console.log("✅ Notification Telegram envoyée.");

    } catch (error) {
        // Une erreur Telegram ne doit pas annuler la commande.
        console.error(
            "❌ Erreur notification Telegram :",
            error.response?.data || error.message
        );
    }
}

module.exports = { envoyerNotificationTelegram };
