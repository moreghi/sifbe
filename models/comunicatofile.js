module.exports = (sequelize, Sequelize) => {
    const Comunicatofile = sequelize.define("comunicatodfiles", {
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
      idComm: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      folder: {
        type: Sequelize.STRING,
        underscored: 0
      },
      namefile: {
        type: Sequelize.STRING,
        underscored: 0
      },
      estensione: {
        type: Sequelize.STRING,
        underscored: 0
      },
      tipo: {
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
     return Comunicatofile;
  };

