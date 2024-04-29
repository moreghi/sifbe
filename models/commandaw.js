module.exports = (sequelize, Sequelize) => {
    const Commandaw = sequelize.define("commandaws", {
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
idGiornata: {
        type: Sequelize.INTEGER,
        underscored: 0
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
stato: {
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
dtCommanda: {
    type: Sequelize.DATE,
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
noteCommanda: {
    type: Sequelize.STRING,
    underscored: 0
  },
stampaEseguita: {
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

      return Commandaw;
  };

 
