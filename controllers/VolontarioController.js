const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

// --------------
const crypto = require("crypto");
const hash = bcrypt.hashSync("generic", salt);

// -----------

const strSql = 'select `volontarios`.* FROM `volontarios`';
                     

// ------   ok  nuova modalità di craere strsql  
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from volontarios';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all volontarios - erro: ${err}`,
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
                rc: 'ok',
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

exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
  
    const strsql = strSql + ' where `volontarios`.`id` = ' + id;

    console.log('backend - getUserbyid - strsql --> ' + strsql);
  
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura volontarios for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura volontarios for id ${id}- errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   utenti `)

            res.status(200).send({ 
                message:`situazione attuale per utente id: .....  ${id}`,
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

// lettura per email
exports.getbyemail = (req,res)=> {
    
    let email = req.params.email;
    const strsql = strSql + " where `email` = '" + email + "' ";

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura volontarios for email ' + email);

            res.status(500).send({
                message: `errore il lettura volontarios for email ${email}- errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   utenti `)

            res.status(200).send({ 
                message:`situazione attuale per utente email: .....  ${email}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per email: ${email} `);
            res.status(200).send({
                message: `nessun user pressente for email: ${email}`,
                rc: 'nf',
                data:null
            });
        }
    });  
}

// creazione nuovo utente   (post)

exports.createNew = (req,res)=> {
 
    const strsql1 ="SELECT * FROM `volontarios` WHERE id < 99999 ORDER BY id DESC;";

      // creo le variabili dai campi di input
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let stato = req.body.stato;
      let cellulare = req.body.cellulare;
      let email = req.body.email;
      let key_utenti_operation = req.body.key_utenti_operation;

      let strsql =  `insert into volontarios
                  (cognome,nome,stato,email,cellulare,key_utenti_operation) 
                  valueS
                  (
                    UPPER('${cognome}'),UPPER('${nome}'),${stato},LOWER('${email}'),'${cellulare}',${key_utenti_operation} 
                  )`;
      
                  db.query(strsql,(err,result) => {
                    if(err) {
                       console.log(err,'errore in registrazione nuovo volontario  ');
                       res.status(500).send({
                         message: `errore in registrazione nuovo volontario  - errore: ${err}`,
                         data:null
                      });
                      return;
                    }
                    
                    db.query(strsql1,(err,result) => {
                      if(err) {
                                   console.log(err,'errore in lettura ultimo volontario  ');
                                   res.status(500).send({
                                   message: `errore in lettura ultimo volontario - errore: ${err}`,
                                   rc: 'kk',
                                   data:null
                        });
                        return;
                      }
                      res.status(200).send({
                           message: `volontario inserito regolarmente`,
                           rc: 'ok',
                           data:result[0],
                           lastnumber:result[0].id 
                      });
                  });
              });
  }
  
  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from volontarios where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let stato = req.body.stato;
    let cellulare = req.body.cellulare;
    let email = req.body.email;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update volontarios set
                    cognome = UPPER('${cognome}'),
                    nome = UPPER('${nome}'),
                    stato = '${stato}',
                    email = '${email}',
                    cellulare = '${cellulare}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura volontarios for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura volontarios for key ${id} - errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento utente id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto utente ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato utente id: ${id}`);
                    res.status(200).send({ 
                        message: `Utente aggiornato regolarmente   `,
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

// aggiornamento utente   // metodo 1  -- funziona

exports.updateUserByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from volontarios where id= ${id} `;
    
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
            noteUtente: req.body.noteUtente,


          
            telefono: req.body.telefono,
            idRuolo_Day: req.body.idRuolo_Day,
            idLevel: req.body.idLevel,
            idruoloweb: req.body.idruoloweb,




            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura volontarios for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura volontarios for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE volontarios SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
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

    console.log(req.body,`cancellazione volontario id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from volontarios where id= ${id} `;

    let strsql =  `delete from volontarios  where id = ${id}`;
                    
     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura volontarios for key ${id} - errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione utente id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione utente -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `Utente  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente utente id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  
exports.getbystato = (req,res)=> {

    let stato = req.params.stato;
    stato = 0;
  
    const strsql = strSql + ' where `volontarios`.`stato` > ' + stato;

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all volontarios by stato - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i volontari ' + result.length);  

            console.log(`rilevati ${result.length} volontari `)
            res.status(200).send({ 
                message:'Situazione attualevolontari',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

