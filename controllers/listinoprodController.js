const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = 'select listinoprods.* ' +  
               ' from  listinoprods  '; 
            
const order =  ' order by listinoprods.id desc';

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
                message: `3xss errore il lettura all listinoprods - erro: ${err}`,
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
    
    let strsql = strSql + ' where `listinoprods`.`id` = ' + id;
   
    console.log('backend - listino getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura listinoprods for id ' + id);

            res.status(500).send({
                message: `2vvcv errore  lettura listinoprods for id ${id}- errore: ${err}`,
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
      
    const strsql1 ="SELECT * FROM `listinoprods` WHERE id < 99999 ORDER BY id DESC;";

    console.log('backend -- listinoprod --- create ----- req.body ' + JSON.stringify(req.body))



     // creo le variabili dai campi di input
     let idlistino = req.body.idlistino;
     let stato = req.body.stato;
     let amenu = req.body.amenu;
     let idprodotto = req.body.idprodotto;
     let descrizione = req.body.descrizione;
     let tipologia = req.body.tipologia;
     let categoria = req.body.categoria;
     let competenza = req.body.competenza;
     let qta = req.body.qta;
     let prezzo = req.body.prezzo;
     let photo = req.body.photo;
     let qtadisp = req.body.qtadisp;
     let smin = req.body.smin;
     let qtavend = req.body.qtavend;
     let qtapren = req.body.qtapren;
     let key_utenti_operation = req.body.key_utenti_operation;

     let strsql =  `insert into listinoprods
                     (idlistino,stato,amenu,idprodotto,descrizione,tipologia,categoria,competenza,qta,prezzo,photo,qtadisp,smin,qtavend,qtapren,key_utenti_operation) 
                     valueS
                     (
                       ${idlistino},${stato}, UPPER('${amenu}'),${idprodotto}, UPPER('${descrizione}'),${tipologia},${categoria},${competenza},${qta},${prezzo},'${photo}',${qtadisp},${smin},${qtavend},${qtapren},${key_utenti_operation} 
                     )`;
      console.log('insert - strsql: ' + strsql);
     
     // console.log('nuovo eventoPosto ------ strsql: ' + strsql);          
     db.query(strsql,(err,result) => {
         if(err) {
            console.log(err,'errore in registrazione nuova listino su tabella listinoprods ');
            res.status(500).send({
              message: `errore in registrazione nuova listino su tabella listinoprods - errore: ${err}`,
              data:null
           });
           return;
         }
         
         db.query(strsql1,(err,result) => {
           if(err) {
                        console.log(err,'errore in lettura ultima manigfestazione  su tabella listinoprods ');
                        res.status(500).send({
                        message: `errore in lettura ultima listino su tabella listinoprods - errore: ${err}`,
                        rc: 'kk',
                        data:null
             });
             return;
           }
           res.status(200).send({
                message: `listino inserita regolarmente`,
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

    let strsql_Inqu = `select * from listinoprods where id= ${id} `;

    let idlistino = req.body.idlistino;
    let stato = req.body.stato;
    let amenu = req.body.amenu;
    let idprodotto = req.body.idprodotto;
    let descrizione = req.body.descrizione;
    let tipologia = req.body.tipologia;
    let categoria = req.body.categoria;
    let competenza = req.body.competenza;
    let qta = req.body.qta;
    let prezzo = req.body.prezzo;
    let photo = req.body.photo;
    let qtadisp = req.body.qtadisp;
    let smin = req.body.smin;
    let qtavend = req.body.qtavend;
    let qtapren = req.body.qtapren;
    let key_utenti_operation = req.body.key_utenti_operation;
     
    let strsql =  `update listinoprods set
                    idlistino = ${idlistino},
                    stato = ${stato},
                    amenu = UPPER('${amenu}'),
                    idprodotto = ${idprodotto},
                    descrizione = UPPER('${descrizione}'),
                    tipologia = ${tipologia},
                    categoria = ${categoria},
                    competenza = ${competenza},
                    qta = ${qta},
                    prezzo = ${prezzo},
                    photo = '${photo}',
                    qtadisp = ${qtadisp},
                    smin = ${smin},
                    qtavend = ${qtavend},
                    qtapren = ${qtapren},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;
    
                    console.log('bk - --------------  listino ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura listinoprods for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura listinoprods for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento listino id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto listino ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato listino id: ${id}`);
                    res.status(200).send({ 
                        message: `listino aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente listino id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna listino presente for id: ${id}  -- aggiornamento non possibile`,
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

    let strsql_Inqu = `select * from listinoprods where id= ${id} `;
    
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
                  db.query('UPDATE listinoprods SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
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

    console.log('backend ----  listino.delete ' + JSON.stringify(req.params))
    let id = req.params.id;

    console.log(`cancellazione listino id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from listinoprods where id= ${id} `;

    let strsql =  `delete from listinoprods  where id = ${id}`;
 
     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura listinoprods for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione listino id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione listino -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `listino  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente listino id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna manifetsazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

// lettura singola listino
exports.getallProdbylistino = (req,res)=> {
 
    const id = req.params.id;
    
    let strsql = strSql + ' where `listinoprods`.`idlistino` = ' + id;
   
    console.log('backend - listino getallProdbylistino - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura listinoprods for idlistino  ' + id);

            res.status(500).send({
                message: `2vvcv errore  lettura listinoprods for idlistino ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  -------------prodotti per idprod  ${id}` )

            res.status(200).send({ 
                message:`situazione attuale prodotti per idprod: .....  ${id}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per idprod: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for idprod: ${id}`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}


exports.getallProdbylistinoamenu = (req,res)=> {
 
    const id = req.params.id;
    const sel = req.params.sel;
    
    let strsql = strSql + " where `listinoprods`.`idlistino` = " + id + " and amenu = '" + sel + "'";
   
    console.log('backend - listino getallProdbylistinoamenu - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura listinoprods for idlistino ' + id + ' e a menu ' + sel);

            res.status(500).send({
                message: `2vvcv errore  lettura listinoprods for idlistino ${id}  e a menu ${sel} - errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  -------------prodotti per listino  ${id} e a listino ${sel}` )

            res.status(200).send({ 
                message:`situazione attuale prodotti per idprod: .....  ${id} e a listino ${sel}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per idprod: ${id} e a listino ${sel}`);
            res.status(200).send({
                message: `nessun user pressente for idprod: ${id} e a listino ${sel}`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}


exports.getallProdbystato = (req,res)=> {
 
    const id = req.params.id;
    const stato = req.params.stato;
    
    let strsql = strSql + " where `listinoprods`.`idlistino` = " + id + " and stato = " + stato;
   
    console.log('backend - listino getallProdbystato - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura listinoprods for idlistino ' + id + ' e stato ' + stato);

            res.status(500).send({
                message: `2vvcv errore  lettura listinoprods for idlistino ${id}  e stato ${stato} - errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  -------------prodotti per listino  ${id} e stato ${stato}` )

            res.status(200).send({ 
                message:`situazione attuale prodotti per idprod: .....  ${id} e stato ${stato}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per idprod: ${id} estatoo ${stato}`);
            res.status(200).send({
                message: `nessun user pressente for idprod: ${id} e stato ${stato}`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}