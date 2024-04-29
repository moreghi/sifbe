module.exports = (sequelize, Sequelize) => {
    const Cassamov = sequelize.define("cassamovs", {
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
      idCassa: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      idEvento: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      datamov: {
        type: Sequelize.STRING,
        underscored: 0
      },  
      causale: {
        type: Sequelize.STRING,
        underscored: 0
      },
      provenienza: {
        type: Sequelize.STRING,
        underscored: 0
      },
      idbiglietto: {
        type: Sequelize.INTEGER,
        underscored: 0
      },        
      importo: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },            
      stato: {
        type: Sequelize.INTEGER,
        underscored: 0
      }, 
      modpag: {
        type: Sequelize.INTEGER,
        underscored: 0
      },       
      cognome: {
        type: Sequelize.STRING,
        underscored: 0
      },
      nome: {
        type: Sequelize.STRING,
        underscored: 0
      },specifica: {
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
        timestamps: false,
        underscored: 0,
        freezeTableName: true,
      });
     return Cassamov;
  };




 


