
const express = require("express");
const router = express.Router();

const {
    envoyerReponseTelegram
} = require("../services/telegramService");

// Réception des messages Telegram
router.post("/webhook", async (req, res) => {
    try {
        const update = req.body;
        const message = update.message;

        if (!message || !message.text) {
            return res.status(200).json({
                success: true,
                message: "Aucun message texte à traiter."
            });
        }

        const chatId = message.chat.id;
        const texte = message.text;

        console.log("📩 Message reçu :", texte);

        // Réponse temporaire pour tester le bot
        await envoyerReponseTelegram(
            chatId,
            `Bonjour ! 👋 J'ai bien reçu ton message : ${texte}`
        );

        return res.status(200).json({
            success: true,
            message: "Message reçu et réponse envoyée sur Telegram."
        });

    } catch (error) {
        console.error("Erreur webhook Telegram :", error.message);

        return res.status(500).json({
            success: false,
            message: "Erreur lors du traitement du message."
        });
    }
});

module.exports = router;
