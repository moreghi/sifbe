const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `commandawrigas`.*  from `commandawrigas` ";
              

               // in attesa di capire come ordinare

// const order = " order by `commandawrigas`.`statoBevande`  asc, `commandawrigas`.`statoCucina` asc, `commandawrigas`.`statoContabile` asc  ";
const order = " ";

// ------  ok 
exports.getAll = (req,res)=> {
 
    let idCommanda = req.params.idCommanda;

    let strsql = strSql  + ' where `commandawrigas`.`idCommanda` = ' + idCommanda + order; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all commandewriga - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le commandewriga ' + result.length);  

            console.log(`rilevati ${result.length} commandewriga `)
            res.status(200).send({ 
                message:'Situazione attuale commandewriga',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna commandawriga presente `,
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
      
    const strsql = strSql + ' where `commandawrigas`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from commandawrigas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura commandawrigas for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura commandawrigas for id ${id}- errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   commandewriga `)

            res.status(200).send({ 
                message:`situazione attuale per commanda id: .....  ${id}`,
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

// ------   ok  
exports.getbyidProdotto = (req,res)=> {
    
    let idCommanda = req.params.idCommanda;    
    let idProdotto = req.params.idProdotto;  

    const strsql = strSql + ' where  `commandawrigas`.`idCommanda` =  ' + idCommanda + ' and `commandawrigas`.`idProdotto` = ' + idProdotto;

    console.log('backend - getbyidProdotto - strsql --> ' + strsql);
  
   // let strsql = `select * from commandawrigas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2xa errore il lettura commandawrigas for idProdotto ' + idProdotto);

            res.status(500).send({
                message: `2xa errore il lettura commandawrigas for idProdotto ${idProdotto}- errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   commandewriga `)

            res.status(200).send({ 
                message:`situazione attuale per commanda idProdotto: .....  ${idProdotto}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessuna record presente per id: ${idProdotto} `);
            res.status(200).send({
                message: `nessuna user pressente for id: ${idProdotto}`,
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
     
      let id = req.body.id;
      let idCommanda = req.body.idCommanda;
      let idProdotto = req.body.idProdotto;
      let qta = req.body.qta;
      let descrizione_prodotto = req.body.descrizione_prodotto;
      let categoria = req.body.categoria;
      let competenza = req.body.competenza;
      let tipologia = req.body.tipologia;
      let disponibile_Day = req.body.disponibile_Day;
      let prezzo_day = req.body.prezzo_day;
      let scorta_minima = req.body.scorta_minima;
      let photo = req.body.photo;
           
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  */
  
      let strsql =  `insert into commandawrigas
                  (id,idCommanda,idProdotto,qta,descrizione_prodotto,categoria,competenza,tipologia,disponibile_Day,prezzo_day,scorta_minima,photo) 
                  valueS
                  (
                     ${id},${idCommanda},${idProdotto},${qta},'${descrizione_prodotto}',${categoria},${competenza},${tipologia},${disponibile_Day},${prezzo_day},${scorta_minima}, '${photo}'
                  )`;
              

            console.log



      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova commandawriga su tabella commandawrigas ');
              res.status(500).send({
                message: `errore in registrazione nuova commandawriga su tabella commandawrigas - errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
          }
          console.log(result, `result ...... commandawriga inserita regolarmente `);
          res.status(200).send({
            message: `commandawriga inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento commanda   
  // ok
  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica commandawriga id ${id}`);  // visualizzo la struttura dei campi immessi dall'commanda 

    // definisco la strsql per lettura commanda

    let strsql_Inqu = `select * from commandawrigas where id= ${id} `;

    // definisco le variabili per aggiornamento campi
    
    let idProdotto = req.body.idProdotto;
    let qta = req.body.qta;
    let descrizione_prodotto = req.body.descrizione_prodotto;
    let categoria = req.body.categoria;
    let competenza = req.body.competenza;
    let tipologia = req.body.tipologia;
    let disponibile_Day = req.body.disponibile_Day;
    let prezzo_day = req.body.prezzo_day;
    let scorta_minima = req.body.scorta_minima;
    let photo = req.body.photo;
         
    let strsql =  `update commandawrigas set
                    idProdotto = ${idProdotto},
                    qta = ${qta},
                    descrizione_prodotto = '${descrizione_prodotto}',
                    categoria = ${categoria},
                    competenza = ${competenza},
                    tipologia = ${tipologia},
                    disponibile_Day = ${disponibile_Day},
                    prezzo_day = ${prezzo_day},
                    scorta_minima = ${scorta_minima},  
                    photo = '${photo}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('----commandawriga ------ updateByid --------------------- update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura commandawrigas for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura commandawrigas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,` ----- errore in aggiornamento commanda id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto commandawriga ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(`----- aggiornato commandawriga id: ${id}`);
                    res.status(200).send({ 
                        message: `commandawriga aggiornata riga regolarmente   `,
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
// metodo 1  -- da sistemare

exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica commanda id ${id}`);  // visualizzo la struttura dei campi immessi dall'commanda 

  // definisco la strsql per lettura commanda

    let strsql_Inqu = `select * from commandawrigas where id= ${id} `;
    
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
            id_commandewriga_operation: req.body.id_commandewriga_operation,
    
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura commandawrigas for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura commandawrigas for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE commandawrigas SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
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

// cancellazione commanda   
// ok
exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione commanda id ${id}`);  // visualizzo la struttura dei campi immessi dall'commanda 

    // definisco la strsql per lettura commanda

    let strsql_Inqu = `select * from commandawrigas where id= ${id} `;

    let strsql =  `delete from commandawrigas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura commandawrigas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione commandawriga id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione commandawriga -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `commandawriga  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente commandawriga id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna commandawriga pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getProdottiforTipologia = (req,res)=> {
    
    let tipo = req.params.tipo;
    

    const strsql = strSql + ' where `commandawrigas`.`tipologia` = ' + tipo + ' and `commandawrigas`.`disponibile_Day` > 0';

    console.log('backend - getProdottiforTipologia - strsql --> ' + strsql);
  
   // let strsql = `select * from commandawrigas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura commandawrigas for tipo ' + tipo);

            res.status(500).send({
                message: `2 errore il lettura commandawrigas for tipo ${tipo}- errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   commandewriga `)

            res.status(200).send({ 
                message:`situazione attuale per tipo: .....  ${tipo}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessuna record presente per tipo: ${tipo} `);
            res.status(200).send({
                message: `nessuna riga commandawriga presente for tipo: ${tipo}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getProdottibyTipologiabycomm = (req,res)=> {
    
    let tipo = req.params.tipo;
    let idCommanda = req.params.idcommanda;

    const strsql = strSql + ' where `commandawrigas`.`tipologia` = ' + tipo + ' and `commandawrigas`.`disponibile_Day` > 0 and `commandawrigas`.`idCommanda` = '  + idCommanda;

    console.log('backend - getProdottibyTipologiabycomm - strsql --> ' + strsql);
  
   // let strsql = `select * from commandawrigas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura commandawrigas for id ' + idCommanda);

            res.status(500).send({
                message: `2 errore il lettura commandawrigas for id ${idCommanda}- errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   commandewriga `)

            res.status(200).send({ 
                message:`situazione attuale per commanda id: .....  ${idCommanda}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessuna record presente per id: ${idCommanda} `);
            res.status(200).send({
                message: `nessuna riga commandawriga presente  for id: ${idCommanda}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getProdottiOrdinati = (req,res)=> {
    
  
    let idCommanda = req.params.idcommanda;
   
    const strsql = strSql + ' where `commandawrigas`.`idCommanda` = ' + idCommanda + ' and `commandawrigas`.`qta` > 0' ;

    console.log('backend - getProdottiOrdinati - strsql --> ' + strsql);
  
   // let strsql = `select * from commandawrigas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura commandawrigas for id ' + idCommanda);

            res.status(500).send({
                message: `2 errore il lettura commandawrigas for id ${idCommanda}- errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   commandewriga `)

            res.status(200).send({ 
                message:`situazione attuale per commanda id: .....  ${idCommanda}`,
                rc: 'ok',
                number: result.length,
                data:result
            });                    
        }else {
            console.log(`nessuna record presente per id: ${idCommanda} `);
            res.status(200).send({
                message: `nessuna riga commandawriga presente  for id: ${idCommanda}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


exports.getAllbyCommandaw = (req,res)=> {
    
    let idCommanda = req.params.idCommanda;
      
    const strsql = strSql + ' where `commandawrigas`.`idCommanda` = ' + idCommanda;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from commandawrigas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura commandawrigas for idCommanda ' + idCommanda);

            res.status(500).send({
                message: `2 errore il lettura commandawrigas for id ${idCommanda}- errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   commandewriga `)

            res.status(200).send({ 
                message:`situazione attuale per commanda idCommanda: .....  ${idCommanda}`,
                rc: 'ok',
                number: result.length,
                data:result
            });                    
        }else {
            console.log(`nessuna record presente per idCommanda: ${idCommanda} `);
            res.status(200).send({
                message: `nessuna user pressente for idCommanda: ${idCommanda}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


