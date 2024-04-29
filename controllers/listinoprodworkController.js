const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
/*
const strSql = 'select listinoprodworks.* ' +  
               ' from  listinoprodworks  '; 
 */   
  let strSql = "SELECT `listinoprodworks`.*, prodottos.prezzo, `prodottos`.`descrizione` " +
               "FROM `listinoprodworks` " +
               "inner JOIN `prodottos` on `prodottos`.`id` = `listinoprodworks`.`idprodotto` ";
 
const order =  ' order by listinoprodworks.id desc';

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
                message: `3xss errore il lettura all listinoprodworks - erro: ${err}`,
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
    
    let strsql = strSql + ' where `listinoprodworks`.`id` = ' + id;
   
    console.log('backend - listino getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura listinoprodworks for id ' + id);

            res.status(500).send({
                message: `2vvcviuyut errore  lettura listinoprodworks for id ${id}- errore: ${err}`,
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
                number:  0,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo utente   (post)

exports.createNew = (req,res)=> {
      
    console.log('createNew - req.body  ' + JSON.stringify(req.body));


    const strsql1 ="SELECT * FROM `listinoprodworks` WHERE id < 99999 ORDER BY id DESC;";

     // creo le variabili dai campi di inputù
     let id = req.body.id;
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
     let pz = req.body.pz;
     let photo = req.body.photo;
     let qtadisp = req.body.qtadisp;
     let smin = req.body.smin;
     let qtavend = req.body.qtavend;
     let qtapren = req.body.qtapren;
     let key_utenti_operation = req.body.key_utenti_operation;
    

       let strsql =  `insert into listinoprodworks
                  (id,idlistino,stato,amenu,idprodotto,descrizione,tipologia,categoria,competenza,qta,prezzo,photo,qtadisp,smin,qtavend,qtapren,key_utenti_operation,pz) 
                  valueS
                  (
                    ${id}, ${idlistino},${stato}, UPPER('${amenu}'),${idprodotto}, UPPER('${descrizione}'),${tipologia},${categoria},${competenza},${qta},${prezzo},'${photo}',${qtadisp},${smin},${qtavend},${qtapren},${key_utenti_operation},${pz} 
                  )`;
      console.log('insert - strsql: ' + strsql);
     
     // console.log('nuovo eventoPosto ------ strsql: ' + strsql);          
     db.query(strsql,(err,result) => {
         if(err) {
            console.log(err,'errore in registrazione nuova listino su tabella listinoprodworks ');
            res.status(500).send({
              message: `errore in registrazione nuova listino su tabella listinoprodworks - errore: ${err}`,
              data:null
           });
           return;
         }
       
         
         db.query(strsql1,(err,result) => {
           if(err) {
                        console.log(err,'errore in lettura ultima manigfestazione  su tabella listinoprodworks ');
                        res.status(500).send({
                        message: `errore in lettura ultima listino su tabella listinoprodworks - errore: ${err}`,
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

    let strsql_Inqu = `select * from listinoprodworks where id= ${id} `;

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
    let pz = req.body.pz;
    let photo = req.body.photo;
    let qtadisp = req.body.qtadisp;
    let smin = req.body.smin;
    let qtavend = req.body.qtavend;
    let qtapren = req.body.qtapren;
    let key_utenti_operation = req.body.key_utenti_operation;
        
    let strsql =  `update listinoprodworks set
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
                    pz = ${pz},
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
            console.log(err,'4 errore il lettura listinoprodworks for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura listinoprodworks for id ${id} - errore: ${err}`,
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

    let strsql_Inqu = `select * from listinoprodworks where id= ${id} `;
    
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
                  db.query('UPDATE listinoprodworks SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
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

    let strsql_Inqu = `select * from listinoprodworks where id= ${id} `;

    let strsql =  `delete from listinoprodworks  where id = ${id}`;
 
     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura listinoprodworks for id ${id} - errore: ${err}`,
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
    const stato = 1;  // attivo 
    let strsql = strSql + ' where `listinoprodworks`.`idlistino` = ' + id;

    console.log('backend - listino getallProdbylistino - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura listinoprods for idlistino  ' + id);

            res.status(500).send({
                message: `2vvcvdef errore  lettura listinoprods for idlistino ${id}- errore: ${err}`,
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
                number:  0,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getallProdbylistinoamenu = (req,res)=> {
 
    const stato = 1;  // attivo 
 
    const id = req.params.id;
    const sel = req.params.sel;
    const selS = 'S';
    let strsql_where = '';

    if(sel == 'S') {
        strsql_where =  " where `listinoprodworks`.`idlistino` = " + id + " and `listinoprodworks`.`amenu` = '" + sel + "'"; 
    }
    if(sel == 'N') {
        strsql_where =  " where `listinoprodworks`.`idlistino` = " + id + " and `listinoprodworks`.`amenu` != '" + selS + "'"; 
    }

    // let strsql = strSql + " where `listinoprodworks`.`idlistino` = " + id + " and `listinoprodworks`.`amenu` = '" + sel + "'";

    let strsql = strSql + strsql_where;
   
    console.log('backend - listino getallProdbylistinoamenu - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura listinoprods for idlistino ' + id + ' e a menu ' + sel);

            res.status(500).send({
                message: `2vvcvhyyy errore  lettura listinoprods for idlistino ${id}  e a menu ${sel} - errore: ${err}`,
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
                number:  0,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getallProdbylistibytipo = (req,res)=> {
 
    const stato = 1;  // attivo 
 
    const id = req.params.id;
    const tipologia = req.params.tipologia;

    let strSql = "SELECT `listinoprodworks`.*, prodottos.prezzo, `prodottos`.`descrizione` " +
                 "FROM `listinoprodworks` " +
                 "inner JOIN `prodottos` on `prodottos`.`id` = `listinoprodworks`.`idprodotto` ";
   
    let strsql = strSql + " where `listinoprodworks`.`idlistino` = " + id + " and `listinoprodworks`.`tipologia` = " + tipologia;
   
    console.log('backend - listino getallProdbylistibytipo - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura listinoprods for idlistino ' + id + ' e tipologia ' + tipologia);

            res.status(500).send({
                message: `2vvcvghi errore  lettura listinoprods for idlistino ${id}  e tipologia ${tipologia} - errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  -------------prodotti per listino  ${id} e tipologia ${tipologia}` )

            res.status(200).send({ 
                message:`situazione attuale prodotti per idprod: .....  ${id} e tipologia ${tipologia}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per idprod: ${id} e tipologia ${tipologia}`);
            res.status(200).send({
                message: `nessun prodotto for listinowork: ${id} e  tipologia ${tipologia}`,
                number:  0,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getallProdattivibylistino = (req,res)=> {
 
    const id = req.params.id;
    const stato = 1;  // attivo 

    let strSql = "SELECT `listinoprodworks`.*, prodottos.prezzo, `prodottos`.`descrizione` " +
                "FROM `listinoprodworks` " +
                "inner JOIN `prodottos` on `prodottos`.`id` = `listinoprodworks`.`idprodotto` " +
                "inner JOIN `t_tipologias` on `t_tipologias`.`id` = `listinoprodworks`.`tipologia` ";

    let strsql = strSql + ' where `listinoprodworks`.`idlistino` = ' + id + ' and `t_tipologias`.`stato` = ' + stato;

    console.log('backend - listino getallProdbylistino - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura listinoprods for idlistino  ' + id);

            res.status(500).send({
                message: `2vvcvdef errore  lettura listinoprods for idlistino ${id}- errore: ${err}`,
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
                number:  0,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getCountbyameenu = (req,res)=> {

    console.log('backend -----------------------------  getCountbyprodotto ' + JSON.stringify(req.params));
    
    let id = req.params.id;
    let amenu  = 'S';
    let amenuN  = 'N';
    let num = 0;
    let totaleS = 0;
    let totaleN = 0;  
    let result1   

    let strsql = "SELECT COUNT(id) as numPrS from  `listinoprodworks` where `listinoprodworks`.`idlistino` = " + id + " and `listinoprodworks`.`amenu` = '" + amenu + "'";
    let strsql1 = "SELECT COUNT(id) as numPrN from  `listinoprodworks` where `listinoprodworks`.`idlistino` = " + id + " and `listinoprodworks`.`amenu` = '" + amenuN + "'";

    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT commandas.*, t_ruolos.d_ruolo FROM commandas INNER JOIN t_ruolos ON t_ruolos.id = commandas.idRuolo WHERE commandas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
            res.status(500).send({
                 message: `3xwq errore in lettura conteggi prodotti a menu - erro: ${err.JSON}`,
                 data:null
             });
             return;
         }
         if(result.length>0) {
            totaleS = result[0].numPrS;
            if(totaleS == 0) {
                console.log('--------------   per id ' + id + ' non trovati movimenti ');
                res.status(200).send({ 
                    message:'prodotto non movimentato',
                    rc: 'ko',
                    id:id,
                    num:0                  
                 });
                return;
            }
            /*
            if(totale > 0) {
                res.status(200).send({ 
                    message: `presentiprodotti a menu !! `,
                    rc: 'ok',
                    nums: totale
                });                     
            } */
        
        } else {
            console.log('nessuna riga presente per il prodotto ' + id); 

            res.status(200).send({ 
                    message: `nessunaa commanda presente !! `,
                    rc: 'nf',
                    num: totale
               
                });                        
        }
   
  });

  db.query(strsql1,(err,result)=> {
    if(err) {
        res.status(500).send({
             message: `3xwq errore in lettura conteggi prodotti a menu - erro: ${err.JSON}`,
             data:null
         });
         return;
     }
     if(result.length>0) {
        totaleN = result[0].numPrN;
        res.status(200).send({ 
                message: `presentiprodotti a menu !! `,
                rc: 'ok',
                nums: totaleS,
                numn: totaleN
            });                     
       
    
    } else {
        console.log('nessuna riga presente per il prodotto ' + id); 

        res.status(200).send({ 
                message: `nessunaa commanda presente !! `,
                rc: 'nf',
                nums: totales,
                numn: totaleN
            });                        
    }

});




}

exports.getCountbyameenu_OK = (req,res)=> {

    console.log('backend -----------------------------  getCountbyprodotto ' + JSON.stringify(req.params));
    
    let id = req.params.id;
    let amenu  = 'S';
    let amenuN  = 'N';
    let num = 0;
    let totale = 0; 
    let result1   

    let strsql = "SELECT COUNT(id) as numPrS from  `listinoprodworks` where `listinoprodworks`.`idlistino` = " + id + " and `listinoprodworks`.`amenu` = '" + amenu + "'";
    let strsql1 = "SELECT COUNT(id) as numPrN from  `listinoprodworks` where `listinoprodworks`.`idlistino` = " + id + " and `listinoprodworks`.`amenu` = '" + amenuN + "'";



    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT commandas.*, t_ruolos.d_ruolo FROM commandas INNER JOIN t_ruolos ON t_ruolos.id = commandas.idRuolo WHERE commandas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
            res.status(500).send({
                 message: `3xwq errore in lettura conteggi prodotti a menu - erro: ${err.JSON}`,
                 data:null
             });
             return;
         }
         if(result.length>0) {
            totale = result[0].numPrS;
            if(totale == 0) {
                console.log('--------------   per id ' + id + ' non trovati movimenti ');
                res.status(200).send({ 
                    message:'prodotto non movimentato',
                    rc: 'ko',
                    id:id,
                    num:0                  
                 });
                return;
            }
            if(totale > 0) {
                res.status(200).send({ 
                    message: `presentiprodotti a menu !! `,
                    rc: 'ok',
                    nums: totale
                });                     
            }
        
        } else {
            console.log('nessuna riga presente per il prodotto ' + id); 

            res.status(200).send({ 
                    message: `nessunaa commanda presente !! `,
                    rc: 'nf',
                    num: totale
               
                });                        
        }
   
  });

}

exports.deleteAll = (req,res)=> {  

    console.log('backend ----  cancellazione globale listinoprodwrok.deleteAll ')

    // definisco la strsql per lettura utente
  
    let strsql =  `delete from listinoprodworks`;
 
     db.query(strsql,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura listinoprodworks for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        res.status(200).send({ 
            message: `prodotti del listinowork  cancellati regolarmente  `,
            rc: 'ok',
            data:null
        }); 
     });  

}  

exports.getProdottiordinati = (req,res)=> {
 
    let strSql = "SELECT `listinoprodworks`.*, prodottos.prezzo, `prodottos`.`descrizione` " +
                "FROM `listinoprodworks` " +
                "inner JOIN `prodottos` on `prodottos`.`id` = `listinoprodworks`.`idprodotto` " +
                "inner JOIN `t_tipologias` on `t_tipologias`.`id` = `listinoprodworks`.`tipologia` ";

    let strsql = strSql + ' where `listinoprodworks`.`qta` > 0 ';

    console.log('backend - listino getProdottiOrdinati - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura listinoprods prodotti ordinati ' );

            res.status(500).send({
                message: `2vvcvdef errore  lettura listinoprods for prodotti ordinati`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  -------------prodotti ordinati  ` )

            res.status(200).send({ 
                message:`situazione attuale prodotti ordinati`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun prodotto ordinato `);
            res.status(200).send({
                message: `nessun prodotto ordinato`,
                number:  0,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getallProdbylistbytipologiabyamenu = (req,res)=> {
 
    const stato = 1;  // attivo 
 
    const id = req.params.id;
    const tipologia = req.params.tipologia;
    const amenu = req.params.amenu;

    let strSql = "SELECT `listinoprodworks`.*, prodottos.prezzo, `prodottos`.`descrizione` " +
                 "FROM `listinoprodworks` " +
                 "inner JOIN `prodottos` on `prodottos`.`id` = `listinoprodworks`.`idprodotto` ";
   
    let strsql = strSql + " where `listinoprodworks`.`idlistino` = " + id + " and `listinoprodworks`.`tipologia` = " + tipologia + " and `listinoprodworks`.`amenu` = '" + amenu + "' ";
   
    console.log('backend - listino getallProdbylistibytipo - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura listinoprods for idlistino ' + id + ' e tipologia ' + tipologia + ' e amenu ' + amenu);

            res.status(500).send({
                message: `2vvcvghi errore  lettura listinoprods for idlistino ${id}  e tipologia ${tipologia}   e amenu ${amenu}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  -------------prodotti per listino  ${id} e tipologia ${tipologia} e amenu ${amenu}` )

            res.status(200).send({ 
                message:`situazione attuale prodotti per idprod: .....  ${id} e tipologia ${tipologia} e amenu ${amenu}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per idprod: ${id} e tipologia ${tipologia} e amenu ${amenu}`);
            res.status(200).send({
                message: `nessun prodotto for listinowork: ${id} e  tipologia ${tipologia} e amenu ${amenu}`,
                number:  0,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// lettura per codice prodotto
exports.getbyidProdotto = (req,res)=> {
 
    const idProdotto = req.params.idProdotto;
    
    let strsql = strSql + ' where `listinoprodworks`.`idprodotto` = ' + idProdotto;
   
    console.log('backend - listino getbyidProdotto - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore lettura listinoprodworks for idProdotto ' + idProdotto);

            res.status(500).send({
                message: `2vvcviuyut errore  lettura listinoprodworks for idProdotto ${idProdotto}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------   Prodotto `)

            res.status(200).send({ 
                message:`situazione attuale per prodotto idProdotto: .....  ${idProdotto}`,
                number:  result.length,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per idProdotto: ${idProdotto} `);
            res.status(200).send({
                message: `nessun user pressente for idProdotto: ${idProdotto}`,
                number:  0,
                rc: 'nf',
                data:null
            });
        }

    });  
}
