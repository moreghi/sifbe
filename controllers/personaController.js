const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = 'select personas.*  from  personas  '; 
            
const order =  ' order by personas.id desc';

/*
pool.getConnection(function(error, conn) {
    if(error) {
        conn.release();
        res.status(500).send({
             message: `errore in rilascio connessione - error: ${error}`,
             rc: 'kc',
             success: false
         });
         return;
     }
})
*/


exports.getAll = (req,res)=> {
     let strsql = strSql + order;

     db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3xss errore il lettura all personas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte i persone ' + result.length);  

            console.log(`rilevate ${result.length} persone `)
            res.status(200).send({ 
                message:'Situazione attuale persone',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user pressente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }
    });

}

// lettura singola persona
exports.getbyid = (req,res)=> {
 
    const id = req.params.id;
    
    let strsql = strSql + ' where `personas`.`id` = ' + id;
   
    console.log('backend - persona getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura personas for id ' + id);

            res.status(500).send({
                message: `2vvcv errore  lettura personas for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   persone `)

            res.status(200).send({ 
                message:`situazione attuale per persona id: .....  ${id}`,
                number:  result.length,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for id: ${id}`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo utente   (post)

exports.createNew = (req,res)=> {
      
    const strsql1 ="SELECT * FROM `personas` WHERE id < 99999 ORDER BY id DESC;";

     // creo le variabili dai campi di input
     let idGiornata = req.body.idGiornata;
     let cognome = req.body.cognome;
     let nome = req.body.nome;
     let email = req.body.email;
     let cellulare = req.body.cellulare;
     let idRuolo = req.body.idRuolo;
     let dRuolo = req.body.dRuolo;
     let inServizio = req.body.inServizio;
     let utilizzatoCommanda = req.body.utilizzatoCommanda;
     let key_utenti_operation = req.body.key_utenti_operation;

       let strsql =  `insert into personas
                  (idGiornata,cognome,nome,email,cellulare,idRuolo,inServizio,utilizzatoCommanda,key_utenti_operation,dRuolo) 
                  valueS
                  (
                    ${idGiornata},UPPER('${cognome}'),UPPER('${nome}'),LOWER('${email}'),'${cellulare}',${idRuolo},UPPER('${inServizio}'),UPPER('${utilizzatoCommanda}'),${key_utenti_operation},UPPER('${dRuolo}') 
                  )`;
      console.log('insert - strsql: ' + strsql);
     
     // console.log('nuovo eventoPosto ------ strsql: ' + strsql);          
     db.query(strsql,(err,result) => {
         if(err) {
            console.log(err,'errore in registrazione nuova persona su tabella personas ');
            res.status(500).send({
              message: `errore in registrazione nuova persona su tabella personas - errore: ${err}`,
              data:null
           });
           return;
         }
       
         
         db.query(strsql1,(err,result) => {
           if(err) {
                        console.log(err,'errore in lettura ultima persona  su tabella personas ');
                        res.status(500).send({
                        message: `errore in lettura ultima persona su tabella personas - errore: ${err}`,
                        rc: 'kk',
                        data:null
             });
             return;
           }
           res.status(200).send({
                message: `persona inserita regolarmente`,
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

    console.log(req.body,` <----------  updatebyId ----------  Modifica persona id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from personas where id= ${id} `;

     let idGiornata = req.body.idGiornata;
     let cognome = req.body.cognome;
     let nome = req.body.nome;
     let email = req.body.email;
     let cellulare = req.body.cellulare;
     let idRuolo = req.body.idRuolo;
     let inServizio = req.body.inServizio;
     let utilizzatoCommanda = req.body.utilizzatoCommanda;
     let idStato = req.body.idStato;
     let dRuolo = req.body.dRuolo;
     let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update personas set
                    idGiornata = ${idGiornata},
                    cognome = UPPER('${cognome}'),
                    nome = UPPER('${nome}'),
                    email = LOWER('${email}'), 
                    cellulare = '${cellulare}',
                    idRuolo = ${idRuolo},
                    dRuolo = UPPER('${dRuolo}'),
                    inServizio = UPPER('${inServizio}'),
                    utilizzatoCommanda = UPPER('${utilizzatoCommanda}'),
                    idStato = ${idStato},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;
    
                    console.log('bk - --------------  persona ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura personas for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura personas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento persona id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto persona ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato persona id: ${id}`);
                    res.status(200).send({ 
                        message: `persona aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente persona id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna persona presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento utente   // metodo 1  -- funziona   (da sistemare)  usata solo come esempio
// da sistremare nei campi
exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica persona id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from personas where id= ${id} `;
    
    // definisco 
   let manifw = {
            descManif: req.body.descManif,
            anno: req.body.anno,
            numUtentiTot : req.body.numUtentiTot ,
            incassatoTot: req.body.incassatoTot,
            stato: req.body.stato,
            photo: req.body.photo,
            noteManifestazione: req.body.noteManifestazione,
            key_utenti_operation: req.body.key_utenti_operation
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura users for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE personas SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento mamifestazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto persona ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `persona aggiornata regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente persona id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna persona pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione persona

exports.delete = (req,res)=> {  

    console.log('backend ----  persona.delete ' + JSON.stringify(req.params))
    let id = req.params.id;

    console.log(`cancellazione persona id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from personas where id= ${id} `;

    let strsql =  `delete from personas  where id = ${id}`;
 
     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura personas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione persona id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione persona -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `persona  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente persona id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna manifetsazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getbyGiornata = (req,res)=> {

    let idGiornata = req.params.idGiornata;

    let strsql = strSql + ' where `personas`.`idGiornata` = ' + idGiornata;

    db.query(strsql,(err,result)=> {
       if(err) {
          res.status(500).send({
               message: `3xss errore il lettura all personas di giornata ${idGiornata} - erro: ${err}`,
               data:null
           });
           return;
       }
       if(result.length>0) {
           console.log('lettura tutte i persone della giornata ' + result.length);  

           console.log(`rilevate ${result.length} persone `)
           res.status(200).send({ 
               message:'Situazione attuale persone della giornata',
               number:  result.length,
               rc: 'ok',
               data:result
           });                    
       }else {
           console.log('nessun record presente ' + result.length); 

           res.status(200).send({ 
               message: `nessun user pressente `,
               rc: 'nf',
               number:  result.length,
               data:null
           });                    
       }
   });

}

exports.getbyRuolo = (req,res)=> {

    let idGiornata = req.params.idGiornata;
    let idRuolo = req.params.idRuolo;

    let strsql = strSql + ' where `personas`.`idGiornata` = ' + idGiornata + ' and `personas`.`idRuolo` = ' + idRuolo;

    db.query(strsql,(err,result)=> {
       if(err) {
          res.status(500).send({
               message: `3xss errore il lettura all personas di giornata ${idGiornata}  e ruolo  ${idRuolo} - erro: ${err}`,
               data:null
           });
           return;
       }
       if(result.length>0) {
           console.log('lettura tutte i persone della giornata e di ruolo' + result.length);  

           console.log(`rilevate ${result.length} persone `)
           res.status(200).send({ 
               message:'Situazione attuale persone della giornata e ruolo',
               number:  result.length,
               rc: 'ok',
               data:result
           });                    
       }else {
           console.log('nessun record presente ' + result.length); 

           res.status(200).send({ 
               message: `nessun user pressente `,
               rc: 'nf',
               number:  result.length,
               data:null
           });                    
       }
   });

}

exports.getPersonabyinServizio = (req,res)=> {

    let idGiornata = req.params.idGiornata;
    let inservizio = req.params.inservizio;
    let nonUtilizzatoCommanda = 'N';

    let strsql = strSql + " where `personas`.`idGiornata` = " + idGiornata + " and `personas`.`inServizio` = '" + inservizio + "'  and `personas`.`utilizzatoCommanda` = '" + nonUtilizzatoCommanda + "'";

    console.log('getPersonabyinServizio -------------------- strsql:' + strsql)

    db.query(strsql,(err,result)=> {
       if(err) {
          res.status(500).send({
               message: `3xss errore il lettura all personas di giornata ${idGiornata}  e inservizio  ${inservizio} - erro: ${err}`,
               data:null
           });
           return;
       }
       if(result.length>0) {
           console.log('lettura tutte i persone della giornata e in servizio' + result.length);  

           console.log(`rilevate ${result.length} persone `)
           res.status(200).send({ 
               message:'Situazione attuale persone della giornata e inservizio',
               number:  result.length,
               rc: 'ok',
               data:result
           });                    
       }else {
           console.log('nessun record presente ' + result.length); 

           res.status(200).send({ 
               message: `nessun user presente `,
               rc: 'nf',
               number:  result.length,
               data:null
           });                    
       }
   });

}

exports.getPersonabyutilizzoCommanda = (req,res)=> {

    let idGiornata = req.params.idGiornata;
    let utilizzato = req.params.utilizzato;

    let strsql = strSql + " where `personas`.`idGiornata` = ' + idGiornata + ' and `personas`.`utilizzatoCommanda` = '" + utilizzato + "' ";

    db.query(strsql,(err,result)=> {
       if(err) {
          res.status(500).send({
               message: `3xss errore il lettura all personas di giornata ${idGiornata}  e utilizzatCommanda  ${utilizzato} - erro: ${err}`,
               data:null
           });
           return;
       }
       if(result.length>0) {
           console.log('lettura tutte i persone della giornata e utilizzatocommanda' + result.length);  

           console.log(`rilevate ${result.length} persone `)
           res.status(200).send({ 
               message:'Situazione attuale persone della giornata e utilizzato Commanda',
               number:  result.length,
               rc: 'ok',
               data:result
           });                    
       }else {
           console.log('nessun record presente ' + result.length); 

           res.status(200).send({ 
               message: `nessun user presente `,
               rc: 'nf',
               number:  result.length,
               data:null
           });                    
       }
   });

}
