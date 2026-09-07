var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');

require('dotenv').config();

const sequelize = require("./db/db");
var app = express();   


// Import des routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pneuRoutes = require("./routes/pneuRoutes");
var marqueRouter = require("./routes/marqueRoutes");
const vehiculeRouter = require("./routes/vehicule");
var compatibiliteRouter =require("./routes/compatibiliteRoutes");
const commandesRouter = require("./routes/commandes");

// Import du modèle pour que Sequelize le connaisse
//const Pneu = require("./models/PneuModel");
//const User = require("./models/UserModel");
//const Marque = require("./models/MarqueModel");
require("./models/associations");



app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/pneus", pneuRoutes);
app.use("/marques", marqueRouter);
app.use("/vehicules", vehiculeRouter);
app.use("/compatibilites",compatibiliteRouter);
app.use("/commandes", commandesRouter);



// Test API
app.get("/", (req, res) => {
    res.send("API fonctionne");
});


// Connexion Sequelize + création tables
sequelize
    .authenticate()
    .then(async () => {
        console.log("✅ Connexion Sequelize réussie !");

        await sequelize.sync();

        console.log("✅ Les tables ont été créées !");
    })
    .catch((err) => {
        console.error("❌ Erreur de connexion :", err);
    });


// Route inexistante (toujours à la fin)
app.use(function(req, res, next) {
    next(createError(404));
});


// Gestion des erreurs
app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        error: err
    });
});


// Création serveur
const server = http.createServer(app);

server.listen(5001, () => {
    console.log(" App is running on port 5001");
});