const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const registerconf = require('../controllers/RegisterConfirmedController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le prenotazioni
router.get('/'  , registerconf.getAll);   // ok

// lettura singolo utente
router.get('/:id', registerconf.getbyid);    // 

// lettura per token
router.get('/reg/token/:token'  , registerconf.getbytoken);

// creazione nuova richiesta registrazione
router.post('/create', registerconf.createNew);

// aggiornamento utente  
router.put('/updatebyid/:id' , registerconf.updateByid);

// cancellazione token  --
router.delete('/destroyToken/:token' , registerconf.destroyToken);

// cancellazione by id
router.delete('/deletebyid/:id' , registerconf.deletebyid);

router.post('/confirmedregister', registerconf.confirmedregister);

// invio email per conferma registrazione utente
router.post('/reg/getbyconfirmed/sendmail', registerconf.sendmailregconfirmed);    

// invio email per conferma registrazione utente
router.post('/sendmail', registerconf.sendmailregconfirmed);    


router.post('/reg/test', registerconf.testemail);    // test da cancellare



module.exports = router;

 