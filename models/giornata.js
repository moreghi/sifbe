module.exports = (sequelize, Sequelize) => {
    const Giornata = sequelize.define("giornatas", {
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
      dtGiornata: {
        type: Sequelize.STRING,
        underscored: 0
      },
      dtGiornata1: {
        type: Sequelize.STRING,
        underscored: 0
      },
      idManifestazione: {
        type: Sequelize.INTEGER,
        underscored: 0
      },
      idlistino: {
        type: Sequelize.INTEGER,
        underscored: 0
      },


      stato: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      statoMagazzino: {
        type: Sequelize.INTEGER,
        underscored: 0
      }, 
      statoCassa: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      statoUtenti: {
        type: Sequelize.INTEGER,
        underscored: 0
      }, 
      tipocassa: {
        type: Sequelize.STRING,
        underscored: 0
      }, 
      operationCassa: {
        type: Sequelize.STRING,
        underscored: 0
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
      a100: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      a100Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      a050: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      a050Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      a020: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      a020Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      a010: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      a010Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      a005: {
        type: Sequelize.INTEGER,
        underscored: 0
      },  
      a005Valore: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
      acontante: {
        type: Sequelize.FLOAT(7, 2),
        underscored: 0
      },  
        // finali
     f100: {
            type: Sequelize.INTEGER,
            underscored: 0
          },  
     f100Valore: {
            type: Sequelize.FLOAT(7, 2),
            underscored: 0
          },  
     f050: {
            type: Sequelize.INTEGER,
            underscored: 0
          },  
     f050Valore: {
            type: Sequelize.FLOAT(7, 2),
            underscored: 0
          },  
     f020: {
            type: Sequelize.INTEGER,
            underscored: 0
          },  
     f020Valore: {
            type: Sequelize.FLOAT(7, 2),
            underscored: 0
          },  
     f010: {
            type: Sequelize.INTEGER,
            underscored: 0
          },  
     f010Valore: {
            type: Sequelize.FLOAT(7, 2),
            underscored: 0
          },  
     f005: {
            type: Sequelize.INTEGER,
            underscored: 0
          },  
     f005Valore: {
            type: Sequelize.FLOAT(7, 2),
            underscored: 0
          },  
     fcontante: {
            type: Sequelize.FLOAT(7, 2),
            underscored: 0
          },  
     cassaInizio: {
            type: Sequelize.FLOAT(7, 2),
            underscored: 0
          },  
     cassaAttuale: {
            type: Sequelize.FLOAT(7, 2),
            underscored: 0
          },  
     cassaFinale: {
            type: Sequelize.FLOAT(7, 2),
            underscored: 0
          },  
     numTavoli: {
            type: Sequelize.INTEGER,
            underscored: 0
          },     
     numUtenti: {
            type: Sequelize.INTEGER,
            underscored: 0
          },     
     numCommande: {
            type: Sequelize.INTEGER,
            underscored: 0
          },     
     impCommande: {
            type: Sequelize.FLOAT(7, 2),
            underscored: 0
          },        
     impCoperti: {
            type: Sequelize.FLOAT(7, 2),
            underscored: 0
          },                 
     note:  {
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

      return Giornata;
  };

  //


 
  
 
  
 
  
  
 
 