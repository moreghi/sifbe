module.exports = (sequelize, Sequelize) => {
    const Ttabellatws = sequelize.define("tabella_tws", {
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
      idTab: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      nametab: {
        type: Sequelize.STRING,
        underscored: 0
      },
      numNew: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
     numUpd: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      numDlt: {
        type: Sequelize.INTEGER,
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
  
    return Ttabellatws;
  };
