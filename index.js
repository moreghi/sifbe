// importo i pacchetti necessari (express, body-paser, cors, ecc)
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// porta per mysql
const ports = process.env.PORT || 3000; 

global.__basedir = __dirname;

// importo la connessione al db
const db = require('./db');
// ---------------------------------------------------  importo le rotte
const userRouter = require('./routers/users');
const manifRouter = require('./routers/manifestaziones');
const userlevelRouter = require('./routers/userlevels');
const giornataRouter = require('./routers/giornates');
const personaRouter = require('./routers/personas');
const prodottoRouter = require('./routers/prodottos');
const commandaRouter = require('./routers/commandas');
const cassawRouter = require('./routers/cassaw');
const commandarigaRouter = require('./routers/commandarigas');
const prenotazioneRouter = require('./routers/prenotaziones');
const commandawRouter = require('./routers/commandaws');
const commandawrigaRouter = require('./routers/commandawrigas');
const cassaRouter = require('./routers/cassa');
const cassawcRouter = require('./routers/cassawc');
const cassacRouter = require('./routers/cassac');

const abilitazioneRouter = require('./routers/abilitaziones');
const abilfunctioneRouter = require('./routers/abilfunctiones');    
const moduloRouter = require('./routers/modules'); 
const msgpopupRouter = require('./routers/msgpopups');
const graphprodRouter = require('./routers/graphprods');
const graphprod1Router = require('./routers/graphprods1');
const prenotConfirmRouter = require('./routers/prenotazioneConfirmed');
const fornitoreRouter = require('./routers/fornitores');
const spesaRouter = require('./routers/spesas');
const messageRouter = require('./routers/messages');


// controllo funzione in base al modulo e al livello
const ctrfuncRouter = require('./routers/crtfunc'); 


const forgotRouter = require('./routers/forgotpasswords');
const forgottestRouter = require('./routers/forgottest');   // test
const changepasswordRouter = require('./routers/changepassword'); 
const authRouter = require('./routers/api/auth');

// tabelle correlate
const ruoloRouter = require('./routers/t_ruolos');
const ruolowebRouter = require('./routers/t_ruolo_webs');
const statouserRouter = require('./routers/t_stato_utentes');
const statomanifRouter = require('./routers/t_stato_manifestaziones');
const tipologiaRouter = require('./routers/t_tipologias');
const ruolodayRouter = require('./routers/t_ruolo_days');
const categoriaRouter = require('./routers/t_categoria_prodottos');
const tagliaRouter = require('./routers/t_taglias');
const statorigacommandaRouter = require('./routers/t_statorigacommandas');
const statoprodottoRouter = require('./routers/t_statoprodottos');
const competenzaprodottoRouter = require('./routers/t_competenza_prodottos');
const settoreRouter = require('./routers/t_settores');
const statofornitoreRouter = require('./routers/t_stato_fornitores');
const statospesaRouter = require('./routers/t_stato_spesas');
const titoloRouter = require('./routers/t_titolos');
const statopersonaRouter = require('./routers/t_stato_personas');
const tabellatRouter = require('./routers/tabellats');
const tabellatwdettRouter = require('./routers/tabellatwdetts');
const tabellatwRouter = require('./routers/tabellatws');
const statobevandeRouter = require('./routers/t_stato_bevandes');
const statocassaRouter = require('./routers/t_stato_cassas');
const statocommandaRouter = require('./routers/t_stato_commandas');
const statocontabileRouter = require('./routers/t_stato_contabiles');
const statocucinaRouter = require('./routers/t_stato_cucinas');
const statogiornataRouter = require('./routers/t_stato_giornatas');
const statolavorazioneRouter = require('./routers/t_stato_lavoraziones');
const statomagazzinoRouter = require('./routers/t_stato_magazzinos');
const statoconsegnaRouter = require('./routers/t_stato_consegnas');
const statoprenotazioneRouter = require('./routers/t_stato_prenotaziones');
const statoutentiRouter = require('./routers/t_stato_utentis');
const ttipocommandaRouter = require('./routers/t_tipo_commandas');

// per upload images
const imageRouter = require('./routers/images');


//   non servono      -------------------------------------------------------------------------------  importo i controller
// const contrUser = require('./controllers/UsersController');                   // users
// const contrTruolo = require('./controllers/TruolosControllers');              // Truolos



// per ambiente di sviluppo su localhost

 var corsOptions = {
    origin: "http://localhost:4200"             
 };



// per il deploy su heroku o altro hosting   2022/04/06
/*
 var corsOptions = {
  origin: "https://siffe.vercel.app"             
 };
*/

const app = express();
// utilizzo i pacchetti
app.use(cors(corsOptions));
// app.use(cors());                // originale
app.use(bodyparser.json());
app.use(express.json());
// -----------------------------------------   utilizzo il router
app.use('/users', userRouter);
app.use('/abilitazione', abilitazioneRouter);
app.use('/abilfunctione', abilfunctioneRouter);
app.use('/modulis', moduloRouter);
app.use('/manif', manifRouter);
app.use('/forgotpasswords', forgotRouter);
app.use('/forgottest', forgottestRouter);                      // ---------------  test
app.use('/changepassword', changepasswordRouter);
app.use('/userlevel', userlevelRouter); 
app.use('/ctrfunc', ctrfuncRouter); 
app.use('/giornates', giornataRouter); 
app.use('/personas', personaRouter); 
app.use('/prodotto', prodottoRouter); 
app.use('/commanda', commandaRouter); 
app.use('/cassaw', cassawRouter);
app.use('/commandariga', commandarigaRouter);
app.use('/prenotazione', prenotazioneRouter);
app.use('/commandaw', commandawRouter);
app.use('/commandawriga', commandawrigaRouter); 
app.use('/cassa', cassaRouter);
app.use('/cassawc', cassawcRouter);
app.use('/cassac', cassacRouter);
app.use('/msgpopup', msgpopupRouter);
app.use('/graphprod', graphprodRouter);
app.use('/graphprod1', graphprod1Router);
app.use('/prenotConfirm', prenotConfirmRouter);
app.use('/fornitore', fornitoreRouter);
app.use('/spesa', spesaRouter);
app.use('/message', messageRouter);




app.use('/api/auth', authRouter);
// tabelle correlate
app.use('/truolo', ruoloRouter);
app.use('/truoloweb', ruolowebRouter);
app.use('/tstatoutente', statouserRouter);
app.use('/tstatomanifestazione', statomanifRouter);
app.use('/ttipologia', tipologiaRouter);
app.use('/truoloday', ruolodayRouter);
app.use('/tcategprodotto', categoriaRouter);
app.use('/ttaglia', tagliaRouter);
app.use('/tstatorigacommanda', statorigacommandaRouter);
app.use('/statoprodotto', statoprodottoRouter);
app.use('/tcompetnzaprodotto', competenzaprodottoRouter);
app.use('/tsettore', settoreRouter);
app.use('/statofornitore', statofornitoreRouter);
app.use('/tstatospesa', statospesaRouter);
app.use('/ttitolo', titoloRouter);
app.use('/statopersona', statopersonaRouter);
app.use('/tabellat', tabellatRouter);
app.use('/tabellatwdett', tabellatwdettRouter);
app.use('/tabellatw', tabellatwRouter);
app.use('/statobevande', statobevandeRouter);
app.use('/tstatocassa', statocassaRouter);
app.use('/tstatocommanda', statocommandaRouter);
app.use('/tstatocontabile', statocontabileRouter);
app.use('/tstatocucina', statocucinaRouter);
app.use('/tstatogiornata', statogiornataRouter);
app.use('/tstatolavorazione', statolavorazioneRouter);
app.use('/tstatomagazzino', statomagazzinoRouter);
app.use('/tstatoconsegna', statoconsegnaRouter);
app.use('/statoprenotazione', statoprenotazioneRouter);
app.use('/tstatoutenti', statoutentiRouter);
app.use('/ttipocommanda', ttipocommandaRouter);

// per upload images

app.use('/upload', imageRouter);


















// ... Va inserito come ultima rotta 
app.use(function(req, res, next){
  //  res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   // res.send(404, 'La pagina non esiste amico!');
    next();
  });
// vecchia modalità
/*
app.listen(3000,() => {
    console.log('Server running');
});
*/

// nuova modalità
app.listen(ports,() => {
  console.log(`Server sta girando sulla porta ${ports}`);
});

console.log('index.js)');