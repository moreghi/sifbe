const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const crtfunction = require('../controllers/CtrfunctionController');


// lettura funzione utente da rotta e profilo

router.get('/:level/:route', [authjwt.verifyToken], crtfunction.getfuncbyProfilo);
router.get('/:level/:route/:funcrotta', [authjwt.verifyToken], crtfunction.getfuncbyProfiloDetail);

module.exports = router;