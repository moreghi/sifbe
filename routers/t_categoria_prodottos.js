// tabella t_categorias  -  categoria -- prodottos  
const express = require('express');
const router = express.Router();

const tcategoriaprodotto = require('../controllers/tcategoriaprodottoController');


// lettura tutte le tipologie
router.get('/', tcategoriaprodotto.getAll);
// lettura singola categoria
router.get('/:id', tcategoriaprodotto.getbyid);
// creazione nuova categoria
router.post('/create', tcategoriaprodotto.createNew);
// aggiornamento categoria
router.put('/updatebyid/:id', tcategoriaprodotto.updateByid);
// cancellazione categoria
router.delete('/deletebyid/:id', tcategoriaprodotto.delete);

// lettura ultimo id
router.get('/lastid', tcategoriaprodotto.getLastId);



module.exports = router;