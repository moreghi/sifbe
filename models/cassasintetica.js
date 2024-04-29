module.exports = (sequelize, Sequelize) => {
    const Cassasintetica = sequelize.define("cassasinteticas", {
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
      dataCassa: {
        type: Sequelize.STRING,
        underscored: 0
      },
      cassaIniziale: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },        
      cassaAttuale: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },
      cassaFinale: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },                
      differenza: {
        type: Sequelize.FLOAT(7, 2),
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
        timestamps: false,
        underscored: 0,
        freezeTableName: true,
      });
     return Cassasintetica;
  };

