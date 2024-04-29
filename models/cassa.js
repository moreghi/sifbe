module.exports = (sequelize, Sequelize) => {
    const Cassa = sequelize.define("cassas", {
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
      idEvento: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      datacassa: {
        type: Sequelize.STRING,
        underscored: 0
      },
      contanti: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },        
      pos: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },
      carteCredito: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },                
      bonifici: {
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
     return Cassa;
  };

