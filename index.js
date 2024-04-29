
// per ambiente di sviluppo

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// porta per mysql
const ports = process.env.PORT || 3001;   // info relative all'ambiente di esecuzione

global.__basedir = __dirname;  // va aprendere la cartella corrente

// importo la connessione al db
const db = require('./db');
// ---------------------------------------------------  importo le rotte
const authRouter = require('./routers/api/auth');
const userRouter = require('./routers/user');
const userlevelRouter = require('./routers/userlevels');
const socioRouter = require('./routers/socio');
const tesseramentoRouter = require('./routers/tesseramento');
const sanfraRouter = require('./routers/sanfra');
const localitaRouter = require('./routers/t-locali');
const sociosearchRouter = require('./routers/sociosearch');
const adesioneconfirmRouter = require('./routers/adesioneConfirm');
const quotatesseraRouter = require('./routers/quotatessera');
const manifRouter = require('./routers/manifestaziones');
const messageRouter = require('./routers/messages');
const prenotazioneRouter = require('./routers/prenotazione');
const cassaRouter = require('./routers/cassa');
const cassamovRouter = require('./routers/cassamov');
const regconfRouter = require('./routers/registerConfirm');
const locandinaRouter = require('./routers/locandina');
const giornataRouter = require('./routers/giornata');
const cassawcRouter = require('./routers/cassawc');
const cassawc1Router = require('./routers/cassawc1');
const cassacRouter = require('./routers/cassac');
const prodottoRouter = require('./routers/prodotto');
const listinoRouter = require('./routers/listino');
const listinoprodRouter = require('./routers/listinoprod');
const listinoworkRouter = require('./routers/listinowork');
const listinoprodworkRouter = require('./routers/listinoprodwork');
const prenotazioneworkRouter = require('./routers/prenotazionework');
const prenotazioneprodRouter = require('./routers/prenotazioneprod');   // da cancellare
const prenotazioneprodworkRouter = require('./routers/prenotazioneprodwork');

const prenotazioneprodottoRouter = require('./routers/prenotazioneprodotto');
const volontarioRouter = require('./routers/volontario');
const personRouter = require('./routers/persona');
const cassasinteticaRouter = require('./routers/cassasintetica');
const commandaRouter = require('./routers/commandas');
const commandarigaRouter = require('./routers/commandarigas');
const commandawRouter = require('./routers/commandaws');
const commandawrigaRouter = require('./routers/commandawrigas');
const tagliaRouter = require('./routers/t_taglias');
const graphprodRouter = require('./routers/graphprods');
const graphprod1Router = require('./routers/graphprods1');

// ---------------------------------------------------  importo le rotte  -- tabelle correlate
const ruoloRouter = require('./routers/t-ruolos');
const ruolodayRouter = require('./routers/t-ruoloday');
const statouserRouter = require('./routers/t_stato_utentes');
const statomanifRouter = require('./routers/t_stato_manifestaziones')
const comunicatoRouter = require('./routers/comunicato')
const comunicatodettRouter = require('./routers/comunicatodett')
const comunicatofileRouter = require('./routers/comunicatofile')
const spesaRouter = require('./routers/spesa');
const forgotpwdRouter = require('./routers/forgotpwd');   // da buttare   (gestito in api)
const tipologiaRouter = require('./routers/t_tipologias');
// work
const elementoRouter = require('./routers/elementos')
// per upload images
const imageRouter = require('./routers/images');
const pdfRouter = require('./routers/pdfs');

// per il deploy su heroku o altro hosting   2022/04/06



 var corsOptions = {
  // per ambiente di produzione su AWS
/*
   origin: "https://sanfra.ghisellinimoreno.it",
   credentials: "true",
   methods: "GET, POST, PUT, DELETE, OPTIONS",
   headers: "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization,Origin,Options"
  */
  // per ambiente di sviluppo
   origin: "http://localhost:4200"
  }; 



const app = express();
// utilizzo i pacchetti
app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(express.json());

// -----------------------------------------   utilizzo il router

app.use('/api/auth', authRouter);
app.use('/users', userRouter);
app.use('/userlevel', userlevelRouter); 
app.use('/socio', socioRouter);
app.use('/tesseramento', tesseramentoRouter);
app.use('/sanfra',sanfraRouter);
app.use('/tlocalita', localitaRouter);
app.use('/sociosearch', sociosearchRouter);
app.use('/adesioneConfirm', adesioneconfirmRouter);
app.use('/quotatessera', quotatesseraRouter);
app.use('/manif', manifRouter);
app.use('/message', messageRouter);
app.use('/cassa', cassaRouter);
app.use('/cassamov', cassamovRouter);
app.use('/cassawc', cassawcRouter);
app.use('/cassawc1', cassawc1Router);
app.use('/cassac', cassacRouter);
app.use('/regconf', regconfRouter);
app.use('/locandina', locandinaRouter);
app.use('/comunicato', comunicatoRouter);
app.use('/comunicatodett', comunicatodettRouter);
app.use('/comunicatofile', comunicatofileRouter);
app.use('/giornates', giornataRouter);
app.use('/prodotto', prodottoRouter); 
app.use('/listino', listinoRouter); 
app.use('/listinoprod', listinoprodRouter); 
app.use('/listinowork', listinoworkRouter); 
app.use('/listinoprodwork', listinoprodworkRouter); 
app.use('/prenotazionework', prenotazioneworkRouter);
app.use('/prenotazioneprod', prenotazioneprodRouter);   //  da cancellare
app.use('/prenotazioneprodwork', prenotazioneprodworkRouter);
app.use('/prenotazioneprodotto', prenotazioneprodottoRouter);
app.use('/volontario', volontarioRouter);
app.use('/persona', personRouter);
app.use('/cassasintetica', cassasinteticaRouter);
app.use('/commanda', commandaRouter);
app.use('/commandariga', commandarigaRouter);
app.use('/commandaw', commandawRouter);
app.use('/commandawriga', commandawrigaRouter); 
app.use('/ttaglia', tagliaRouter);
app.use('/graphprod', graphprodRouter);
app.use('/graphprod1', graphprod1Router);

// tabelle correlate
app.use('/truolo', ruoloRouter);
app.use('/truoloday', ruolodayRouter);
app.use('/tstatoutente', statouserRouter);
app.use('/tstatomanifestazione', statomanifRouter);
app.use('/prenotazione', prenotazioneRouter);
app.use('/spesa', spesaRouter);
app.use('/forgotpasswords', forgotpwdRouter);
app.use('/ttipologia', tipologiaRouter);
// work
app.use('/elemento', elementoRouter);
// per upload images e pdf

app.use('/upload', imageRouter);
app.use('/uploadpdf', pdfRouter);
// ... Va inserito come ultima rotta 
app.use(function(req, res, next){
    //  res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //    res.status(404).send('La pagina non esiste amico!');
 
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
    console.log(`Server sta girando sulla porta ${ports} -- credenziali aws ses per invio email`);
  });
  
  console.log('index.js');
