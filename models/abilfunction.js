module.exports = (sequelize, Sequelize) => {
    const Abilfunction = sequelize.define("abilfunctions", {
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
      idmodulo: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      idlevel: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      enabledNull: {
        type: Sequelize.STRING,
        underscored: 0
      },
      enabledInqu: {
        type: Sequelize.STRING,
        underscored: 0
      },       
      enabledEdit: {
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
      //  campi da join tabella userlevels
      UserLevelName: {
        type: Sequelize.STRING,
        underscored: 0
      },
      //  campi da join tabella modulis
      modulo: {
        type: Sequelize.STRING,
        underscored: 0
      },
      route: {
        type: Sequelize.STRING,
        underscored: 0
      },
     },{
        timestamps: true,
        underscored: 0,
      });

      return Abilfunction;
  };

  
  
  