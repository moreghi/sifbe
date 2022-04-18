const express = require('express');
const router = express.Router();

const change = require('../controllers/ChangePasswordController');




// lettura tutte richiesta
router.get('/', change.getAll);
// lettura singola richiesta
router.get('/:email', change.getbyemail);
// creazione nuova richiesta
router.post('/create', change.create);
// aggiornamento richiesta
router.put('/updatebyemail/:email', change.update);
// cancellazione richiesta
router.delete('/deletebyemail/:email', change.delete);

// creazione nuova richiesta
router.post('/changepwd', change.changepwd);

/*    da verificare
// rispristino password iniziale   // non funziona -- togliere
router.post('/confresetuserpwd', change.resetpwduser);

router.post('/resetpassword', change.resetpassword)
*/



module.exports = router;