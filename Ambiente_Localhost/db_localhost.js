// definizioni del database   --  nuova versiona dal 24/11/2021   ----  su ambiente sviluppo  (bangia_test)
//
//  definizioni per utilizzo in localhost -- 15-02-2024
//


const config = require("./config.json");
const mysql = require('mysql2');

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

let db;

//    anbiente di sviluppo

 
if(process.env.CLEARDB_DATABASE_URL) {
  db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL)
} else {
    db = mysql.createConnection({    //  createConnection
      host: config.host,
      user: config.user,
      password: config.password,
      database:config.database,
      port:config.port
  });
}

// connettere Mysql   utilizzato con create connection

db.connect(err=> {
  if(err) {
      console.log(err,'errore in connessione Mysql');
  }else {
      console.log('Mysql connected con successo');
   }
})


/*
   hidran  2023/11/12
const pool = mysql.createPool({
    host: 'localhost',
    user: 'moreno',
    password: 'Moreno01@',
    database: 'bangia',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    idleTimeout: 5000 // Connessioni inattive vengono chiuse dopo 5 secondi
});


*/



// creo connessione a mysql con pool    ------   ambiente di sviluppo

/*
let pool;
pool = mysql.createPool({
  connectionLimit: 300,
  host: config.host,
  user: config.user,
  password: config.password,
  database:config.database,
  port:config.port
});

*/


db.Sequelize = Sequelize;
db.sequelize = sequelize;


// model di tutte le tabelle utilizzate

db.user = require("./models/user.js")(sequelize, Sequelize);
db.socio = require("./models/socio.js")(sequelize, Sequelize);
db.userlevel = require("./models/userlevel.js")(sequelize, Sequelize);
db.sanfra = require("./models/sanfra.js")(sequelize, Sequelize);
db.tesseramento = require("./models/tesseramento.js")(sequelize, Sequelize);
db.localita = require("./models/t_localita.js")(sequelize, Sequelize);
db.sociosearch = require("./models/sociosearchs.js")(sequelize, Sequelize);
db.quotatessra = require("./models/quotatessera.js")(sequelize, Sequelize);
db.manifestazione = require("./models/manifestazione.js")(sequelize, Sequelize);
db.message = require("./models/message.js")(sequelize, Sequelize);
db.cassa = require("./models/cassa.js")(sequelize, Sequelize);
db.cassamov = require("./models/cassamov.js")(sequelize, Sequelize);
db.regConf  = require("./models/registerConfirmed.js")(sequelize, Sequelize);
db.comunicato = require("./models/comunicato.js")(sequelize, Sequelize);
db.comunicatodett = require("./models/comunicatodett.js")(sequelize, Sequelize);
db.comunicatofile = require("./models/comunicatofile.js")(sequelize, Sequelize);
db.spesa = require("./models/spesa.js")(sequelize, Sequelize);
db.giornata = require("./models/giornata.js")(sequelize, Sequelize);

db.prodotto = require("./models/prodotto.js")(sequelize, Sequelize);
db.listino = require("./models/listino.js")(sequelize, Sequelize);
db.listinoprod = require("./models/listinoprod.js")(sequelize, Sequelize);
db.listinowork = require("./models/listinowork.js")(sequelize, Sequelize);
db.listinoprodwork = require("./models/listinoprodwork.js")(sequelize, Sequelize);
db.prenotazionework = require("./models/prenotazionework.js")(sequelize, Sequelize);
db.prenotazioneprod = require("./models/prenotazioneprod.js")(sequelize, Sequelize);  // da buttare
db.prenotazioneprodwork = require("./models/prenotazioneprodwork.js")(sequelize, Sequelize);
db.prenotazioneprodotto = require("./models/prenotazioneprodotto.js")(sequelize, Sequelize);
db.volontario = require("./models/volontario.js")(sequelize, Sequelize);
db.persona = require("./models/persona.js")(sequelize, Sequelize);

// work
db.elemento = require("./models/elemento.js")(sequelize, Sequelize);
// db.adesioneconfirmed = require("./models/adesioneconfirmed.js")(sequelize, Sequelize);

// tabelle correlate
db.truolo = require("./models/t-ruolo.js")(sequelize, Sequelize);
db.truoloday = require("./models/t-ruoloday.js")(sequelize, Sequelize);
db.tstatoutente = require("./models/t-stato-utente.js")(sequelize, Sequelize);
db.tstatomanifestazione = require("./models/t-stato-manifestazione.js")(sequelize, Sequelize);
//  ----------------------------------------------------------------------------- relazioni tra tabelle
// relazione tra Users e Truolo

// db.truolo.hasMany(db.user,{ as: "users" });   originale                db.food.hasMany(db.meal, {as : 'Food', foreignKey : 'idFood'});
db.truolo.hasMany(db.user,{ as: "Truolo", foreignKey : 'id'});
db.user.belongsTo(db.truolo, {
  foreignKey: "idRuolo",
  attribute: ["d_ruolo"],
  as: "t_ruolos",
});


// relazione tra Users e Tstatoutente
// db.tstatoutente.hasMany(db.user, { as: "users" });     // originale
db.tstatoutente.hasMany(db.user, { as: "Tstatoutente", foreignKey : 'id' });
db.user.belongsTo(db.tstatoutente, {
  foreignKey: "idStato",
  attribute: ["d_stato_utente"],
  as: "t_stato_utentes",
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






module.exports = db;