# LANDOLSI TIRES — Plateforme web de vente de pneumatiques

Application web responsive réalisée dans le cadre du projet de fin d'études (PFE). Elle permet aux clients de consulter un catalogue de pneus, de rechercher des produits adaptés à leur véhicule, de gérer un panier et des commandes, puis de consulter les informations de facturation. Un espace d'administration permet de gérer les données commerciales. Le projet comprend également un chatbot et des notifications Telegram côté serveur.

> **Important — sécurité :** le fichier d'archive fourni contient un fichier `backend/.env` avec des valeurs de configuration sensibles. Ne publiez jamais ce fichier. Révoquez/renouvelez les mots de passe, clés API, jetons Telegram et identifiants qui auraient déjà été partagés dans un dépôt ou une archive. Le modèle `.env.example` ci-dessous ne contient que des noms de variables.

## Sommaire

- [1. Présentation](#1-présentation)
- [2. Fonctionnalités](#2-fonctionnalités)
- [3. Technologies](#3-technologies)
- [4. Architecture du dépôt](#4-architecture-du-dépôt)
- [5. Prérequis](#5-prérequis)
- [6. Récupérer le projet depuis une URL Git](#6-récupérer-le-projet-depuis-une-url-git)
- [7. Configurer PostgreSQL](#7-configurer-postgresql)
- [8. Configurer le backend](#8-configurer-le-backend)
- [9. Configurer le frontend](#9-configurer-le-frontend)
- [10. Démarrer l'application](#10-démarrer-lapplication)
- [11. URLs locales](#11-urls-locales)
- [12. Principaux modules et API](#12-principaux-modules-et-api)
- [13. Parcours utilisateur](#13-parcours-utilisateur)
- [14. Parcours administrateur](#14-parcours-administrateur)
- [15. Chatbot et Telegram](#15-chatbot-et-telegram)
- [16. Vérifications et tests](#16-vérifications-et-tests)
- [17. Problèmes fréquents](#17-problèmes-fréquents)
- [18. Préparer la livraison finale](#18-préparer-la-livraison-finale)
- [19. Limites et améliorations](#19-limites-et-améliorations)

## 1. Présentation

**LANDOLSI TIRES** est une application web de vente de pneumatiques, accessible depuis un navigateur sur ordinateur ou téléphone. Elle vise à faciliter la recherche de pneus, la préparation d'une commande et le suivi des opérations par l'administrateur.

Le modèle opérationnel retenu est le **retrait de la commande par le client chez LANDOLSI TIRES** : la plateforme ne prévoit pas de livraison à domicile. La facture est créée au moment où l'administrateur confirme la commande, selon la logique métier implémentée.

## 2. Fonctionnalités

### Espace client

- Inscription, connexion et gestion de session.
- Récupération de mot de passe par e-mail (si les paramètres SMTP sont configurés).
- Consultation du catalogue et des fiches détaillées des pneus.
- Recherche de pneus par critères disponibles dans l'interface : marque, dimension, saison et immatriculation/compatibilité véhicule.
- Consultation des promotions.
- Ajout de pneus au panier et ajustement des quantités.
- Création d'une commande et consultation de ses détails/statut.
- Consultation des factures associées aux commandes, selon les actions disponibles dans l'interface.
- Dépôt et consultation d'avis et de réclamations.
- Utilisation du chatbot d'assistance.

### Espace administrateur

- Tableau de bord d'administration.
- Gestion des pneus, de leurs images, de leur stock et de leurs informations.
- Gestion des marques.
- Gestion des promotions.
- Consultation et gestion des commandes et de leur statut.
- Gestion des utilisateurs.
- Gestion des réclamations et des avis selon les écrans disponibles.
- Génération/gestion des factures selon le cycle de confirmation des commandes.

Les accès aux opérations administrateur doivent être protégés par les contrôles d'authentification et de rôle côté serveur. Ne vous fiez pas uniquement au masquage des pages dans le frontend.

## 3. Technologies

| Partie | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Axios, Bootstrap, React Icons |
| Backend | Node.js, Express.js |
| Base de données | PostgreSQL |
| ORM | Sequelize |
| Authentification | Cookies, JWT et bcrypt (selon les modules du backend) |
| Images | Multer et répertoire public du backend |
| E-mail | Nodemailer, avec compte SMTP configuré dans l'environnement |
| Chatbot | Intégration Google Gemini via `@google/genai` |
| Notifications | Bot Telegram avec mécanisme de polling côté serveur |
| Factures | Contrôleur de facturation et génération PDF avec PDFKit (selon les routes prévues) |

## 4. Architecture du dépôt

```text
pfeMaster-master/
├── backend/
│   ├── app.js                  # Configuration Express, routes et démarrage
│   ├── db/db.js                # Connexion Sequelize/PostgreSQL
│   ├── models/                 # Modèles et associations Sequelize
│   ├── controllers/            # Logique métier des modules
│   ├── routes/                 # Endpoints HTTP
│   ├── middleware/             # Authentification, rôles, téléversement
│   ├── services/               # Services tels que le polling Telegram
│   ├── public/uploadPneu/      # Images de pneus téléversées
│   ├── package.json
│   └── .env                    # À créer localement; ne pas versionner
└── frontend/
    ├── src/
    │   ├── components/         # Composants et écrans, dont administration
    │   ├── context/            # Contexte du panier
    │   ├── pages/              # Pages principales
    │   └── services/           # Appels API depuis React
    ├── package.json
    └── vite.config.js
```

## 5. Prérequis

Installer et vérifier :

- **Node.js** compatible avec les versions déclarées dans les `package.json` (Node.js récent recommandé).
- **npm** (installé avec Node.js).
- **PostgreSQL** et un serveur de base de données accessible.
- **Git**, si le dépôt est récupéré depuis une URL Git.
- Un navigateur récent (Chrome, Edge ou Firefox).

Commandes de vérification :

```bash
node --version
npm --version
 git --version
```

Supprimez l'espace placé avant `git` si vous copiez la troisième commande dans un terminal qui ne l'accepte pas.

## 6. Récupérer le projet depuis une URL Git

Remplacez `<URL_DU_DEPOT>` par l'URL HTTPS ou SSH réelle du dépôt. Cette URL n'est pas incluse dans cette documentation.

```bash
git clone <URL_DU_DEPOT>
cd pfeMaster-master
```

Si le nom du dossier créé est différent, entrez dans ce dossier à la place. Si le projet est fourni en ZIP, décompressez-le puis ouvrez un terminal dans le dossier racine contenant `backend/` et `frontend/`.

Pour récupérer les changements d'une branche existante :

```bash
git status
git pull
```

Ne partagez pas votre URL si elle contient un jeton d'accès. Pour envoyer vos changements, créez une branche, validez les fichiers non sensibles et ouvrez une pull request ou fusionnez selon les règles du dépôt.

## 7. Configurer PostgreSQL

1. Démarrez PostgreSQL.
2. Créez une base dédiée au projet, par exemple `landolsi_tires`.
3. Créez un utilisateur PostgreSQL réservé à l'application et donnez-lui les droits nécessaires sur cette base.
4. Notez le nom de la base, l'utilisateur, le mot de passe, l'hôte et le port (souvent `localhost:5432`).
5. Renseignez ces valeurs dans `backend/.env`.

Le backend utilise Sequelize et appelle `sequelize.authenticate()` puis `sequelize.sync({ alter: true })` au démarrage. Cette synchronisation peut modifier le schéma. **Pour un environnement de production ou des données importantes, sauvegardez la base et privilégiez des migrations versionnées plutôt que `alter: true`.**

Les tables sont définies par les modèles présents dans `backend/models/` et leurs associations dans `backend/models/associations.js`. Selon la version et l'état de la base, il peut être nécessaire de créer un compte administrateur et de charger les données initiales séparément.

## 8. Configurer le backend

Ouvrez un terminal dans `backend/` :

```bash
cd backend
npm install
```

Créez un fichier `.env` dans ce dossier. Exemple de structure **sans valeurs réelles** :

```dotenv
# PostgreSQL
DB_NAME=nom_de_la_base
DB_USER=utilisateur_postgres
DB_PASSWORD=mot_de_passe_postgres
DB_HOST=localhost
DB_PORT=5432

# Recherche/compatibilité véhicule, si ce service est utilisé
VEHICULE_API_USERNAME=

# E-mail SMTP / récupération du mot de passe
EMAIL_USER=
EMAIL_PASS=
ADMIN_EMAIL=
ADMIN_PASSWORD=

# Services externes facultatifs selon les fonctionnalités activées
GEMINI_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Renseignez uniquement les variables réellement utilisées par le code et les services activés. Les valeurs ci-dessus sont des exemples, pas des identifiants. N'utilisez pas le mot de passe administrateur comme mot de passe de base de données.

Démarrez le serveur :

```bash
npm run dev
```

ou, sans rechargement automatique :

```bash
npm start
```

Le serveur écoute actuellement sur le port **5001**. La route de base `http://localhost:5001/` doit répondre `API fonctionne` si le serveur a démarré correctement. Les journaux du terminal aident à diagnostiquer les erreurs de connexion.

### Sécurité de configuration

- Vérifiez que `.env` est ignoré par Git dans **les deux dossiers** si nécessaire.
- Ne mettez jamais de clés API, de mots de passe, de jetons ou de données clients dans le README.
- Si un secret a été commité, l'ajouter au `.gitignore` ne suffit pas : révoquez-le et remplacez-le.
- N'utilisez pas les paramètres de développement en production.

## 9. Configurer le frontend

Ouvrez un **deuxième terminal** à la racine du projet, puis :

```bash
cd frontend
npm install
npm run dev
```

Vite affiche l'URL locale, normalement `http://localhost:5173/`. Le frontend utilise actuellement l'API `http://localhost:5001` et les requêtes avec cookies (`withCredentials: true`). Le backend autorise les origines `localhost:5173` et `127.0.0.1:5173`.

Pour éviter les problèmes de session/CORS, utilisez de préférence `http://localhost:5173` pour le frontend et `http://localhost:5001` pour l'API, conformément à la configuration actuelle. Si vous changez de port ou d'hôte, adaptez à la fois l'URL API, la configuration CORS et les paramètres des cookies.

Vérifiez que le frontend n'embarque aucun secret serveur. Une clé Gemini, un jeton Telegram ou un mot de passe SMTP doit rester dans le backend.

## 10. Démarrer l'application

L'application nécessite généralement **deux terminaux** ouverts en même temps :

**Terminal 1 — backend**

```bash
cd backend
npm run dev
```

Attendez les messages confirmant le démarrage du serveur et la connexion à PostgreSQL.

**Terminal 2 — frontend**

```bash
cd frontend
npm run dev
```

Ouvrez ensuite `http://localhost:5173/` dans le navigateur. Gardez les deux terminaux ouverts pendant les tests.

## 11. URLs locales

| Ressource | URL de développement |
|---|---|
| Application React | `http://localhost:5173/` |
| API backend | `http://localhost:5001/` |
| Route utilisateurs | `http://localhost:5001/users` |
| Pneus | `http://localhost:5001/pneus` |
| Marques | `http://localhost:5001/marques` |
| Véhicules | `http://localhost:5001/vehicules` |
| Compatibilités | `http://localhost:5001/compatibilites` |
| Commandes | `http://localhost:5001/commandes` |
| Promotions | `http://localhost:5001/promotions` |
| Administration API | `http://localhost:5001/admin` |
| Chatbot | `http://localhost:5001/chatbot` |
| Factures | `http://localhost:5001/factures` |
| Avis | `http://localhost:5001/avis` |
| Réclamations | `http://localhost:5001/reclamations` |
| Telegram | `http://localhost:5001/telegram` |

Ces URLs indiquent les **préfixes** des routeurs Express. Les chemins exacts, méthodes HTTP, paramètres et droits requis sont définis dans les fichiers de `backend/routes/`. Ouvrir un préfixe directement dans le navigateur ne garantit pas qu'une route GET existe à cet emplacement.

## 12. Principaux modules et API

Les préfixes de routes sont montés dans `backend/app.js` :

| Module | Préfixe | Rôle |
|---|---|---|
| Utilisateurs | `/users` | Inscription, connexion, profil et fonctions de compte |
| Pneus | `/pneus` | Catalogue, détails, recherche et gestion des pneus |
| Marques | `/marques` | Gestion des marques |
| Véhicules | `/vehicules` | Données des véhicules |
| Compatibilités | `/compatibilites` | Correspondance pneus/véhicules |
| Commandes | `/commandes` | Création, consultation et gestion du statut des commandes |
| Promotions | `/promotions` | Création et consultation des promotions |
| Administration | `/admin` | Fonctions dédiées à l'administration |
| Chatbot | `/chatbot` | Échanges avec l'assistant |
| Factures | `/factures` | Opérations liées aux factures |
| Avis | `/avis` | Avis des clients |
| Réclamations | `/reclamations` | Dépôt et gestion des réclamations |
| Telegram | `/telegram` | Fonctions liées à l'intégration Telegram |

Pour documenter chaque endpoint avec précision, consulter les fichiers correspondants dans `backend/routes/` et les contrôleurs dans `backend/controllers/`. Utilisez Postman ou Insomnia pour tester les requêtes protégées avec une session valide. Les routes protégées peuvent renvoyer `401` si l'utilisateur n'est pas connecté ou `403` si son rôle ne permet pas l'action.

## 13. Parcours utilisateur

1. Le visiteur ouvre le site et consulte le catalogue.
2. Il recherche un pneu selon les critères proposés et consulte la fiche du produit.
3. Il crée un compte ou se connecte si l'action le nécessite.
4. Il ajoute les produits au panier et vérifie les quantités/prix.
5. Il renseigne les informations demandées et confirme la création de commande.
6. Le backend valide la demande, calcule/enregistre les données de commande et les articles associés.
7. Le client consulte ses commandes et leur état depuis son espace.
8. Lorsque l'administrateur confirme la commande, le système crée la facture selon le fonctionnement implémenté.
9. Le client récupère les pneus directement chez LANDOLSI TIRES. Il n'y a pas de livraison à domicile dans le périmètre retenu.

Le statut précis d'une commande et les conditions de création/téléchargement d'une facture dépendent de la logique dans `CommandeController.js`, `FactureController.js` et des routes associées.

## 14. Parcours administrateur

1. Se connecter avec un compte disposant du rôle administrateur.
2. Ajouter ou modifier les marques et les pneus, y compris les images et les stocks.
3. Créer et gérer les promotions disponibles.
4. Consulter les commandes entrantes et leurs informations.
5. Mettre à jour le statut de la commande selon son traitement.
6. Vérifier la facture associée lorsqu'une commande est confirmée.
7. Gérer les comptes, avis et réclamations depuis les écrans d'administration disponibles.

Un compte administrateur doit être créé de manière contrôlée. Si le script `backend/createAdmin.js` est utilisé, lisez-le et configurez ses paramètres avant de l'exécuter; ne publiez pas ses identifiants et ne le relancez pas aveuglément sur une base de production.

## 15. Chatbot et Telegram

### Chatbot

Le backend contient un contrôleur et des routes de chatbot et utilise le paquet `@google/genai`. Pour activer le service, configurez une clé API valide dans `GEMINI_API_KEY`, puis testez la route et l'interface. Une erreur `503 UNAVAILABLE` peut indiquer une indisponibilité temporaire ou une saturation du service externe; elle ne signifie pas nécessairement que la clé a expiré. Prévoir une gestion des erreurs et un message de repli côté interface.

### Notifications Telegram

Le démarrage du serveur appelle `demarrerTelegramPolling()` depuis le service Telegram. Cela correspond à une logique de **polling** : le service interroge Telegram périodiquement pour récupérer les mises à jour, au lieu d'attendre un webhook entrant. Le fonctionnement nécessite les variables Telegram configurées et un accès réseau. Un déploiement cloud devra maintenir le processus backend en fonctionnement et vérifier les contraintes de polling, les journaux et les droits du bot.

Ne mettez jamais le jeton du bot dans React, dans le README ou dans Git. Si un webhook est adopté ultérieurement, il faudra disposer d'une URL HTTPS publique et configurer le webhook côté Telegram; ne mélangez pas simultanément les modes sans vérifier la configuration.

## 16. Vérifications et tests

### Vérification de base

- [ ] PostgreSQL est démarré et la base est accessible.
- [ ] Le fichier `backend/.env` est renseigné avec des valeurs locales valides.
- [ ] Le backend démarre sur le port `5001` sans erreur de connexion.
- [ ] `http://localhost:5001/` affiche `API fonctionne`.
- [ ] Le frontend démarre sur le port `5173`.
- [ ] Le catalogue s'affiche et les images de pneus sont accessibles.
- [ ] L'inscription et la connexion fonctionnent.
- [ ] Les routes protégées refusent l'accès non autorisé.
- [ ] Le panier et la création de commande fonctionnent.
- [ ] L'administrateur peut traiter une commande et le cycle de facture est vérifié.
- [ ] Les promotions et le calcul des prix sont testés.
- [ ] Les e-mails, le chatbot et Telegram sont testés séparément si ces intégrations sont activées.
- [ ] Les affichages sur téléphone et ordinateur sont vérifiés.

### Build frontend

Dans `frontend/` :

```bash
npm run build
```

Le build de production doit se terminer sans erreur. Pour vérifier le résultat localement :

```bash
npm run preview
```

Le script `npm run lint` est également disponible; traitez les erreurs pertinentes avant la livraison.

## 17. Problèmes fréquents

### `ECONNREFUSED` ou erreur Sequelize

Vérifiez que PostgreSQL est démarré, que le nom de base, l'utilisateur, le mot de passe, l'hôte et le port dans `.env` sont corrects, et que la base existe.

### `EADDRINUSE :::5001`

Un autre processus utilise déjà le port 5001. Arrêtez l'ancien serveur avec `Ctrl+C` dans son terminal ou identifiez le processus qui occupe le port avant de redémarrer.

### Erreur CORS ou session non conservée

Utilisez les hôtes prévus (`localhost`) et le port frontend `5173`. Vérifiez `credentials: true` côté Express et `withCredentials: true` côté Axios. Si les ports changent, adaptez la configuration des deux côtés.

### Réponse `401`

La session a peut-être expiré ou le cookie n'est pas envoyé. Reconnectez-vous et vérifiez les paramètres de cookies, CORS et l'URL utilisée.

### Images manquantes

Vérifiez que les fichiers sont présents dans `backend/public/uploadPneu/` et que les chemins stockés en base correspondent aux noms de fichiers. Les fichiers d'images locaux doivent être sauvegardés lors d'une migration.

### E-mail non envoyé

Vérifiez les identifiants SMTP, les paramètres de sécurité du fournisseur et les journaux du backend. N'inscrivez pas le mot de passe de messagerie dans le code source.

### Gemini indisponible

Vérifiez la variable de clé côté backend, les quotas et la disponibilité du service. Gérez les réponses d'erreur temporaires et évitez de renvoyer les secrets ou les détails internes au navigateur.

### Telegram ne reçoit pas les mises à jour

Vérifiez le jeton, l'identifiant de conversation, les droits du bot, l'accès réseau et les journaux du service de polling. Vérifiez également qu'un autre processus n'effectue pas déjà le polling avec le même bot.

## 18. Préparer la livraison finale

La livraison finale doit inclure le code source, les instructions d'installation, le rapport et les éléments nécessaires à la démonstration. Avant de remettre le projet :

1. **Nettoyer le dépôt** : exclure `node_modules/`, les fichiers `.env`, les journaux, les caches et les secrets.
2. **Préparer un `.env.example`** : conserver uniquement les noms des variables et des valeurs vides ou fictives.
3. **Vérifier les accès** : remplacer les secrets de développement, sécuriser le compte administrateur et tester les rôles.
4. **Préparer la base** : fournir un schéma/migrations et, si nécessaire, un jeu de données de démonstration non personnel. Ne pas livrer de données clients réelles.
5. **Sauvegarder les images** : décider comment les fichiers de `backend/public/uploadPneu/` seront transférés ou stockés en production.
6. **Tester les scénarios principaux** : inscription/connexion, recherche, panier, commande, confirmation, facture, promotion et administration.
7. **Tester le responsive** : vérifier les pages principales sur ordinateur et téléphone.
8. **Tester le build** : exécuter `npm run build` dans `frontend/` et corriger les erreurs bloquantes.
9. **Préparer le rapport PFE** : contexte, problématique, étude de l'existant, solution, besoins, conception UML, architecture, choix techniques, réalisation, tests, limites et perspectives.
10. **Préparer la soutenance** : démonstration courte d'un parcours client puis d'un parcours administrateur; prévoir une solution de secours si les services externes sont indisponibles.
11. **Documenter le déploiement** : URLs publiques, variables d'environnement configurées sur l'hébergeur, base de données, stockage des images, HTTPS, logs et sauvegardes.
12. **Vérifier le dépôt final** : le README doit correspondre aux fonctionnalités réellement présentes et les liens doivent être valides.

### Déploiement cloud — points à prévoir

Le projet est configuré par défaut pour le développement local. Pour le publier, il faudra notamment :

- héberger le frontend et le backend (ou utiliser une plateforme qui prend en charge les deux);
- configurer une base PostgreSQL distante, sauvegardée et protégée;
- remplacer les URLs `localhost` par l'URL publique du backend dans le frontend;
- adapter CORS et les cookies à vos domaines de production, avec HTTPS;
- définir les variables d'environnement dans le tableau de bord de l'hébergeur, pas dans Git;
- choisir un stockage persistant pour les images téléversées;
- vérifier que le processus de polling Telegram reste actif;
- appliquer des migrations contrôlées et tester le déploiement sur une base de test avant la production.

Aucune URL de production n'est indiquée ici, car elle dépend de l'hébergeur choisi et du déploiement réellement effectué.

## 19. Limites et améliorations

Pistes d'évolution possibles :

- mettre en place des migrations Sequelize versionnées;
- ajouter des tests automatisés backend et frontend;
- externaliser les images dans un stockage persistant adapté au cloud;
- centraliser les logs et ajouter une surveillance de disponibilité;
- améliorer les tests de sécurité, la validation des entrées et la limitation des tentatives de connexion;
- rendre les erreurs du chatbot et des notifications plus robustes en cas d'indisponibilité externe;
- documenter automatiquement tous les endpoints (par exemple avec OpenAPI/Swagger);
- ajouter une stratégie de sauvegarde et de restauration de PostgreSQL.

---

**Projet :** LANDOLSI TIRES — plateforme web de vente de pneumatiques  
**Cadre :** Projet de fin d'études (PFE)  
**Langue de documentation :** français
