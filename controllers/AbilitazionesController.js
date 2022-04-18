// creo i metodi per la gestione dell'utente

const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

/*   non esiste
exports.getAll = (req,res)=> {
 
    let strsql = 'select * from users';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all users - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli utenti ' + result.length);  

            console.log(`rilevati ${result.length} utenti `)
            res.status(200).send({ 
                message:'Situazione attuale Utenti',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user pressente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}
*/



// lettura singolo utente
exports.getabilbyid = (req,res)=> {
    
    let key = req.params.id;
 
    let strsql = `select * from abilitazionis  where id= ${key} `;
    //              SELECT * FROM `abilitazionis` WHERE idUtente=10054 

    console.log('autorizationis - getabilbyid- Strsql -->' + strsql);
    

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura abilitaziones for key ' + key);

            res.status(500).send({
                message: `2 errore il lettura abilitaziones for key ${key}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  -----------abilitazioni  `)
            console.log(result);
            res.status(200).send({ 
                message:`situazione attuale abilitazione per utente id: .....  ${key}`,
                number: result.length,
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




// lettura singolo utente
exports.getbyid = (req,res)=> {
    
    let key = req.params.id;
  
    let strsql = `select * from abilitazionis where idUtente= ${key} `;
    //              SELECT * FROM `abilitazionis` WHERE idUtente=10054 

    console.log('autorizationis - getbyid - Strsql -->' + strsql);
    

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura abilitazionis for key ' + key);

            res.status(500).send({
                message: `2 errore il lettura abilitazionis for key ${key}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   utenti `)
            console.log(result);
            res.status(200).send({ 
                message:`situazione attuale per utente id: .....  ${key}`,
                number: result.length,
                data:result
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

// aggiornamento utente   // metodo 2  -- funziona

exports.updateUserByid = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`Modifica abilitazionis where idUtente id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from abilitazionis where id= ${key} `;

    // definisco le variabili per aggiornamento campi

    let enabledNull = req.body.enabledNull;
    let enabledInqu = req.body.enabledInqu;
    let enabledEdit = req.body.enabledEdit;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update abilitazionis set
                    enabledNull = '${enabledNull}',
                    enabledInqu = '${enabledInqu}',
                    enabledEdit = '${enabledEdit}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${key}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura abilitazionis for key ' + key);
            res.status(500).send({
                message: `4 errore il lettura abilitazionis for key ${key} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento abilitazione id: ${key}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto abilitaziones ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato abilitazione id: ${key}`);
                    res.status(200).send({ 
                        message: `abilitazione aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente abilitazione id: ${key} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna abilitazione presente for id: ${key}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  






// creazione nuovo utente   (post)

exports.createNewAbilitazione = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
      let idUtente = req.body.idUtente;
      let funzione = req.body.funzione;
      let enabledNull = req.body.enabledNull;
      let enabledInqu = req.body.enabledInqu;
      let enabledEdit = req.body.enabledEdit;
      let presentNote = req.body.presentNote;
      let noteEnabled = req.body.noteEnabled;
      let key_utenti_operation = req.body.key_utenti_operation;
   
      
    
  //    Attenzione:
  //        trovare modalità di controllo se record già inserito
 //         - per id con Incremento automatico fare select su un campo unico
  //        - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
    
      let strsql =  `insert into abilitazionis
                  (idUtente,funzione,enabledNull,enabledInqu,enabledEdit,presentNote,noteEnabled,key_utenti_operation) 
                  valueS
                  (
                     '${idUtente}','${funzione}','${enabledNull}','${enabledInqu}','${enabledEdit}','${presentNote}','${noteEnabled}','${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova abilitazione su tabella abilitazionis ');
              res.status(500).send({
                message: `errore in registrazione nuova abilitazione su tabella abilitazionis - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... nuova abilitazione inserita regolarmente `);
          res.status(200).send({
            message: `nuova abilitazione inserita regolarmente`,
            data:result
        });
     });
    
  }
  
  exports.deleteAbilitazione = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`cancellazione abilitazione id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from abilitazionis where id= ${key} `;

    let strsql =  `delete from abilitazionis  where id = ${key}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura abilitazionis for key ${key} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione abolitazione id: ${key}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione abilitazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `abilitazione  id: ${key} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente abilitazione id: ${key} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna abilitazione presente for id: ${key}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  
  /*
  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateUserByid = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`Modifica utente id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from users where id= ${key} `;

    // definisco le variabili per aggiornamento campi

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let photo = req.body.photo;
    let idStato = req.body.idStato;
    let tipoacc = req.body.tipoacc;
    let username = req.body.username;
    let email = req.body.email;
    let idRuolo = req.body.idRuolo;
    let idRuolo_Day = req.body.idRuolo_Day;
    let idruoloweb = req.body.idruoloweb;
    let noteUtente = req.body.noteUtente;
  //  let remember_token = req.body.remember_token;
  //  let email_verified_at = req.body.email_verified_at;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update users set
                    cognome = '${cognome}',
                    nome = '${nome}',
                    photo = '${photo}',
                    idStato = '${idStato}',
                    tipoacc = '${tipoacc}',
                    username = '${username}',
                    email = '${email}',
                    idRuolo = '${idRuolo}',
                    idRuolo_Day = '${idRuolo_Day}',
                    idruoloweb = '${idruoloweb}',
                    noteUtente = '${noteUtente}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${key}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura users for key ' + key);
            res.status(500).send({
                message: `4 errore il lettura users for key ${key} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento utente id: ${key}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto utente ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato utente id: ${key}`);
                    res.status(200).send({ 
                        message: `Utente aggiornato regolarmente   `,
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

// aggiornamento utente   // metodo 1  -- funziona

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


*/
