module.exports = (sequelize, Sequelize) => {
    const Tstatofornitore = sequelize.define("t_stato_fornitores", {
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
      d_stato_fornitore: {
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
  
    return Tstatofornitore;
  };
