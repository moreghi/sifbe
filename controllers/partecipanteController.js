const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = 'select partecipantes.* ' +  
               ' from  partecipantes  '; 
const order =  ' order by partecipantes.id desc';

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
                message: `3xss errore il lettura all partecipantes - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le manifestazioni ' + result.length);  

            console.log(`rilevate ${result.length} manifestazioni `)
            res.status(200).send({ 
                message:'Situazione attuale Manifestazioni',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun partecipante pressente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }
    });

}

// lettura singola partecipante
exports.getbyid = (req,res)=> {
   
    const id = req.params.id;
    
    let strsql = strSql + ' where `partecipantes`.`id` = ' + id;

   
    console.log('backend - partecipante getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore il lettura partecipantes for id ' + id);

            res.status(500).send({
                message: `2vvcv errore il lettura partecipantes for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   partecipante `)

            res.status(200).send({ 
                message:`situazione attuale per partecipante id: .....  ${id}`,
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

// lettura singola partecipante
exports.getbystato = (req,res)=> {
    
    const stato = req.params.stato;
    
    let strsql = strSql + ' where `partecipantes`.`stato` = ' + stato + order;

    console.log('backend - getbystato - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'3 errore il lettura partecipantes for stato' + stato);

            res.status(500).send({
                message: `3 errore il lettura partecipantes for stato ${stato}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   manifestazioni `)

            res.status(200).send({ 
                message:`situazione attuale per partecipante stato: .....  ${stato}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per stato: ${stato} `);
            res.status(200).send({
                message: `nessuna partecipante presente per la selezione impostata`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo utente   (post)

exports.createNew = (req,res)=> {
    
    const strsql1 ="SELECT * FROM `partecipantes` WHERE id < 99999 ORDER BY id DESC;";

    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
      let stato = req.body.stato;
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let cellulare = req.body.cellulare;
      let email = req.body.email;
      let anno = req.body.anno;
      let key_utenti_operation = req.body.key_utenti_operation;
     /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into partecipantes
                  (stato,cognome,nome,anno,cellulare,email,key_utenti_operation) 
                  valueS
                  (
                    ${stato},UPPER('${cognome}'),UPPER('${nome}'),${anno},'${cellulare}',LOWER('${email}'),${key_utenti_operation} 
                  )`;
      console.log('insert - strsql: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova partecipante su tabella partecipantes ');
              res.status(500).send({
                message: `errore in registrazione nuova partecipante su tabella partecipantes - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... partecipante inserita regolarmente `);
          db.query(strsql1,(err,result) => {
            if(err) {
              console.log(err,'errore in lettura ultimo partecipante inserito su tabella partecipantes ');
              res.status(500).send({
                message: `errore in lettura uultimo partecipante inserito su tabella partecipantes - errore: ${err}`,
                rc: 'kk',
                data:null
              });
              return;
            }
            res.status(200).send({
                message: `partecipante inserito regolarmente`,
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

    console.log(req.body,` <----------  updatebyId ----------  Modifica partecipante id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from partecipantes where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let stato = req.body.stato;
    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let cellulare = req.body.cellulare;
    let email = req.body.email;
    let anno = req.body.anno;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update partecipantes set
                    stato = ${stato},
                    cognome = UPPER('${cognome}'),
                    nome = UPPER('${nome}'),
                    cellulare = '${cellulare}',
                    email = LOWER('${email}'),
                    anno = ${anno},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;


                    console.log('bk - --------------  partecipante ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura partecipantes for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura partecipantes for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento partecipante id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto partecipante ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato partecipante id: ${id}`);
                    res.status(200).send({ 
                        message: `partecipante aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente partecipante id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna partecipante presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica partecipante id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from partecipantes where id= ${id} `;
    
    // definisco 
   let manifw = {
            descManif: req.body.descManif,
            anno: req.body.anno,
            numUtentiTot : req.body.numUtentiTot ,
            incassatoTot: req.body.incassatoTot,
            stato: req.body.stato,
            photo: req.body.photo,
            notepartecipante: req.body.notepartecipante,
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
                  db.query('UPDATE partecipantes SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento mamifestazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto partecipante ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `partecipante aggiornata regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente partecipante id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna partecipante pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione partecipante

exports.delete = (req,res)=> {  

    console.log('backend ----  manif.delete ' + JSON.stringify(req.params))
    let id = req.params.id;

    console.log(`cancellazione partecipante id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from partecipantes where id= ${id} `;

    let strsql =  `delete from partecipantes  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura partecipantes for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione partecipante id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione partecipante -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `partecipante  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente partecipante id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna manifetsazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getbycognnomeemailcell = (req,res)=> {
   
    console.log('backend ---- getbycognnomeemailcell  ------------------------------------------------------  params ' + JSON.stringify(req.params))



    let cognome = req.params.cognome;
    let nome = req.params.nome;
    let email = req.params.email;
    let cellulare = req.params.cellulare;

    let where_cognome = '';
    let where_nome = '';
    let where_email = '';
    let where_cellulare = '';

    if(cognome !== '') {
        where_cognome = " `partecipantes`.`cognome` = '"  + cognome + "' ";
    }
    if(nome !== '') {
        where_nome = "  and `partecipantes`.`nome` = '"  + nome + "' ";
    }
    if(email !== '') {
        where_email = " and `partecipantes`.`email` = '"  + email + "' ";
    }
    if(cellulare !== '') {
        where_cellulare = " and `partecipantes`.`cellulare` = '"  + cellulare + "' ";
    } 

    let strsql = strSql + ' where ' +  where_cognome +  where_nome +  where_email +  where_cellulare;
   
    console.log('backend - partecipante getbycognnomeemailcell - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore il lettura partecipantes for all dati ');

            res.status(500).send({
                message: `2vvcv errore il lettura partecipantes for all dati - errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   partecipante -----  result[0]  ` + JSON.stringify(result[0]))

            res.status(200).send({ 
                message:`situazione attuale per partecipante  All dati`,
                number:  result.length,
                rc: 'ok',
                data:result[0],
            });                    
        }else {
            console.log(`nessun record presente per all Dati `);
            res.status(200).send({
                message: `nessun user presente for all Dati`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}