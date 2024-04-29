module.exports = (sequelize, Sequelize) => {
    const Prenotazioneprodwork = sequelize.define("prenotazioneprodworks", {
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
   idPrenotazione: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  idProdotto: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  qta: {
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

      return Prenotazioneprodwork;
  };