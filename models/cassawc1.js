module.exports = (sequelize, Sequelize) => {
    const Cassawc1 = sequelize.define("cassawc1s", {
        idCommanda:{
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
      // valori iniziali
      i100: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      i100Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      i050: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      i050Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      i020: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      i020Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      i010: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      i010Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      i005: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      i005Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      icontante: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
     //  valori attuali
      r100: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      r100Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      r050: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      r050Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      r020: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      r020Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      r010: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      r010Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      r005: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      r005Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      rcontante: {
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

      return Cassawc1;
  };

  //










