const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = 'select prenotazioneprodottos.* ' +  
               ' from  prenotazioneprodottos  '; 
            
const order =  ' order by prenotazioneprodottos.id desc';

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
                message: `3xss errore il lettura all prenotazioneprodottos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte i listini ' + result.length);  

            console.log(`rilevate ${result.length} listini `)
            res.status(200).send({ 
                message:'Situazione attuale listini',
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

// lettura singola listino
exports.getbyid = (req,res)=> {
 
    const id = req.params.id;
    
    let strsql = strSql + ' where `prenotazioneprodottos`.`id` = ' + id;
   
    console.log('backend - listino getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura prenotazioneprodottos for id ' + id);

            res.status(500).send({
                message: `2vvcv errore  lettura prenotazioneprodottos for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   listini `)

            res.status(200).send({ 
                message:`situazione attuale per listino id: .....  ${id}`,
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
      
    const strsql1 ="SELECT * FROM `prenotazioneprodottos` WHERE id < 99999 ORDER BY id DESC;";

    console.log('backend -- prenotazioneprod --- create ----- req.body ' + JSON.stringify(req.body))

     // creo le variabili dai campi di input
     let stato = req.body.stato;
     let idprenot = req.body.idprenot;
     let idprodotto = req.body.idprodotto;
     let descrizione = req.body.descrizione;
     let tipologia = req.body.tipologia;
     let categoria = req.body.categoria;
     let competenza = req.body.competenza;
     let qta = req.body.qta;
     let prezzo = req.body.prezzo;
     let photo = req.body.photo;
     let key_utenti_operation = req.body.key_utenti_operation;

     let strsql =  `insert into prenotazioneprodottos
                     (stato,idprenot,idprodotto,descrizione,tipologia,categoria,competenza,qta,prezzo,photo,key_utenti_operation) 
                     valueS
                     (
                       ${stato},${idprenot},${idprodotto}, UPPER('${descrizione}'),${tipologia},${categoria},${competenza},${qta},${prezzo},'${photo}',${key_utenti_operation} 
                     )`;
      console.log('insert - strsql: ' + strsql);
     
     // console.log('nuovo eventoPosto ------ strsql: ' + strsql);          
     db.query(strsql,(err,result) => {
         if(err) {
            console.log(err,'errore in registrazione nuova prenotazione su tabella prenotazioneprodottos ');
            res.status(500).send({
              message: `errore in registrazione nuova prenotazione su tabella prenotazioneprodottos - errore: ${err}`,
              data:null
           });
           return;
         }
         
         db.query(strsql1,(err,result) => {
           if(err) {
                        console.log(err,'errore in lettura ultima prenotazione  ');
                        res.status(500).send({
                        message: `errore in lettura ultima prenotazione - errore: ${err}`,
                        rc: 'kk',
                        data:null
             });
             return;
           }
           res.status(200).send({
                message: `prenotazione inserita regolarmente`,
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

    console.log(req.body,` <----------  updatebyId ----------  Modifica listino id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from prenotazioneprodottos where id= ${id} `;

    let stato = req.body.stato;
     let idprenot = req.body.idprenot;
     let idprodotto = req.body.idprodotto;
     let descrizione = req.body.descrizione;
     let tipologia = req.body.tipologia;
     let categoria = req.body.categoria;
     let competenza = req.body.competenza;
     let qta = req.body.qta;
     let prezzo = req.body.prezzo;
     let photo = req.body.photo;
     let key_utenti_operation = req.body.key_utenti_operation;
     
    let strsql =  `update prenotazioneprodottos set
                   
                    stato = ${stato},
                    idprenot = ${idprenot},
                    idprodotto = ${idprodotto},
                    descrizione = UPPER('${descrizione}'),
                    tipologia = ${tipologia},
                    categoria = ${categoria},
                    competenza = ${competenza},
                    qta = ${qta},
                    prezzo = ${prezzo},
                    photo = '${photo}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;
    
                    console.log('bk - --------------  listino ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prenotazioneprodottos for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura prenotazioneprodottos for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento prenotazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto prenotazione ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato prenotazione id: ${id}`);
                    res.status(200).send({ 
                        message: `prenotazione aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente prenotazione id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna prenotazione presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica listino id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from prenotazioneprodottos where id= ${id} `;
    
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
                  db.query('UPDATE prenotazioneprodottos SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento mamifestazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto listino ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `listino aggiornata regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente listino id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna listino pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione listino

exports.delete = (req,res)=> {  

    console.log('backend ----  prenotazione.delete ' + JSON.stringify(req.params))
    let id = req.params.id;

    console.log(`cancellazione prenotazione id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from prenotazioneprodottos where id= ${id} `;

    let strsql =  `delete from prenotazioneprodottos  where id = ${id}`;
 
     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazioneprodottos for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione prenotazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione prenotazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `prenotazione  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente prenotazione id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna prenotazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

// lettura singola listino
exports.getallProdbyprenotazione = (req,res)=> {
 
    const id = req.params.id;
 
    




    
    let strsql = strSql + ' where `prenotazioneprodottos`.`idPrenot` = ' + id;
   
    console.log('backend - prenoptazione getallProdbyprenotazione - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura prenotazioneprodottos for idPrenot  ' + id);

            res.status(500).send({
                message: `2vvcv errore  lettura prenotazioneprodottos for idPrenot ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  -------------prenotazioni per idprenot  ${id}` )

            res.status(200).send({ 
                message:`situazione attuale prenotazioni per idprenot .....  ${id}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per idprenot: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for idprenot: ${id}`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

