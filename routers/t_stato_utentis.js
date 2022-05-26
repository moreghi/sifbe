// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatoUtenti = require('../controllers/TstatoutentisController');


// lettura tutti gli utenti
router.get('/', tstatoUtenti.getAll);
// lettura singolo utente
router.get('/:id', tstatoUtenti.getbyid);
// creazione nuovo utente
router.post('/create', tstatoUtenti.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatoUtenti.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatoUtenti.delete);




module.exports = router;