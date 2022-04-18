module.exports = (sequelize, Sequelize) => {
    const Prodotto = sequelize.define("prodottos", {
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
  descrizione: {
    type: Sequelize.STRING,
    underscored: 0
  },
  stato: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  tipologia: {
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
 disponibile: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  disponibile_Day: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  scorta_minima: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
 aMenu: {
    type: Sequelize.STRING,
    underscored: 0
  },
  prezzo: {
    type: Sequelize.DECIMAL(7, 2),
    underscored: 0
  },
  prezzo_day: {
    type: Sequelize.DECIMAL(7, 2),
    underscored: 0
  },
  qta_vendute: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  residuo: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  photo: {
    type: Sequelize.STRING,
    underscored: 0
  },
  selectedDay: {
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

      return Prodotto;
  };
 
 