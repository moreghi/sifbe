module.exports = (sequelize, Sequelize) => {
    const Prenotazione = sequelize.define("prenotaziones", {
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
      idstato: {
        // fk in Tstatoutente
       type: Sequelize.INTEGER,
       allowNull:false,
       required:true,
       underscored: 0
     },
     tipo: {
      type: Sequelize.STRING,
      underscored: 0
    },  
     idgiornata: {
      type: Sequelize.INTEGER,
      underscored: 0
    },
    datagiornata: {
      type: Sequelize.STRING,
      underscored: 0
    },
    cognome: {
      type: Sequelize.STRING,
      underscored: 0
    },
    nome: {
      type: Sequelize.STRING,
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
    persone: {
      type: Sequelize.INTEGER,
      underscored: 0
    },
    datapren: {
      type: Sequelize.STRING,
      underscored: 0
    },
    dataconf: {
      type: Sequelize.STRING,
      underscored: 0
    }, 
    token: {
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

      return Prenotazione;
  };

