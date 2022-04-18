module.exports = (sequelize, Sequelize) => {
    const PrenotazioneConfirmed = sequelize.define("prenotazione_confirmeds", {
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
  telefono: {
    type: Sequelize.STRING,
    underscored: 0
  },
  email:{
    // Sequelize module has INTEGER Data_Type.
  type:Sequelize.STRING,
  underscored: 0,
  },
  password: {
    type: Sequelize.STRING,
    underscored: 0
  },
  idgiornata: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  datapren: {
    type: Sequelize.STRING,
    underscored: 0
  },
  persone: {
    type: Sequelize.INTEGER,
    underscored: 0
  },
  token: {
    type: Sequelize.STRING,
    underscored: 0
  },
  codpren: {
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

      return PrenotazioneConfirmed;
  };


 
 
 
 
 
 
 

 