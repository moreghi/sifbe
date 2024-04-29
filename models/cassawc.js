module.exports = (sequelize, Sequelize) => {
    const Cassawc = sequelize.define("cassawcs", {
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
 idCommanda: {
        type: Sequelize.INTEGER,
        underscored: 0
      },     
 idTaglia: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
qtaInc: {
    type: Sequelize.INTEGER,
    underscored: 0
 },  
 valoreInc: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
 },
 qtaRes: {
   type: Sequelize.INTEGER,
   underscored: 0
},  
valoreRes: {
   type: Sequelize.FLOAT(7, 2),
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

      return Cassawc;
  };

 

 