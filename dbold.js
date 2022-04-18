// definizioni del database   --  connessione tra localhost e Heroku

const config = require("./config.json");
const mysql = require('mysql2');


const Sequelize = require("sequelize");

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



module.exports = db;





