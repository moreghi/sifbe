module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define("personas", {
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
  photo: {
    type: Sequelize.STRING,
    underscored: 0
  },
  titolo: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  idStato: {
     // fk in Tstatoutente
    type: Sequelize.INTEGER,
    allowNull:false,
    required:true,
    underscored: 0
  },
  email: {
    type: Sequelize.STRING,
    underscored: 0
  },
  userLevel: {
    // fk in ....
   type: Sequelize.INTEGER,
   allowNull:false,
   required:true,
   underscored: 0
 },
 idRuolo: {
    // fk in Truolo
    type: Sequelize.INTEGER,
    allowNull:false,
    required:true,
    underscored: 0
  },
  idRuolo_Day: {
     // fk in Truoloday
    type: Sequelize.INTEGER,
    allowNull:false,
    required:true,
    underscored: 0
  },
  inServizio: {
    type: Sequelize.STRING,
    underscored: 0
  },
  utilizzatoCommanda: {
    type: Sequelize.STRING,
    underscored: 0
  },
 noteutente: {
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

      return Persona;
  };

  
 
  
 
  
  
 
 