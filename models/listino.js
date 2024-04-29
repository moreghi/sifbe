module.exports = (sequelize, Sequelize) => {
const Listino = sequelize.define("listinos", {
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
    descrizione: {
        type: Sequelize.STRING,
        underscored: 0
      },
    stato: {
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
      timestamps: false,
      underscored: 0,
      freezeTableName: true,
    });
   return Listino;
};



