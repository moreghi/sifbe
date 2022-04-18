module.exports = (sequelize, Sequelize) => {
    const RegConf = sequelize.define("register_confirmeds", {
        email:{
            // Sequelize module has STRING Data_Type.
          type:Sequelize.STRING,
          underscored: 0,
          // user_id can not be null.
          allowNull:false,
         // For uniquely identify user.
          primaryKey:true
      },
      id_titolo: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      username: {
        type: Sequelize.STRING,
        underscored: 0
      },
      cognome: {
        type: Sequelize.STRING,
        underscored: 0
      },
      nome: {
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
      });
  
    return RegConf;
  };

// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
//             module.exports = User

   