let express = require('express');
let router = express.Router();

let userController = require('./controllers/userController');

// Liste des routes vers les controleurs
router.get("/", (request, response) => response.redirect('/home'));         // fait une redirection de la racine "/" vers la page des users "/user"

router.get("/home", userController.reservation);
router.get("/person", userController.reservation);
router.post("/new/destination", userController.newDestination);
router.post("/new/persons", userController.newPersons);
router.get("/validation", userController.validation);

module.exports = router;