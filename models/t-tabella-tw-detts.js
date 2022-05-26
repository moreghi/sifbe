module.exports = (sequelize, Sequelize) => {
    const Ttabellatwdetts = sequelize.define("tabella_tw_detts", {
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
      idtab: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      idtabella: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      descrizione: {
        type: Sequelize.STRING,
        underscored: 0
      },
      stato: {
        type: Sequelize.STRING,
        underscored: 0
      },
      tappo: {
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
  
    return Ttabellatwdetts;
  };
