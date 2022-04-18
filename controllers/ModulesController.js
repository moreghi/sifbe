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
 
   
    //let strsql = 'select * from modulis JOIN `userlevels` ON `userlevels`.`id` = `modulis`.`idlevel`';

    const strsql = 'SELECT * ' + 
                    'FROM `modulis` ' 
              
    
    console.log('backend - getAlls - strsql --> ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all modulis - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti moduli ' + result.length);  

            console.log(`rilevati ${result.length} moduli `)
            res.status(200).send({ 
                message:'Situazione attuale moduli',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun modulo presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo utente
exports.getbyid = (req,res)=> {
    
    let key = req.params.id;
  

    const strsql = 'SELECT * ' + 
                    'FROM `modulis` ' +
                    'where `modulis`.`id` = ' + key;
    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${key} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura modulis for key ' + key);

            res.status(500).send({
                message: `2 errore il lettura modulis for key ${key}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   moduli `)

            res.status(200).send({ 
                message:`situazione attuale modulo id: .....  ${key}`,
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
      let modulo = req.body.modulo;
      let route = req.body.route;
      let key_utenti_operation = req.body.key_utenti_operation;

     
  /*




      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into modulis
                  (modulo,route,key_utenti_operation) 
                  valueS
                  (
                     '${modulo}','${route}','${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo modulo su tabella modulis ');
              res.status(500).send({
                message: `errore in registrazione nuovo modulo su tabella modulis - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... Modulo inserito regolarmente `);
          res.status(200).send({
            message: `Modulo inserito regolarmente`,
            data:result
        });
     });
    
  }
  
  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`Modifica Modulo id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from modulis where id= ${key} `;

    // definisco le variabili per aggiornamento campi

    let modulo = req.body.modulo;
    let route = req.body.route;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update modulis set
                    modulo = '${modulo}',
                    route = '${route}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${key}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore in lettura modulis for key ' + key);
            res.status(500).send({
                message: `4 errore in lettura modulis for key ${key} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento Modulo id: ${key}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto Modulo ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato Modulo id: ${key}`);
                    res.status(200).send({ 
                        message: `Modulo aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente modulo id: ${key} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun modulo presente for id: ${key}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica modulo id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

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

    console.log(req.body,`cancellazione modulo id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from modulis where id= ${key} `;

    let strsql =  `delete from modulis  where id = ${key}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura modulis for key ${key} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione modulo id: ${key}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione modulo -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `modulo cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente modulo id: ${key} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun modulo presente for id: ${key}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.lastid = (req,res)=> {  

    let strsql =  `SELECT * FROM modulis ORDER BY id DESC LIMIT 1`;
    db.query(strsql,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura modulis per ultimo record inserito - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                console.log(`rilevati ${result.length}  ------------------------   moduli `)
    
                res.status(200).send({ 
                    message:`situazione attuale ultimo modulo`,
                    data:result[0]
                });                    
            }else {
                console.log(`nessun record presente in tabella `);
                res.status(200).send({
                    message: `nessun user pressente tabella`,
                    data:null
                });
            }
    });  

}
 

