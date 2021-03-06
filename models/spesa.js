
module.exports = (sequelize, Sequelize) => {
    const Spesa = sequelize.define("spesas", {
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
 idFornitore: {
        type: Sequelize.INTEGER,
        underscored: 0
  },
 stato: {
    type: Sequelize.INTEGER,
  },
  documento: {
    type: Sequelize.STRING,
    underscored: 0
  },
  importo: {
    type: Sequelize.DECIMAL(7, 2),
    underscored: 0
  },
  motivo: {
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

      return Spesa;
  };

  
 
  
 
  
  
 
 