module.exports = (sequelize, Sequelize) => {
    const Toperationcassa = sequelize.define("t_operation_cassas", {
      id:{
            // Sequelize module has INTEGER Data_Type.
          type:Sequelize.STRING(1),
          underscored: 0,
    
          // user_id can not be null.
          allowNull:false,
    
          // For uniquely identify user.
          primaryKey:true
      },
      d_operation_cassa: {
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
  
    return Toperationcassa;
  };
