module.exports = (sequelize, Sequelize) => {
    const Commandawriga = sequelize.define("commandawrigas", {
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
qta: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
descrizione_prodotto: {
    type: Sequelize.STRING,
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
disponibile_Day: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
prezzo_day: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
  },
scorta_minima: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
 photo: {
    type: Sequelize.STRING,
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

      return Commandawriga;
  };

 
 
 
 