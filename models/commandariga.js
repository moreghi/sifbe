module.exports = (sequelize, Sequelize) => {
    const Commandariga = sequelize.define("commandarigas", {
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
 idCommanda: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
 idProdotto: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
categoria: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
competenza: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
tipologia: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
descrizione_prodotto: {
        type: Sequelize.STRING,
        underscored: 0
      },
prezzo: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
  },
stato: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
qta_ord: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
ora_inizio: {
    type: Sequelize.DATE,
    underscored: 0
  },
ora_lavorazione: {
    type: Sequelize.STRING,
    underscored: 0
  },
delayLavorazione: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
flag_lavorazione: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
semaphoreLavorazione: {
    type: Sequelize.STRING,
    underscored: 0
  },
 ora_consegna: {
    type: Sequelize.STRING,
    underscored: 0
  },
  delayConsegna: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
flag_consegna: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
semaphoreConsegna: {
    type: Sequelize.STRING,
    underscored: 0
  },
note_riga: {
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

      return Commandariga;
  };

 
 
  
 
 
 