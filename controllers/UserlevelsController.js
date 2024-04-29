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
 
    let strsql = 'select * from userlevels';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all userlevels - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i profili ' + result.length);  

            console.log(`rilevati ${result.length} profili `)
            res.status(200).send({ 
                message:'Situazione attuale profili',
                number:  result.length,
                rc: 'ok',
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
    
    let id = req.params.id;
  
    console.log(`backend  -- userlevelControllder   ----- geybyoid per id: ${id} `);

    const strsql = 'SELECT * ' + 
                    'FROM `userlevels` ' +
                    'where `userlevels`.`id` = ' + id;
    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura userlevels for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura userlevels for id ${id}- errore: ${err}`,
                number:  0,
                rc: 'ko',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   profili `)

            res.status(200).send({ 
                message:`situazione attuale profilo id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo profilo  (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
      let userLevelName = req.body.userLevelName;
      let key_utenti_operation = req.body.key_utenti_operation;
  
   
      let strsql =  `insert into userlevels
                  (userLevelName,key_utenti_operation) 
                  valueS
                  (
                    UPPER'${userLevelName}'),${key_utenti_operation}
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo profilo su tabella userlevels ');
              res.status(500).send({
                message: `errore in registrazione nuovo profilo su tabella userlevels - errore: ${err}`,
                rc: 'ko',
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

    let id = req.params.id;

    console.log(req.body,`Modifica profilo id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from userlevels where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let userLevelName = req.body.userLevelName;
    let key_utenti_operation = req.body.key_utenti_operation;
    

    let strsql =  `update userlevels set
                    userLevelName = UPPER'${userLevelName}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore in lettura userlevels for id ' + id);
            res.status(500).send({
                message: `4 errore in lettura userlevels for id ${id} - errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento profilo id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto profilo ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato profilo id: ${id}`);
                    res.status(200).send({ 
                        message: `profilo aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente profilo id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun profilo presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento utente   // metodo 1  -- funziona  ------  dasistemare se si vuol usare

exports.updateUserByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from users where id= ${id} `;
    
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
                message: `5 errore il lettura users for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura users for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE users SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento utente id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto utente ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `Utente aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente utente id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione utente

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione profilo id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from userlevels where id= ${id} `;

    let strsql =  `delete from userlevels  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura userlevels for id ${id} - errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione profilo id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione profilo -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `Profilo  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente profilo id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun profilo presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

