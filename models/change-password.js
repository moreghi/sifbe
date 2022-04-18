module.exports = (sequelize, Sequelize) => {
    const ChangePass = sequelize.define("change_passwords", {
        email:{
            // Sequelize module has STRING Data_Type.
          type:Sequelize.STRING,
          underscored: 0,
          // user_id can not be null.
          allowNull:false,
         // For uniquely identify user.
          primaryKey:true
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
  
    return ChangePass;
  };

// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
//             module.exports = User


