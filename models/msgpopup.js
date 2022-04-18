module.exports = (sequelize, Sequelize) => {
    const Msgpopup = sequelize.define("msgpopups", {
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
      header: {
        type: Sequelize.STRING,
        underscored: 0
      },
      cls: {
        type: Sequelize.STRING,
        underscored: 0
      },
      txt01: {
        type: Sequelize.STRING,
        underscored: 0
      },
      txt02: {
        type: Sequelize.STRING,
        underscored: 0
      },
      txt03: {
        type: Sequelize.STRING,
        underscored: 0
      },
     },{
        timestamps: true,
        underscored: 0,
      });

      return Msgpopup;
  };

  