module.exports = (sequelize, Sequelize) => {
    const Sanfra = sequelize.define("sanfras", {
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
      nomeassociazione: {
        type: Sequelize.STRING,
        underscored: 0
      },
      annoTesseramento: {
        type: Sequelize.NUMBER,
        underscored: 0
      },
      email: {
        type: Sequelize.STRING,
        underscored: 0
      },
      indirizzo: {
        type: Sequelize.STRING,
        underscored: 0
      },
      cellulare: {
        type: Sequelize.STRING,
        underscored: 0
      },
      codfisc: {
        type: Sequelize.STRING,
        underscored: 0
      },
      piva: {
        type: Sequelize.STRING,
        underscored: 0
      },
      iban: {
        type: Sequelize.STRING,
        underscored: 0
      },
      banca: {
        type: Sequelize.STRING,
        underscored: 0
      },
      ultimaTessera: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      costoTessera: {
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
     return Sanfra;
  };

 