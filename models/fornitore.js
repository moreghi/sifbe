module.exports = (sequelize, Sequelize) => {
    const Fornitore = sequelize.define("fornitores", {
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
  ragsociale: {
    type: Sequelize.STRING,
    underscored: 0
  },
  indirizzo: {
    type: Sequelize.STRING,
    underscored: 0
  },
  cap: {
    type: Sequelize.STRING,
    underscored: 0
  },
 localita: {
    type: Sequelize.STRING,
    underscored: 0
  },
 stato: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  settore: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  telefono: {
    type: Sequelize.STRING,
    underscored: 0
  },
  email: {
    type: Sequelize.STRING,
    underscored: 0
  },
  importo: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
  },

  notefornitore: {
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

      return Fornitore;
  };

 
  