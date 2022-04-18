// definizioni del database   --  nuova versiona dal 24/11/2021

const config = require("./config.json");
const mysql = require('mysql2');

//const db = {};

/*

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  DB_NAME,
  USERNAME, 
  PASSWORD,
  {
    host: HOSTNAME,
    dialect: 'mysql',
    logging: false,
    freezeTableName: true,
    operatorsAliases: false
  }
)

*/


// per effettuare deploy su Heroku
/*
const Sequelize = require('sequelize')
const Sequelize = require("sequelize");
// per deploy su heroku
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: 0,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});
*/


// originale  per sviluppo su localhost

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
  {
    host: config.host,
    dialect: config.dialect,
    operatorsAliases: 0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);




/*
if(process.env.CLEARDB_DATABASE_URL) {
  const sequelize = new Sequelize(
    process.env.CLEARDB_DATABASE_URL.config.database,
    process.env.CLEARDB_DATABASE_URL.config.user,
    process.env.CLEARDB_DATABASE_URL.config.password,
    {
    host: process.env.CLEARDB_DATABASE_URL.config.host,
    dialect: process.env.CLEARDB_DATABASE_URL.config.dialect,
    operatorsAliases: 0,
    pool: {
      max: process.env.CLEARDB_DATABASE_URL.config.pool.max,
      min: process.env.CLEARDB_DATABASE_URL.config.pool.min,
      acquire: process.env.CLEARDB_DATABASE_URL.config.pool.acquire,
      idle: process.env.CLEARDB_DATABASE_URL.config.pool.idle
    }
  });
} else {
  
  const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
  {
    host: config.host,
    dialect: config.dialect,
    operatorsAliases: 0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  });
  
}
*/








let db;

//    variante per connettere sia localhost che in produzione su heroku
if(process.env.CLEARDB_DATABASE_URL) {
  db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL)
} else {
    db = mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database:config.database,
      port:config.port
  });

}


// Originale per utilizzo in localhost
/*
 db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database:config.database,
    port:config.port
})
*/

// connettere Mysql
db.connect(err=> {
    if(err) {
        console.log(err,'errore in connessione Mysql');
    }else {
        console.log('Mysql connected con successo');
    }
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;


// model di tutte le tabelle utilizzate

db.user = require("./models/user.model.js")(sequelize, Sequelize);
db.regConf = require("./models/register_confirmed.js")(sequelize, Sequelize);
db.forgotPass = require("./models/forgot-password.js")(sequelize, Sequelize);
db.changePass = require("./models/change-password.js")(sequelize, Sequelize);
db.abilitazione = require("./models/abilitazione.js")(sequelize, Sequelize);
db.abilfunction = require("./models/abilfunction.js")(sequelize, Sequelize);
db.modulo = require("./models/modulo.js")(sequelize, Sequelize);
db.userlevel = require("./models/userlevel.js")(sequelize, Sequelize);
db.giornata = require("./models/giornata.js")(sequelize, Sequelize);
db.manifestazione = require("./models/manifestazione.js")(sequelize, Sequelize);
db.persona = require("./models/persona.js")(sequelize, Sequelize);
db.prodotto = require("./models/prodotto.js")(sequelize, Sequelize);
db.commanda = require("./models/commanda.js")(sequelize, Sequelize);
db.cassaw = require("./models/cassaw.js")(sequelize, Sequelize);
db.rigacommanda = require("./models/rigacommanda.js")(sequelize, Sequelize);
db.prenotazione = require("./models/prenotazione.js")(sequelize, Sequelize);
db.commandaw = require("./models/commandaw.js")(sequelize, Sequelize);
db.commandawriga = require("./models/commandawriga.js")(sequelize, Sequelize);
db.cassa = require("./models/cassa.js")(sequelize, Sequelize);
db.cassawc = require("./models/cassawc.js")(sequelize, Sequelize);
db.cassac = require("./models/cassac.js")(sequelize, Sequelize);
db.commandariga = require("./models/commandariga.js")(sequelize, Sequelize);
db.msgpopup = require("./models/msgpopup.js")(sequelize, Sequelize);
db.graphprod = require("./models/graphprod.js")(sequelize, Sequelize);
db.prenotazioneConfirmed = require("./models/prenotazioneConfirmed.js")(sequelize, Sequelize);
db.fornitore = require("./models/fornitore.js")(sequelize, Sequelize);
db.spesa = require("./models/spesa.js")(sequelize, Sequelize);





// tabelle correlate
db.truolo = require("./models/t-ruolo.js")(sequelize, Sequelize);
db.truoloday = require("./models/t-ruolo-day.js")(sequelize, Sequelize);
db.truoloweb = require("./models/t-ruolo-web.js")(sequelize, Sequelize);
db.tstatoutente = require("./models/t-stato-utente.js")(sequelize, Sequelize);

db.tstatoutenti = require("./models/t-stato-utenti.js")(sequelize, Sequelize);
db.tstatocassa = require("./models/t-stato-cassa.js")(sequelize, Sequelize);
db.tstatomagazzino = require("./models/t-stato-magazzino.js")(sequelize, Sequelize);
db.tstatogiornata = require("./models/t-stato-giornata.js")(sequelize, Sequelize);
db.operationcassa = require("./models/t-operation-cassa.js")(sequelize, Sequelize);

db.ttitolo = require("./models/t-titolo.js")(sequelize, Sequelize);
db.tstatopersona = require("./models/t-stato-persona.js")(sequelize, Sequelize);

db.tstatoprodotto = require("./models/t-stato-prodotto.js")(sequelize, Sequelize);
db.ttipologia = require("./models/t-tipologia.js")(sequelize, Sequelize);
db.tcategoriaprodotto = require("./models/t-categoria-prodotto.js")(sequelize, Sequelize);
db.tcompetenzaprodotto = require("./models/t-competenza-prodotto.js")(sequelize, Sequelize);

db.tstatomanifestazione = require("./models/t-stato-manifestazione.js")(sequelize, Sequelize);
db.ttipologia = require("./models/t-tipologia.js")(sequelize, Sequelize);

db.tstatorigacommanda = require("./models/t-stato-rigacommanda.js")(sequelize, Sequelize);
db.tstatolavorazione = require("./models/t-stato-lavorazione.js")(sequelize, Sequelize);
db.tstatoconsegna = require("./models/t-stato-consegna.js")(sequelize, Sequelize);

db.tstatoprenotazione = require("./models/t-stato-prenotazione.js")(sequelize, Sequelize);

db.tstatocommanda = require("./models/t-stato-commanda.js")(sequelize, Sequelize);
db.ttaglia = require("./models/t-taglia.js")(sequelize, Sequelize);
db.tstatoprodotto = require("./models/t-stato-prodotto.js")(sequelize, Sequelize);
db.tsettore = require("./models/t-settore.js")(sequelize, Sequelize);
db.tstatofornitore = require("./models/t-stato-fornitore.js")(sequelize, Sequelize);
db.tstatospesa = require("./models/t-stato-spesa.js")(sequelize, Sequelize);

//  ----------------------------------------------------------------------------- relazioni tra tabelle
// relazione tra Users e Truolo

//    sospese imn attesa di chiarimenti per il problema che genera 4 campi che non esisteono   2022/01/10

// db.truolo.hasMany(db.user,{ as: "users" });   originale                db.food.hasMany(db.meal, {as : 'Food', foreignKey : 'idFood'});
db.truolo.hasMany(db.user,{ as: "Truolo", foreignKey : 'id'});
db.user.belongsTo(db.truolo, {
  foreignKey: "idRuolo",
  attribute: ["d_ruolo"],
  as: "t_ruolos",
 
});
// relazione tra Users e Truoloday
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.truoloday.hasMany(db.user, { as: "Truoloday", foreignKey : 'id'}); 
db.user.belongsTo(db.truoloday, {
  foreignKey: "idRuolo_Day",
  attribute: ["d_ruolo_day"],
  as: "t_ruolo_days",          
 
});
// relazione tra Users e Truoloweb
// db.truoloweb.hasMany(db.user, { as: "users" });    // originale
db.truoloweb.hasMany(db.user, { as: "Truoloweb", foreignKey : 'id'});
db.user.belongsTo(db.truoloweb, {
  foreignKey: "idruoloweb",
  attribute: ["d_ruolo_web"],
  as: "t_ruolo_webs",

});
// relazione tra Users e Tstatoutente
// db.tstatoutente.hasMany(db.user, { as: "users" });     // originale
db.tstatoutente.hasMany(db.user, { as: "Tstatoutente", foreignKey : 'id' });
db.user.belongsTo(db.tstatoutente, {
  foreignKey: "idStato",
  attribute: ["d_stato_utente"],
  as: "t_stato_utentes",

});
//
// ----------------------------------------------  relazioni  Giornata
// relazione tra Giornata e Tstatogiornata
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.tstatogiornata.hasMany(db.giornata, { as: "Tstatogiornata", foreignKey : 'id'}); 
db.giornata.belongsTo(db.tstatogiornata, {
  foreignKey: "stato",
  attribute: ["d_stato_giornata"],
  as: "t_stato_giornatas",          
 
});
// relazione tra Giornata e Tstatomagazzino
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.tstatomagazzino.hasMany(db.giornata, { as: "Tstatomagazzino", foreignKey : 'id'}); 
db.giornata.belongsTo(db.tstatomagazzino, {
  foreignKey: "statoMagazzino",
  attribute: ["d_stato_magazzino"],
  as: "t_stato_magazzinos",          
 
});
// relazione tra Giornata e Tstatocassa
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.tstatocassa.hasMany(db.giornata, { as: "Tstatocassa", foreignKey : 'id'}); 
db.giornata.belongsTo(db.tstatocassa, {
  foreignKey: "statoCassa",
  attribute: ["d_stato_cassa"],
  as: "t_stato_cassas",          
 
});
// relazione tra Giornata e Tstatoutenti
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.tstatoutenti.hasMany(db.giornata, { as: "Tstatoutenti", foreignKey : 'id'}); 
db.giornata.belongsTo(db.tstatoutenti, {
  foreignKey: "statoUtenti",
  attribute: ["d_stato_utenti"],
  as: "t_stato_utentis",          
 
});

// ----------------------------------------------  relazioni  Manifestazione
// relazione tra Manifestazione e Tstatomanifestazione
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.tstatomanifestazione.hasMany(db.manifestazione, { as: "Tstatomanifestazione", foreignKey : 'idt'}); 
db.manifestazione.belongsTo(db.tstatomanifestazione, {
  foreignKey: "stato",
  attribute: ["d_stato_manifestazione"],
  as: "t_stato_manifestaziones",          
 
});

//
// ----------------------------------------------  relazioni  Persone
// relazione tra Persona e Ttitolo
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.ttitolo.hasMany(db.persona, { as: "Ttitolo", foreignKey : 'id'}); 
db.persona.belongsTo(db.ttitolo, {
  foreignKey: "titolo",
  attribute: ["d_titolo"],
  as: "t_titolos",          
 
});

// relazione tra Persona e Ttitolo
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.tstatopersona.hasMany(db.persona, { as: "Tstatopersona", foreignKey : 'id'}); 
db.persona.belongsTo(db.tstatopersona, {
  foreignKey: "idStato",
  attribute: ["d_stato_persona"],
  as: "t_stato_personas",          
 
});

// relazione tra Persona e Truolo
db.truolo.hasMany(db.persona,{ as: "Truolo1", foreignKey : 'id'});
db.persona.belongsTo(db.truolo, {
  foreignKey: "idRuolo",
  attribute: ["d_ruolo"],
  as: "t_ruolos",
 
});
// relazione tra Persona e Truoloday
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.truoloday.hasMany(db.persona, { as: "Truoloday1", foreignKey : 'id'}); 
db.persona.belongsTo(db.truoloday, {
  foreignKey: "idRuolo_Day",
  attribute: ["d_ruolo_day"],
  as: "t_ruolo_days",          
 
});

// relazione tra Persona e Userlevel
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.userlevel.hasMany(db.persona, { as: "Userlevel", foreignKey : 'id'}); 
db.persona.belongsTo(db.userlevel, {
  foreignKey: "userLevel",
  attribute: ["UserLevelName"],
  as: "userlevels",          
 
});
//
// ----------------------------------------------  relazioni  Fornitore  ( da fare)

// relazione tra Persona e Userlevel
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.tsettore.hasMany(db.fornitore, { as: "Tsettore", foreignKey : 'id'}); 
db.fornitore.belongsTo(db.tsettore, {
  foreignKey: "settore",
  attribute: ["d_settore"],
  as: "t_settores",          
 
});

db.tstatofornitore.hasMany(db.fornitore, { as: "Tstatofornitore", foreignKey : 'id'}); 
db.fornitore.belongsTo(db.tstatofornitore, {
  foreignKey: "stato",
  attribute: ["d_stato_fornitore"],
  as: "t_stato_fornitores",          
 
});


// ----------------------------------------------  relazioni  Prodotto   ( da fare)


// relazione tra Prodotto e Tstatoprodotto
db.tstatoprodotto.hasMany(db.prodotto, { as: "Tstatoprodotto", foreignKey : 'id'}); 
db.prodotto.belongsTo(db.tstatoprodotto, {
  foreignKey: "stato",
  attribute: ["d_stato_prodotto"],
  as: "t_stato_prodottos",          
 
});

// relazione tra Prodotto e Ttipologia
db.ttipologia.hasMany(db.prodotto, { as: "Ttipologia", foreignKey : 'id'}); 
db.prodotto.belongsTo(db.ttipologia, {
  foreignKey: "tipologia",
  attribute: ["d_tipologia"],
  as: "t_tipologias",          
 
});

// relazione tra Prodotto e Tcategoriaprodotto
db.tcategoriaprodotto.hasMany(db.prodotto, { as: "Tcategoriaprodotto", foreignKey : 'id'}); 
db.prodotto.belongsTo(db.tcategoriaprodotto, {
  foreignKey: "categoria",
  attribute: ["d_categoria"],
  as: "t_categoria_prodottos",          
 
});

// relazione tra Prodotto e Tcompetenzaprodotto
db.tcompetenzaprodotto.hasMany(db.prodotto, { as: "Tcompetenzaprodotto", foreignKey : 'id'}); 
db.prodotto.belongsTo(db.tcompetenzaprodotto, {
  foreignKey: "competenza",
  attribute: ["d_competenza"],
  as: "t_competenza_prodottos",          
 
});

//
// ----------------------------------------------  relazioni  Riga Commanda
// relazione tra Persona e Ttitolo
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.commanda.hasMany(db.rigacommanda, { as: "Commanda", foreignKey : 'id'}); 
db.rigacommanda.belongsTo(db.commanda, {
  foreignKey: "idCommanda",
  attribute: ["idGiornata"],
  as: "commandas",          
});

db.prodotto.hasMany(db.rigacommanda, { as: "Prodotto", foreignKey : 'id'}); 
db.rigacommanda.belongsTo(db.prodotto, {
  foreignKey: "idProdotto",
  attribute: ["descrizione_prodotto"],
  as: "prodottos",          
});

db.tstatorigacommanda.hasMany(db.rigacommanda, { as: "StatoRiga", foreignKey : 'id'}); 
db.rigacommanda.belongsTo(db.tstatorigacommanda, {
  foreignKey: "stato",
  attribute: ["	d_stato_riga_commanda"],
  as: "t_stato_rigacommandas",          
});

db.tstatolavorazione.hasMany(db.rigacommanda, { as: "StatoLavorazione", foreignKey : 'id'}); 
db.rigacommanda.belongsTo(db.tstatolavorazione, {
  foreignKey: "flag_lavorazione",
  attribute: ["	d_stato_lavorazione"],
  as: "t_stato_lavoraziones",          
});

db.tstatoconsegna.hasMany(db.rigacommanda, { as: "StatoConsegna", foreignKey : 'id'}); 
db.rigacommanda.belongsTo(db.tstatoconsegna, {
  foreignKey: "flag_consegna",
  attribute: ["	d_stato_consegna"],
  as: "t_stato_consegnas",          
});


// ----------------------------------------------  relazioni  Prenotazione
// relazione tra Manifestazione e Tstatomanifestazione
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.tstatoprenotazione.hasMany(db.prenotazione, { as: "Tstatoprenotazione", foreignKey : 'idt'}); 
db.prenotazione.belongsTo(db.tstatoprenotazione, {
  foreignKey: "idstato",
  attribute: ["d_stato_prenotazione"],
  as: "t_stato_prenotaziones",          
 
});

// ----------------------------------------------  relazioni  commandaw
// relazione tra Manifestazione e Tstatomanifestazione
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
db.tstatocommanda.hasMany(db.commandaw, { as: "Tstatocommanda1", foreignKey : 'idt'});
db.commandaw.belongsTo(db.tstatocommanda, {
  foreignKey: "stato",
  attribute: ["d_stato_commanda"],
  as: "t_stato_commandas",          
 
});

// relazione tra Giornata e Toperationcassa
// db.truoloday.hasMany(db.user, { as: "users" });  //  originale
/*   ------------------------------------------------------------------------------------  da errore su relazione
db.toperationcassa.hasMany(db.giornata, { as: "Toperationcassa", foreignKey : 'id'}); 
db.giornata.belongsTo(db.toperationcassa, {
  foreignKey: "operationCassa",
  attribute: ["d_operation_cassa"],
  as: "t_operation_cassas",          
 
});  */


/*
 
   
     
      

*/

/*    originaria
     fino al 23/11/2021 
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'moreno01',
    database:'sif',
    port:3306
})

// connettere Mysql

db.connect(err=> {
    if(err) {
        console.log(err,'errore in connessione Mysql');
    }else {
        console.log('Mysql connected con successo');
    }
})

*/













module.exports = db;





