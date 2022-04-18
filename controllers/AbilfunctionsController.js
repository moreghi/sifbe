// creo i metodi per la gestione dell'utente

/*
esempio di come creare strsql parametrica          https://dirask.com/posts/Node-js-MySQL-Inner-Join-jPErd1

connection.connect(error => {
    if (error) throw error;
    const query = `SELECT * 
                   FROM ??
                   JOIN ?? ON ??.?? = ??.??`;
    const values = [
        'users',                 // SELECT *
        'departments',           // FROM `users`
        'departments',           // JOIN `departments` 
        'id',                    // ON departments.id = users.department_id
        'users',
        'department_id',
    ];

    connection.query(query, values, (error, result) => {  // sends queries
        connection.end();                                 // closes connection
        if (error) throw error;
        console.log(result);
    });
});


*/

const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


exports.getAlls = (req,res)=> {
 
   
    //let strsql = 'select * from abilfunctions JOIN `userlevels` ON `userlevels`.`id` = `abilfunctions`.`idlevel`';

    const strsql = 'SELECT * ' + 
                    'FROM `abilfunctions` ' +
                    'JOIN `userlevels` ON `userlevels`.`id` = `abilfunctions`.`idlevel` ' +
                    'JOIN `modulis` ON `modulis`.`id` = `abilfunctions`.`idmodulo` '
    
    console.log('backend - getbyidlevel - strsql --> ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all abilfunctions - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le abilitazioni ' + result.length);  

            console.log(`rilevate ${result.length} abilitazioni `)
            res.status(200).send({ 
                message:'Situazione attuale abilitazioni',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun profilo presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo utente
exports.getbyid = (req,res)=> {
    
    let key = req.params.id;
  
  

    const strsql = 'SELECT `abilfunctions`.* , `modulis`.`modulo` ' + 
                    'FROM `abilfunctions` ' +
                    'JOIN `userlevels` ON `userlevels`.`id` = `abilfunctions`.`idlevel` ' +
                    'JOIN `modulis` ON `modulis`.`id` = `abilfunctions`.`idmodulo` ' +
                    'where `abilfunctions`.`id` = ' + key;
    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${key} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura abilfunctions for key ' + key);

            res.status(500).send({
                message: `2 errore il lettura abilfunctions for key ${key}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   abilitazioni `)

            res.status(200).send({ 
                message:`situazione attuale profilo id: .....  ${key}`,
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${key} `);
            res.status(200).send({
                message: `nessun user pressente for id: ${key}`,
                data:null
            });
        }

    });  
}

// creazione nuovo profilo  (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
      let idmodulo = req.body.idmodulo;
      let idlevel = req.body.idlevel;
      let enabledNull = req.body.enabledNull;
      let enabledInqu = req.body.enabledInqu;
      let enabledEdit = req.body.enabledEdit;
      let key_utenti_operation = req.body.key_utenti_operation;
  
        /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into abilfunctions
                  (idmodulo,idlevel,enabledNull,enabledInqu,enabledEdit,key_utenti_operation) 
                  valueS
                  (
                     '${idmodulo}','${idlevel}','${enabledNull}','${enabledInqu}','${enabledEdit}','${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo profilo su tabella abilfunctions ');
              res.status(500).send({
                message: `errore in registrazione nuovo profilo su tabella abilfunctions - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... Profilo inserito regolarmente `);
          res.status(200).send({
            message: `Profilo inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`Modifica profilo id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from abilfunctions where id= ${key} `;

    // definisco le variabili per aggiornamento campi

    let enabledNull = req.body.enabledNull;
    let enabledInqu = req.body.enabledInqu;
    let enabledEdit = req.body.enabledEdit;
    let key_utenti_operation = req.body.key_utenti_operation;
    

    let strsql =  `update abilfunctions set
                    enabledNull = '${enabledNull}',
                    enabledInqu = '${enabledInqu}',
                    enabledEdit = '${enabledEdit}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${key}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore in lettura abilfunctions for key ' + key);
            res.status(500).send({
                message: `4 errore in lettura abilfunctions for key ${key} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento profilo id: ${key}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto profilo ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato profilo id: ${key}`);
                    res.status(200).send({ 
                        message: `profilo aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente profilo id: ${key} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun profilo presente for id: ${key}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento utente   // metodo 1  -- funziona  ------  dasistemare se si vuol usare

exports.updateUserByid1 = (req,res)=> {

    let key = req.params.id;

    console.log(req.body,`Modifica utente id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from users where id= ${key} `;
    
    // definisco 
   let usernew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            idRuolo_Day: req.body.idRuolo_Day,
            idruoloweb: req.body.idruoloweb,
            noteUtente: req.body.noteUtente,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura users for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura users for key ' + key);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE users SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento utente id: ${key}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto utente ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `Utente aggiornato regolarmente ...   ok per  id: ${key} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente utente id: ${key} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${key}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione utente

exports.delete = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`cancellazione profilo id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from abilfunctions where id= ${key} `;

    let strsql =  `delete from abilfunctions  where id = ${key}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura abilfunctions for key ${key} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione profilo id: ${key}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione profilo -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `Profilo  id: ${key} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente profilo id: ${key} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun profilo presente for id: ${key}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

// lettura singolo utente
exports.getbylevel = (req,res)=> {
    
    let key = req.params.id;
    

    const strsql = 'SELECT `abilfunctions`.* , `modulis`.`modulo` ' + 
                    'FROM `abilfunctions` ' +
                    'JOIN `userlevels` ON `userlevels`.`id` = `abilfunctions`.`idlevel` ' +
                    'JOIN `modulis` ON `modulis`.`id` = `abilfunctions`.`idmodulo` ' +
                    'where `abilfunctions`.`idlevel` = ' + key;
    console.log('backend - getbyidlevel - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${key} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'23 errore il lettura abilfunctions for idlevel ' + key);

            res.status(500).send({
                message: `23 errore il lettura abilfunctions for idlevel ${key}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------    ---    -----  ----   abilitazioni `)

            res.status(200).send({ 
                message:`situazione attuale abilitazioni per profilo selezionato`,
                number:  result.length,
                data:result
            });                    
        }else {
            console.log(`nessun record presente per id: ${key} `);
            res.status(200).send({
                message: `nessuna abilitazione presente per il profilo selezionato`,
                number:  result.length,
                data:[]
            });
        }

    }); 
    
}

exports.getfunzionebyrotta = (req,res)=> {
    
        let level = req.params.level;
        let rotta = req.params.rotta;
    
        const strsql = "SELECT * " + 
        "FROM `abilfunctions` " +
        "JOIN `modulis` ON `modulis`.`id` = `abilfunctions`.`idmodulo` " +
        "where `abilfunctions`.`idlevel` = " + level + " and `modulis`.`route` =  '" + rotta + "' ";


     //   SELECT * FROM `abilfunctions` JOIN `modulis` ON `modulis`.`id` = `abilfunctions`.`idmodulo` WHERE `abilfunctions`.`idlevel` = -1 and `modulis`.`route` = 'manif' 



        console.log('backend - getfunzionebyrotta - strsql --> ' + strsql);
      
       // let strsql = `select * from users where id= ${key} `;    originale
    
        db.query(strsql,(err,result)=> {
            if(err) {
                console.log(err,'53 errore il lettura abilfunctions for level ' + level + ' e rotta ' + rotta);
    
                res.status(500).send({
                    message: `53 errore il lettura abilfunctions for level ${level} e rotta ${rotta}- errore: ${err}`,
                    data:null
                });
                return;
            }
            
            if(result.length>0) {
                console.log(`rilevate ${result.length}  ------------    ---    -----  ----   abilitazioni `)
    
                res.status(200).send({ 
                    message:`situazione attuale abilitazioni per profilo selezionato`,
                    number:  result.length,
                    data:result[0]
                });                    
            }else {
                console.log(`nessun record presente per id: ${level} -- ${rotta} `);
                res.status(200).send({
                    message: `nessuna abilitazione presente per il profilo selezionato`,
                    number:  result.length,
                    data:[]
                });
            }
    
        }); 
        
    }

   // router.get('/:id/route/:rotta', [authjwt.verifyToken], abilfunctions.getfunzionebyrotta);




