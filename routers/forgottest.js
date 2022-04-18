const express = require('express');
const router = express.Router();

const forgott = require('../controllers/ForgotTestController');

console.log('firgettest---  Router ' + forgott);

/*
// lettura tutte richiesta
router.get('/', forgott.getAll);
// lettura singola richiesta
router.get('/:email', forgott.getbyemail);
// creazione nuova richiesta
router.post('/create', forgott.create);
// aggiornamento richiesta
router.put('/updatebyemail/:email', forgott.update);
// cancellazione richiesta
router.delete('/deletebyemail/:email', forgott.delete);

// creazione nuova richiesta
router.post('/forgotpwd', forgott.forgotpwd);
// rispristino password iniziale   // non funziona -- togliere
router.post('/confresetuserpwd', forgott.resetpwduser);


*/

router.post('/resetpassword', forgott.resetpassword);


module.exports = router;


