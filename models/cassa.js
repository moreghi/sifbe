module.exports = (sequelize, Sequelize) => {
    const Cassa = sequelize.define("cassas", {
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
 idGiornata: {
        type: Sequelize.INTEGER,
        underscored: 0
      },     
 idTaglia: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
qtaIn: {
    type: Sequelize.INTEGER,
    underscored: 0
 },  
 valoreIn: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
 },
 qtaAc: {
   type: Sequelize.INTEGER,
   underscored: 0
},  
valoreAc: {
   type: Sequelize.FLOAT(7, 2),
   underscored: 0
},
qtaFi: {
    type: Sequelize.INTEGER,
    underscored: 0
 },  
 valoreFi: {
    type: Sequelize.FLOAT(7, 2),
    underscored: 0
 },
 qtaSb: {
    type: Sequelize.INTEGER,
    underscored: 0
 },  
 valoreSb: {
    type: Sequelize.FLOAT(7, 2),
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

      return Cassa;
  };

 

 