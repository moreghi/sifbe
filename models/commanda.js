module.exports = (sequelize, Sequelize) => {
    const Commanda = sequelize.define("commandas", {
        id:{
            // Sequelize module has INTEGER Data_Type.
          type:Sequelize.INTEGER,
          underscored: 0,
    
          // To increment user_id automatically.
          autoIncrement:true,
    
          // user_id can not be null.
          allowNull:false,
    
          // For uniquely identify user.
          primaryKey:true
      },
 idSanfra: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
 idprenotazione: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
 idpersona: {
        type: Sequelize.INTEGER,
        underscored: 0
      },      
  anagrafica_cliente: {
    type: Sequelize.STRING,
    underscored: 0
  },
  idGiornata: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  dtCommanda: {
    type: Sequelize.DATE,
    underscored: 0
  },
  stato: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  semaphore: {
    type: Sequelize.STRING,
    underscored: 0
  },
  delay: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  statoContabile: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  statoCucina: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  statoBevande: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  buonoPasto: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
  },
  numTavolo: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  numPersone: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  cassaAttuale: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
  },
  numProdotti: {
    type: Sequelize.INTEGER,
    underscored: 0
  }, 
  importoProdotti: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
  },
  importoCoperto: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
  },
  importodaPagare: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
  },
  importoPagato: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
  },
  resto: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
  },
  numProdottiCucina: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  numProdottiBevande: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  noteCommanda: {
    type: Sequelize.STRING,
    underscored: 0
  },
  stampaEseguita: {
    type: Sequelize.STRING,
    underscored: 0
  },
 key_utenti_operation: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  created_at: {
    type: Sequelize.DATE,
    underscored: 0
  },
  updated_at: {
    type: Sequelize.DATE,
    underscored: 0
  },
  },{
        timestamps: true,
        underscored: 0,
      });

      return Commanda;
  };

 