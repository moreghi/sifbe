const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `commandarigas`.*, `prodottos`.`competenza`, `t_stato_rigacommandas`.`d_stato_riga_commanda`, `t_stato_lavoraziones`.`d_stato_lavorazione`, `t_stato_consegnas`.`d_stato_consegna`  from `commandarigas` " + 
                    " inner join `commandas` ON `commandas`.`id` = `commandarigas`.`idCommanda` "  +
                    " inner join `prodottos` ON `prodottos`.`id` = `commandarigas`.`idProdotto` " +
                    " inner join `t_stato_rigacommandas` ON `t_stato_rigacommandas`.`id` = `commandarigas`.`stato` " +
                    " inner join `t_stato_lavoraziones` ON `t_stato_lavoraziones`.`id` = `commandarigas`.`flag_lavorazione` " +           
                    " inner join `t_stato_consegnas` ON `t_stato_consegnas`.`id` = `commandarigas`.`flag_consegna` " 
             
               // in attesa di capire come ordinare

// const order = " order by `commandas`.`statoBevande`  asc, `commandas`.`statoCucina` asc, `commandas`.`statoContabile` asc  ";
const order = " ";

// ------  ok 
exports.getAll = (req,res)=> {
 
    let strsql = strSql  + order; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all righe commande - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le righe commande ' + result.length);  

            console.log(`rilevate ${result.length} righe commande `)
            res.status(200).send({ 
                message:'Situazione attuale righe commande',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna riga commanda presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna commanda presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo commanda
// ------   ok  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `commandarigas`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from commandas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura commandarigas for id ' + id);

            res.status(500).send({
                message: `2 errore in lettura commandarigas for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   righe commande `)

            res.status(200).send({ 
                message:`situazione attuale per riga commanda id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessuna record presente per id: ${id} `);
            res.status(200).send({
                message: `nessuna user pressente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


exports.getrighebyCommanda = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `commandarigas`.`idCommanda` = ' + id;

    console.log('backend - getrighebyCommanda- strsql --> ' + strsql);
  
   // let strsql = `select * from commandas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2xw errore il lettura commandarigas per commanda id ' + id);

            res.status(500).send({
                message: `2 errore in lettura commandarigas per commanda id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   righe commande `)

            res.status(200).send({ 
                message:`situazione attuale riga per commanda id: .....  ${id}`,
                number: result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessuna record presente per commanda id: ${id} `);
            res.status(200).send({
                message: `nessuna user presente for commanda id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo commanda   (post)    
// ok 
exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo commanda');  // visualizzo la struttura dei campi immessi dall'commanda 
  
      // creo le variabili dai campi di input
  
      let idCommanda = req.body.idCommanda;
      let idProdotto = req.body.idProdotto;
      let categoria = req.body.categoria;
      let competenza = req.body.competenza;
      let tipologia = req.body.tipologia;
      let descrizione_prodotto = req.body.descrizione_prodotto;
      let prezzo = req.body.prezzo;
      let qta_ord = req.body.qta_ord;
      let note_riga = req.body.note_riga;
      let key_utenti_operation = req.body.key_utenti_operation;
     
    
      let strsql =  `insert into commandarigas
                  (idCommanda,idProdotto,categoria,competenza,tipologia,descrizione_prodotto,prezzo,qta_ord,note_riga,key_utenti_operation) 
                  valueS
                  (
                     ${idCommanda},${idProdotto},${categoria},${competenza},${tipologia},'${descrizione_prodotto}',${prezzo},${qta_ord},'${note_riga}',${key_utenti_operation}
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova commanda su tabella commandas ');
              res.status(500).send({
                message: `errore in registrazione nuova commanda su tabella commandas - errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
          }
          console.log(result, `result ...... commanda inserita regolarmente `);
          res.status(200).send({
            message: `commanda inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento commanda   
  // ok
  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica commanda id ${id}`);  // visualizzo la struttura dei campi immessi dall'commanda 

    // definisco la strsql per lettura commanda

    let strsql_Inqu = `select * from commandarigas where id= ${id} `;

    // definisco le variabili per aggiornamento campi
   
    
    let idCommanda = req.body.idCommanda;
    let idProdotto = req.body.idProdotto;
    let categoria = req.body.categoria;
    let competenza = req.body.competenza;
    let tipologia = req.body.tipologia;
    let descrizione_prodotto = req.body.descrizione_prodotto;
    let prezzo = req.body.prezzo;
    let qta_ord = req.body.qta_ord;
      
    let stato = req.body.stato;
    let ora_lavorazione = req.body.ora_lavorazione;
    let delayLavorazione = req.body.delayLavorazione;
    let flag_lavorazione = req.body.flag_lavorazione;
    let semaphoreLavorazione = req.body.semaphoreLavorazione;
    let ora_consegna = req.body.ora_consegna;
    let delayConsegna = req.body.delayConsegna;
    let flag_consegna = req.body.flag_consegna;
    let semaphoreConsegna = req.body.semaphoreConsegna;
    let note_riga = req.body.note_riga;
    let key_utenti_operation = req.body.key_utenti_operation;
   
    let strsql =  `update commandarigas set
                        idCommanda = ${idCommanda},
                        idProdotto = ${idProdotto},
                        categoria = ${categoria},
                        competenza = ${competenza},
                        tipologia = ${tipologia},
                        descrizione_prodotto = '${descrizione_prodotto}',
                        prezzo = ${prezzo},
                        qta_ord = ${qta_ord},
                        stato = ${stato},
                        ora_lavorazione = '${ora_lavorazione}',
                        delayLavorazione = ${delayLavorazione},
                        flag_lavorazione = ${flag_lavorazione},
                        semaphoreLavorazione = '${semaphoreLavorazione}',
                        ora_consegna = '${ora_consegna}',
                        delayConsegna = ${delayConsegna},
                        flag_consegna = ${flag_consegna},
                        semaphoreConsegna = '${semaphoreConsegna}',
                        note_riga = '${note_riga}',
                        key_utenti_operation = ${key_utenti_operation}
                        where id = ${id}`;

                        console.log('update commandariga ----   strsql ' + strsql);

                // verifico prima l'esistenza del record
                console.log('------------------------------------------------ update: ' + strsql);

                db.query(strsql_Inqu,(err,result)=> {  
                        if(err) {
                            console.log(err,'4 errore il lettura commandas for id ' + id);
                            res.status(500).send({
                            message: `4 errore il lettura commandas for id ${id} - errore: ${err}`,
                            data:null
                            });
                            return;
                        }
                        if(result.length>0) {
                            db.query(strsql,(err,result) => {    
                                if(err) { 
                                    console.log(err,` ----- errore in aggiornamento commandariga id: ${id}`);
                                    res.status(500).send({ 
                                        message: `errore in aggiornamnto commanda ${err} --  `,
                                        rc: 'ko',
                                        data:null
                                    });  
                                    return;
                                } 
                                console.log(err,`----- aggiornato commandariga id: ${id}`);
                                res.status(200).send({ 
                                    message: `commandariga aggiornata regolarmente   `,
                                    rc: 'ok',
                                    data:result
                                });  
                            });  
                    }  
                    else {
                        console.log(`----- inesistente commandariga id: ${id} -- aggiornamento non possibile`);
                        res.status(200).send({ 
                            message: `nessuna commandariga presente for id: ${id}  -- aggiornamento non possibile`,
                            rc: 'nf',
                            data:null
                        });
                        return;
                    }
                });  

 

                /*
 let stato = req.body.stato;
    let ora_lavorazione = req.body.ora_lavorazione;
    let delayLavorazione = req.body.delayLavorazione;
    let flag_lavorazione = req.body.flag_lavorazione;
    let semaphoreLavorazione = req.body.semaphoreLavorazione;
    let ora_consegna = req.body.ora_consegna;
    let delayConsegna = req.body.delayConsegna;
    let flag_consegna = req.body.flag_consegna;
    let semaphoreConsegna = req.body.semaphoreConsegna;
    let note_riga = req.body.note_riga;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update commandarigas set
                        stato = ${stato},
                        delayLavorazione = ${delayLavorazione},
                        flag_lavorazione = ${flag_lavorazione},
                        semaphoreLavorazione = '${semaphoreLavorazione}',
                        key_utenti_operation = ${key_utenti_operation}
                        where id = ${id}`;               

    let strsqlDate = 'UPDATE `commandarigas` SET `ora_lavorazione`= `commandarigas`.`updated_at` WHERE `id`= ' +  id


    //    let sqlUpdate = 'UPDATE `commandarigas` SET `stato` = ?, `ora_lavorazione` = ?,`delayLavorazione` = ?,`flag_lavorazione` = ?,`semaphoreLavorazione` = ?   WHERE `id` = ?';
    //    let values = ['${stato}', 'admin', '2']
       

        let sqlUpdate = 'UPDATE `commandarigas` SET `stato` = ?,  `ora_lavorazione` = ?,  `flag_lavorazione` = ?,  `delayLavorazione` = ?, `semaphoreLavorazione` = ?, `key_utenti_operation` = ?  WHERE `id` = ?';
        let values = [stato,ora_lavorazione,flag_lavorazione,delayLavorazione, semaphoreLavorazione,key_utenti_operation, id]




 




    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura commandarigas for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura riga commandas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                console.log('sto eseguendo slqUpdate --------' + sqlUpdate); 
                db.query(sqlUpdate,values,(err,result) => {      
                    if(err) { 
                        console.log(err,` ----- errore in aggiornamento riga commanda id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto riga commanda ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    db.query(strsqlDate,(err,result) => {
                        if(err) { 
                            console.log(err,` ----- errore in aggiornamento riga commanda id: ${id}`);
                            res.status(500).send({ 
                                message: `errore in aggiornamnto riga commanda ${err} --  `,
                                rc: 'ko',
                                data:null
                            });  
                            return;
                       }
                        console.log(err,`----- aggiornato riga commanda id: ${id}`);
                        res.status(200).send({ 
                            message: `riga commanda aggiornata regolarmente   `,
                            rc: 'ok',
                            data:result
                            });
                        });  
                  });  
                }  
                else {
                    console.log(`----- inesistente commanda id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  
*/

}  
// metodo 1  -- da sistemare

exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica commanda id ${id}`);  // visualizzo la struttura dei campi immessi dall'commanda 

  // definisco la strsql per lettura commanda

    let strsql_Inqu = `select * from commandas where id= ${id} `;
    
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
            notecommanda: req.body.notecommanda,
            id_commande_operation: req.body.id_commande_operation,
          




       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura commandas for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura commandas for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE commandas SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento commanda id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto commanda ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `commanda aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente commanda id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione righe commanda   
// ok
exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione riga commanda id ${id}`);  // visualizzo la struttura dei campi immessi dall'commanda 

    // definisco la strsql per lettura commanda

    let strsql_Inqu = `select * from commandarigas where id= ${id} `;

    let strsql =  `delete from commandarigas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura commandas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione riga commanda id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione riga commanda -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `commanda  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente riga commanda id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna riga commanda presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

// ok
exports.deleteAll = (req,res)=> {
    
    let strsql = '';

    console.log('backend -----------------------------  deleteAll ');
      
    strsql =  ' delete from `commandarigas` ';  
    console.log(`strsql:  ${strsql} `);
  
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore cancellazione tutte le righe commande - erro: ${err}`,
                data:null
            });
            return;
        }
       
        console.log('cancellate tutta la tabella commandarigas ' + result.length); 
        res.status(200).send({ 
                message: `cancellate tutte le righe commande  !! `,
                rc: 'kk',
                data:null
            });                    
        });

}

// ------ 
exports.getCommanderighedaLavorare = (req,res)=> {
 

    let competenza = req.params.comp;
    let flag_lavorazione = req.params.flagl; 
    const strsql = strSql + ' where `commandarigas`.`competenza` = ' + competenza + ' and  `commandarigas`.`flag_lavorazione` = '  + flag_lavorazione;

    console.log('backend - getCommanderighedaLavorare- strsql --> ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all righe commande - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le righe commande da lavorare' + result.length);  

            console.log(`rilevate ${result.length} righe commande da lavorare`)
            res.status(200).send({ 
                message:'Situazione attuale righe commande da lavorare',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna riga commanda da lavorare presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna riga commanda da lavorare presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// ------ 
exports.getProdottiCucinadaConsegnare = (req,res)=> {
 

    let competenza = req.params.comp;
    let flag_lavorazione = req.params.flagl;
    let flag_consegna = req.params.flagc;
    const strsql = strSql + ' where `commandarigas`.`competenza` = ' + competenza + ' and  `commandarigas`.`flag_lavorazione` = '  + flag_lavorazione + ' and  `commandarigas`.`flag_consegna` = '  + flag_consegna;

    console.log('backend - getProdottiCucinadaConsegnare- strsql --> ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all righe commande cucina da Consegnare - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le righe commande cucina da consegnare' + result.length);  

            console.log(`rilevate ${result.length} righe commande cucina da consegnare`)
            res.status(200).send({ 
                message:'Situazione attuale righe commande cucina da consegnare',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna riga commanda cucina da consegnare presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna riga commanda cucina da consegnare presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// ------ 
exports.getProdottiBevandedaConsegnare = (req,res)=> {
 

    let competenza = req.params.comp;
    let flag_consegna = req.params.flagc;
    const strsql = strSql + ' where `commandarigas`.`competenza` = ' + competenza + ' and  `commandarigas`.`flag_consegna` = '  + flag_consegna;

    console.log('backend - getProdottiBevandedaConsegnare- strsql --> ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all righe commande bevande da consegnare - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le righe commande bevande da consegnare' + result.length);  

            console.log(`rilevate ${result.length} righe commande bevande da consegnare`)
            res.status(200).send({ 
                message:'Situazione attuale righe commande benvande da consegnare',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna riga commanda bevande da consegnare presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna riga commanda bevande da consegnare presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getProdottibytipologiaeStato = (req,res)=> {
 

    let tipologia = req.params.tipologia;
    let stato = req.params.stato;
    let order = req.params.order;
    
    if(order === '*') {
        sort = ' order by `commandarigas`.`idCommanda` asc';
    }
    if(order === 'P') {
        sort = ' order by `commandarigas`.`descrizione_prodotto` asc';
    }

    const strSql = "select `commandarigas`.*, `t_stato_rigacommandas`.`d_stato_riga_commanda`, `t_stato_lavoraziones`.`d_stato_lavorazione`, `t_stato_consegnas`.`d_stato_consegna`  from `commandarigas` " + 
                    " inner join `commandas` ON `commandas`.`id` = `commandarigas`.`idCommanda` "  +
                    " inner join `t_stato_rigacommandas` ON `t_stato_rigacommandas`.`id` = `commandarigas`.`stato` " +
                    " inner join `t_stato_lavoraziones` ON `t_stato_lavoraziones`.`id` = `commandarigas`.`flag_lavorazione` " +           
                    " inner join `t_stato_consegnas` ON `t_stato_consegnas`.`id` = `commandarigas`.`flag_consegna` " 

    const strsql = strSql + ' where `commandarigas`.`tipologia` = ' + tipologia + ' and  `commandarigas`.`stato` = '  + stato  + sort;

    console.log('backend - getProdottibytipologiaeStato- strsql --> ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all righe commande per tipologia e stato - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le righe commande  per tipologia e stato' + result.length);  

            console.log(`rilevate ${result.length} righe commande  per tipologia e stato`)
            res.status(200).send({ 
                message:'Situazione attuale righe commande  per tipologia e stato',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna riga commanda  per tipologia e stato presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna riga commanda  per tipologia e stato presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getProdottibyprodottoeStato = (req,res)=> {
    let idProdotto = req.params.id;
    let stato = req.params.stato;
  
    const strsql = strSql + ' where `commandarigas`.`idProdotto` = ' + idProdotto + ' and  `commandarigas`.`stato` = '  + stato;

    console.log('backend - getProdottibyprodottoeStato ---------  strsql --> ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all righe commande per prodotto e stato - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le righe commande  per prodotto e stato' + result.length);  

            console.log(`rilevate ${result.length} righe commande  per prodotto e stato`)
            res.status(200).send({ 
                message:'Situazione attuale righe commande  per prodotto e stato',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna riga commanda  per prodotto e stato presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna riga commanda  per prodotto e stato presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getAllProdottibytipologia = (req,res)=> {
   
    let tipologia = req.params.tipologia;
    let order = req.params.order;
    let sort = '';
   
    if(order === '*') {
        sort = ' order by `commandarigas`.`idCommanda` asc';
    }
    if(order === 'P') {
        sort = ' order by `commandarigas`.`descrizione_prodotto` asc';
    }
    
    const strsql = strSql + ' where `prodottos`.`tipologia` = ' + tipologia  + sort;; 

    console.log('backend - getAllProdottibytipologia ----  strsql --> ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all righe commande per tipologia - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le righe commande  per tipologia' + result.length);  

            console.log(`rilevate ${result.length} righe commande  per tipologia`)
            res.status(200).send({ 
                message:'Situazione attuale righe commande  per tipologia',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna riga commanda  per tipologia presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna riga commanda  per tipologia presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getAllProdottibyprodotto = (req,res)=> {
    let idProdotto = req.params.id;
      
    const strsql = strSql + ' where `commandarigas`.`idProdotto` = ' + idProdotto;

    console.log('backend - getAllProdottibyprodotto ---------  strsql --> ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all righe commande per prodotto --- erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le righe commande  per prodotto' + result.length);  

            console.log(`rilevate ${result.length} righe commande  per prodotto`)
            res.status(200).send({ 
                message:'Situazione attuale righe commande  per prodotto',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna riga commanda  per prodotto presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna riga commanda  per prodotto presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}


exports.getProdbyCommanda = (req,res)=> {
    let idCommanda = req.params.id;
      
    const strsql = strSql + ' where `commandarigas`.`idCommanda` = ' + idCommanda;

    console.log('backend - getProdbyCommanda ---------  strsql --> ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all righe per commanda --- erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le righe per commanda' + result.length);  

            console.log(`rilevate ${result.length} righe commande  per commanda`)
            res.status(200).send({ 
                message:'Situazione attuale righe per commanda',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna riga presente per la commanda ' + result.length); 

            res.status(200).send({ 
                message: `nessuna riga presente per la commanda `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getCountbyprodotto = (req,res)=> {

    console.log('backend -----------------------------  getCountbyprodotto ' + JSON.stringify(req.params));
    
    let id = req.params.id;
    let comp = req.params.comp;
    let totale = 0;
    let dacucinare = 0;
    let daconsegnare = 0;
    let consegnate = 0;

    let statodc = 0;
    let statoco = 1;
    let statoev = 2;

    let numPr = 0;
    let numdc = 0;
    let numco = 0;
    let numev = 0;

    let idprod = 0;
    let descprod = '';

    let strsql = 'SELECT COUNT(id) as numPr, idProdotto, descrizione_prodotto from  `commandarigas` where `commandarigas`.`idProdotto` = ' + id;
    let strsql1 = 'SELECT COUNT(id) as numdc from  `commandarigas` where `commandarigas`.`idProdotto` = ' + id + ' and `commandarigas`.`stato` = ' + statodc;
    let strsql2 = 'SELECT COUNT(id) as numco from  `commandarigas` where `commandarigas`.`idProdotto` = ' + id + ' and `commandarigas`.`stato` = ' + statoco;
    let strsql3 = 'SELECT COUNT(id) as numev from  `commandarigas` where `commandarigas`.`idProdotto` = ' + id + ' and `commandarigas`.`stato` = ' + statoev;
   
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT commandas.*, t_ruolos.d_ruolo FROM commandas INNER JOIN t_ruolos ON t_ruolos.id = commandas.idRuolo WHERE commandas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
            res.status(500).JSON.send({
                 message: `3xwq errore in lettura conteggi all commandarigas per prodotto - erro: ${err.JSON}`,
                 data:null
             });
             return;
         }
         if(result.length>0) {
            totale = result[0].numPr;
            if(totale == 0) {
                console.log('--------------   per id ' + id + ' non trovati movimenti ');
                res.status(200).send({ 
                    message:'prodotto non movimentato',
                    rc: 'ko',
                    idprod:id,
                    descprod:result[0].descrizione_prodotto,
                    totale:0,
                    dacucinare:0,
                    daconsegnare:0,
                    consegnate:0
                 });
                return;
            }
            idprod = result[0].idProdotto;
            descprod = result[0].descrizione_prodotto;
            console.log('trovati totali: ' + totale + ' -- descrizione: ' + descprod + ' id: ' + idprod);
            if(comp == 1) {
                db.query(strsql1,(err,result)=> {
                    if(err) {
                        res.status(500).send({
                            message: `3xwq errore in lettura conteggi all commandarigas per prodotto da cucinare - erro: ${err}`,
                            data:null
                        });
                        return;
                    } 
                    if(result.length>0) {
                        dacucinare = result[0].numdc;
        //                console.log('trovati da Cucinare: ' + dacucinare);
                    }
                 });
            }
            db.query(strsql2,(err,result)=> {
                if(err) {
                   res.status(500).send({
                        message: `3acr errore in lettura conteggi all commandarigas per prodotto da consegnare - erro: ${err}`,
                        data:null
                    });
                    return;
                } 
                if(result.length>0) {
                    daconsegnare = result[0].numco;
          //          console.log('trovati da consegnare: ' + daconsegnare);
                } 
            });
            db.query(strsql3,(err,result)=> {
                if(err) {
                   res.status(500).send({
                        message: `3rew errore in lettura conteggi all commandarigas per prodotto  consegnato - erro: ${err}`,
                        data:null
                    });
                    return;
                } 
                if(result.length>0) {
                   consegnate = result[0].numev;
     //              console.log('trovati consegnati: ' + consegnate);
                }
                if(comp == 1) {
                    res.status(200).send({ 
                        message:'Situazione attuale totali per prodotto ',
                        rc: 'ok',
                        idprod,
                        descprod,
                        totale,
                        dacucinare,
                        daconsegnare,
                        consegnate

                     

                    });                   
                }
                if(comp == 2) {
                    res.status(200).send({ 
                        message:'Situazione attuale totali per prodotto ',
                        rc: 'ok',
                        idprod,
                        descprod,
                        totale,
                        daconsegnare,
                        consegnate
                     });                   
                } 
            });
        } else {
            console.log('nessuna riga presente per il prodotto ' + id); 

            res.status(200).send({ 
                    message: `nessunaa commanda presente !! `,
                    rc: 'nf',
                    data:null,
                    idprod,
                    descprod,
                    totale,
                    dacucinare,
                    daconsegnare,
                    consegnate
                });                        
        }
   
  });

}



exports.getrighebyCommandaeCompetenza = (req,res)=> {
    let idCommanda = req.params.id;
    let comp = req.params.comp;
    let fase = req.params.fase;

    let strsql = '';
    if(fase === 'Cu')  {
        strsql = strSql + ' where `commandarigas`.`idCommanda` = ' + idCommanda + ' and `commandarigas`.`competenza` = ' + comp;
     }
     if(fase === 'Co')  {
        strsql = strSql + ' where `commandarigas`.`idCommanda` = ' + idCommanda + ' and `commandarigas`.`competenza` = ' + comp + ' and `commandarigas`.`flag_lavorazione` = 1';
     }    

    console.log('backend - getrighebyCommandaeCompetenza ---------  strsql --> ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3gt errore in lettura all righe per commanda e competenza --- erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le righe per commanda e competenza' + result.length);  

            console.log(`rilevate ${result.length} righe per commanda e competenza`)
            res.status(200).send({ 
                message:'Situazione attuale righe per commanda',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna riga presente per la commanda ' + result.length); 

            res.status(200).send({ 
                message: `nessuna riga presente per la commanda `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}


exports.getprodottibyStrsql = (req,res)=> {
  
    let strsql = req.params.strsql;;
    
    console.log('backend - getprodottibyStrsql ---------  strsql --> ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3gt errore in lettura all righe da strsql --- erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le righe da strsql' + result.length);  

            console.log(`rilevate ${result.length} righe da strsql`)
            res.status(200).send({ 
                message:'Situazione attuale righe ',
                rc: 'ok',
                number: result.length,
                data:result
            });                    
        }else {
            console.log('nessuna record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna record presente `,
                rc: 'nf',
                number: 0,
                data:null
            });                    
        }

    });
}



/*
https://github.com/rkloecker/node-mysql-albums-CRUD-app/blob/master/controllers/albumController.js  <---
https://github.com/sutin1234/nodejs-mysql-async-await/blob/master/modules/ProductModule.js
https://github.com/omarpecos/api-node-apm/blob/master/src/controllers/apm.controller.js  <-- 2
 
 exports.getProdbyCommandaErnesto  = async (req,res)=> {

    try {
        let idCommanda = req.params.id;
        const strsql = strSql + ' where `commandarigas`.`idCommanda` = ' + idCommanda;
        await  db.query(strsql,(err,result)=> {

            if(result.length>0) {
                console.log('lettura tutte le righe per commanda' + result.length);  
    
                console.log(`rilevate ${result.length} righe commande  per commanda`)
                res.status(200).send({ 
                    message:'Situazione attuale righe per commanda',
                    number:  result.length,
                    rc: 'ok',
                    data:result
                });                    
            }else {
                console.log('nessuna riga presente per la commanda ' + result.length); 
    
                res.status(200).send({ 
                    message: `nessuna riga presente per la commanda `,
                    rc: 'nf',
                    data:null
                });                    
            }
        }
        
      } catch (error) {
      
        res.status(500).send({
            message: `3 errore in lettura all righe per commanda --- erro: ${err}`,
            data:null
        });
        return;
      }
   }
}      
          
 
        





      
        


        

    

*/





/*
      metodi da inserire


   exports.getCommandeforGiornataFiltro = (req,res)=> {
 
    console.log('backend -----------------------------  getCommandeforGiornataFiltro ' + req.params.id + ' stato ' + req.params.stato);
    let id = req.params.id;
    let stato = req.params.stato;
    let strsql = '';

    strsql =  strSql + " where `commandas`.`idGiornata` = " + id + "  and `commandas`.`stato` = " + stato + order; 

    console.log('getCommandeforGiornataFiltro - strsql: ' + strsql);

   // let strsql = 'SELECT commandas.*, t_ruolos.d_ruolo FROM commandas INNER JOIN t_ruolos ON t_ruolos.id = commandas.idRuolo WHERE commandas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura  commandas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti  commande con selezione stato' + result.length);  

            console.log(`rilevati ${result.length} commande `)
            res.status(200).send({ 
                message:'Situazione attuale commande con selezione stato: ' + stato,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna commanda presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

      
// ok
exports.getCommandeforGiornata = (req,res)=> {

    console.log('backend -----------------------------  getCommandeforGiornata ' + req.params.id);
    
    let id = req.params.id;
    let strsql = '';

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `commandas`.`idGiornata` = ' + id +  order;;  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT commandas.*, t_ruolos.d_ruolo FROM commandas INNER JOIN t_ruolos ON t_ruolos.id = commandas.idRuolo WHERE commandas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all commandas  per statoBevande - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti i commande per giornata ' + result.length);  

            console.log(`rilevati ${result.length} commande `)
            res.status(200).send({ 
                message:'Situazione attuale commande per giornata ',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessuna record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessunaa commanda presente !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });

}







// ok
exports.getLastCommandaid = (req,res)=> {

    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getLastCommandaid ');
    

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `commandas`.`id` < ' + tappo + ' order by `commandas`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all commandas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('abc - lettura ultimo id' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale ultimo id',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prodotto presente con lo stato richiesto  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}

// ------------ non da errore ma non cancella
exports.deleteAllTrunc = (req,res)=> {
    
    let strsql = '';
    let strsql0 = '';
    let strsql1 = '';

    console.log('backend -----------------------------  deleteAllTrunc ');
      
    strsql =  ' truncate tableName `commandas` ';
    strsql0 = ' SET FOREIGN_KEY_CHECKS=0;';
    strsql1 = ' SET FOREIGN_KEY_CHECKS=1;';
    console.log(`strsql:  ${strsql} `);

  
    db.query(strsql0,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `1x errore svincolo relazioni con commandariga - erro: ${err}`,
                data:null
            });
            return;
        }
    });
   db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `2x errore cancellazione tutte commande - erro: ${err}`,
                data:null
            });
            return;
        } 
    });
        db.query(strsql1,(err,result)=> {
            if(err) {
               res.status(500).send({
                    message: `3x errore riaggancio relazioni con commanderiga - erro: ${err}`,
                    data:null
                });
                return;
            } 
        });          
        console.log('cancellato tutta la tabella commandas ' ); 
        res.status(200).send({ 
                message: `cancellate tutte le commande  !! `,
                rc: 'kk',
                data:null
            });                    
       

}


// -----------------------------------------  richiede commandarighe  ---  da sistemare quando definito model
exports.getCommandeforGiornataeCompetenza = (req,res)=> {
  //  ->where('idGiornata',$id)->where('competenza', '=', $competenza)->where('commandas.stato', '!=', $stato)->distinct()->get(['competenza']);
    
    console.log('backend -----------------------------  getcommandeforstatoBevande ' + req.params.ruolo);
    
    let stato = 4;
    let id = req.params.id;
    let comp = req.params.comp;
    let strsql = '';

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `commandas`.`idGiornata` = ' + id + " and `commandas`.`stato` = " + stato + order;
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT commandas.*, t_ruolos.d_ruolo FROM commandas INNER JOIN t_ruolos ON t_ruolos.id = commandas.idRuolo WHERE commandas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all commandas  per statoContabile - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti i commande per statoContabile ' + result.length);  

            console.log(`rilevati ${result.length} commande `)
            res.status(200).send({ 
                message:'Situazione attuale commande per statoContabile ',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessunaa commanda presente !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}





*/