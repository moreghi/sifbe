module.exports = (sequelize, Sequelize) => {
    const Registerconfirmed = sequelize.define("register_confirmeds", {
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
      cognome: {
        type: Sequelize.STRING,
        underscored: 0
      },
      nome: {
        type: Sequelize.STRING,
        underscored: 0
      },
      email: {
        type: Sequelize.STRING,
        underscored: 0
      },
      username: {
        type: Sequelize.STRING,
        underscored: 0
      },
      password: {
        type: Sequelize.STRING,
        underscored: 0
      },
      token: {
        type: Sequelize.STRING,
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
     return Registerconfirmed;
  };



