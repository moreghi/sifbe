module.exports = (sequelize, Sequelize) => {
    const Graphprod = sequelize.define("graphprods", {
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
      ntot: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      ndacuc: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      ndacons: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      nevasi: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      },{
        timestamps: false,
        underscored: 0,
        freezeTableName: true,
      });
     return Graphprod;
  };



 

 
  