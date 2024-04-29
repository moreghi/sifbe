const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `prodottos`.*, `t_categoria_prodottos`.`d_categoria`,`t_tipologias`.`d_tipologia`, `t_competenza_prodottos`.`d_Competenza`, `t_stato_prodottos`.`d_stato_prodotto` from `prodottos` " + 
               " inner join `t_tipologias` ON `t_tipologias`.`id` = `prodottos`.`tipologia` " +
               " inner join `t_stato_prodottos` ON `t_stato_prodottos`.`id` = `prodottos`.`stato` " +
               " inner join `t_categoria_prodottos` ON `t_categoria_prodottos`.`id` = `prodottos`.`categoria` " +
               " inner join `t_competenza_prodottos` ON `t_competenza_prodottos`.`id` = `prodottos`.`competenza` " 
             
const order = " order by `prodottos`.`tipologia`  asc, `prodottos`.`competenza` asc, `prodottos`.`categoria` asc  ";

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
                message: `3xss errore il lettura all prodottos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le prodotti ' + result.length);  

            console.log(`rilevate ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti',
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

// lettura singola Prodotto
exports.getbyid = (req,res)=> {
   
    const id = req.params.id;
    
    let strsql = strSql + ' where `prodottos`.`id` = ' + id;

   
    console.log('backend - Prodotto getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore il lettura prodottos for id ' + id);

            res.status(500).send({
                message: `2vvcv errore il lettura prodottos for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   prodotti `)

            res.status(200).send({ 
                message:`situazione attuale per Prodotto id: .....  ${id}`,
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

// lettura singola Prodotto
exports.getProdottiforStato = (req,res)=> {
    
    const stato = req.params.stato;
    
    let strsql = strSql + ' where `prodottos`.`stato` = ' + stato + order;

    console.log('backend - getbystato - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'3 errore il lettura prodottos for stato' + stato);

            res.status(500).send({
                message: `3 errore il lettura prodottos for stato ${stato}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   prodotti `)

            res.status(200).send({ 
                message:`situazione attuale per Prodotto stato: .....  ${stato}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per stato: ${stato} `);
            res.status(200).send({
                message: `nessuna Prodotto presente per la selezione impostata`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo utente   (post)

exports.createNew = (req,res)=> {
      
    const strsql1 ="SELECT * FROM `prodottos` WHERE id < 99999 ORDER BY id DESC;";

      // creo le variabili dai campi di input
     let descrizione = req.body.descrizione;
     let stato = req.body.stato;
     let tipologia = req.body.tipologia;
     let categoria = req.body.categoria;
     let competenza = req.body.competenza; 
     let disponibile = req.body.disponibile;
     let disponibile_Day = req.body.disponibile_Day;
     let scorta_minima = req.body.scorta_minima;
     let aMenu = req.body.aMenu;
     let prezzo = req.body.prezzo;
     let prezzo_day = req.body.prezzo_day;
     let qta_vendute = req.body.qta_vendute;
     let residuo = req.body.residuo;
     let photo = req.body.photo;
     let selectedDay = req.body.selectedDay;
     let key_utenti_operation = req.body.key_utenti_operation;

       let strsql =  `insert into prodottos
                  (descrizione,stato,tipologia,categoria,competenza,disponibile,disponibile_Day,scorta_minima,aMenu,prezzo,prezzo_day,qta_vendute,residuo,photo,selectedDay,key_utenti_operation) 
                  valueS
                  (
                    UPPER('${descrizione}'),${stato},${tipologia},${categoria},${competenza},${disponibile},${disponibile_Day},${scorta_minima},UPPER('${aMenu}'),${prezzo},${prezzo_day},${qta_vendute},${residuo},'${photo}','${selectedDay}',${key_utenti_operation}   
                  )`;
      console.log('insert - strsql: ' + strsql);
     
     // console.log('nuovo eventoPosto ------ strsql: ' + strsql);          
     db.query(strsql,(err,result) => {
         if(err) {
            console.log(err,'errore in registrazione nuova Prodotto su tabella prodottos ');
            res.status(500).send({
              message: `errore in registrazione nuovo Prodotto su tabella prodottos - errore: ${err}`,
              data:null
           });
           return;
         }
           
         db.query(strsql1,(err,result) => {
           if(err) {
                        console.log(err,'errore in lettura ultimo prodotto su tabella prodottos ');
                        res.status(500).send({
                        message: `errore in lettura ultimo Prodotto su tabella prodottos - errore: ${err}`,
                        rc: 'kk',
                        data:null
             });
             return;
           }
           res.status(200).send({
                message: `Prodotto inserito regolarmente`,
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

    console.log(req.body,` <----------  updatebyId ----------  Modifica Prodotto id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from prodottos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let descrizione = req.body.descrizione;
    let stato = req.body.stato;
    let tipologia = req.body.tipologia;
    let categoria = req.body.categoria;
    let competenza = req.body.competenza; 
    let disponibile = req.body.disponibile;
    let disponibile_Day = req.body.disponibile_Day;
    let scorta_minima = req.body.scorta_minima;
    let aMenu = req.body.aMenu;
    let prezzo = req.body.prezzo;
    let prezzo_day = req.body.prezzo_day;
    let qta_vendute = req.body.qta_vendute;
    let residuo = req.body.residuo;
    let photo = req.body.photo;
    let selectedDay = req.body.selectedDay;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    
    let strsql =  `update prodottos set
                    descrizione = UPPER('${descrizione}'),
                    stato = ${stato},
                    tipologia = ${tipologia},
                    categoria = ${categoria},
                    competenza = ${competenza},
                    disponibile = ${disponibile},
                    disponibile_Day = ${disponibile_Day},
                    scorta_minima = ${scorta_minima},
                    aMenu = UPPER('${aMenu}'),
                    prezzo = ${prezzo},
                    prezzo_day = ${prezzo_day},
                    qta_vendute = ${qta_vendute},
                    residuo = ${residuo},
                    photo = '${photo}',
                    selectedDay = '${selectedDay}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;
    

                    console.log('bk - --------------  Prodotto ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prodottos for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura prodottos for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento Prodotto id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto Prodotto ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato Prodotto id: ${id}`);
                    res.status(200).send({ 
                        message: `Prodotto aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente Prodotto id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna Prodotto presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica Prodotto id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from prodottos where id= ${id} `;
    
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
                  db.query('UPDATE prodottos SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento mamifestazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto Prodotto ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `Prodotto aggiornata regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente Prodotto id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna Prodotto pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione Prodotto

exports.delete = (req,res)=> {  

    console.log('backend ----  prodotto.delete ' + JSON.stringify(req.params))
    let id = req.params.id;

    console.log(`cancellazione Prodotto id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from prodottos where id= ${id} `;

    let strsql =  `delete from prodottos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prodottos for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione Prodotto id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione Prodotto -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `Prodotto  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente Prodotto id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna manifetsazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

// lettura prodotti per competenza
exports.getProdottiforCompetenza = (req,res)=> {
    
    const competenza = req.params.tipo;
    
    strsql = strsql + ' where `prodottos`.`competenza` = ' + competenza;

    console.log('backend - getProdottiforCompetenza - strsql --> ' + strsql);
 
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'3 errore il lettura prodottos per competenza' + competenza);

            res.status(500).send({
                message: `3 errore il lettura prodottos per competenza ${competenza}--  errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ----------   prodotti per competenza  ${competenza}`);

            res.status(200).send({ 
                message:`situazione attuale Prodotti per competenza`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessuna Prodotto per la competenza  ${competenza}`);
            res.status(200).send({
                message: `nessuna Prodotto per la competenza  ${competenza} `,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// lettura prodotti per categoria
exports.getProdottiforCategoria = (req,res)=> {
    
    const categoria = req.params.tipo;
    
    strsql = strsql + ' where `prodottos`.`competenza` = ' + categoria;

    console.log('backend - getProdottiforCategoria - strsql --> ' + strsql);
 
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'3 errore il lettura prodottos per categoria' + categoria);

            res.status(500).send({
                message: `3 errore il lettura prodottos per categoria ${categoria}--  errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ----------   prodotti per categoria  ${categoria}`);

            res.status(200).send({ 
                message:`situazione attuale Prodotti per categoria`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessuna Prodotto per la categoria  ${categoria}`);
            res.status(200).send({
                message: `nessuna Prodotto per la categoria  ${categoria} `,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// lettura prodotti per tipologia 1
exports.getProdottiforTipologia1 = (req,res)=> {
    
    let tipo = req.params.tipo;
    let notSelectedDay = 'N';
    let strsql = '';

    console.log('backend -----------------------------  getProdottiforTipologia1 ' + req.params.tipo);
   
    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + " where `prodottos`.`tipologia` = " + tipo  + " and `prodottos`.`selectedDay` =  '" + notSelectedDay + "' " +  order;;  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prodottos  per tipologia - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti i prodotti per tipologia ' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti per tipologia ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prodotto pressente !! `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}

// lettura prodotti per categoria
exports.getProdottiforTipologia = (req,res)=> {
    
    let tipologia = req.params.tipo;

    console.log('params: ' + req.params)

    console.log('backend -- getProdottiforTipologia-- Tipologia:  ' + tipologia)
    let strsql = '';

    strsql = strSql + ' where `prodottos`.`tipologia` = ' + tipologia;

    console.log('backend - getProdottiforTipologia - strsql --> ' + strsql);
 
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'3 errore il lettura prodottos per tipologia' + tipologia);

            res.status(500).send({
                message: `3 errore il lettura prodottos per tipologia ${tipolgia}--  errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ----------   prodotti per tipologia  ${tipologia}`);

            res.status(200).send({ 
                message:`situazione attuale Prodotti per tipologia`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessuna Prodotto per la tipologia  ${tipologia}`);
            res.status(200).send({
                message: `nessuna Prodotto per la tipologia  ${tipologia} `,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}


exports.getProdottiforMenu = (req,res)=> {
 
    console.log('backend -----------------------------  getprodottosforMenu ' + req.params.menu);
    
    let menu = req.params.menu;
    let strsql = '';

    strsql =  strSql + " where `prodottos`.`aMenu` = '" + menu + "' "  + order; 

    console.log('getProdottiforMenu - strsql: ' + strsql);

   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura  prodottos for menu- erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti  prodotti con selezione menu -- N.ro ' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti con selezione menu: ' + menu,
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun prodotto presente `,
                rc: 'nf',
                number:  0,
                data:null
            });                    
        }

    });
}

exports.getProdottoLastId = (req,res)=> {

    const strSql = "select `prodottos`.* from `prodottos` " + 
                    " inner join `t_tipologias` ON `t_tipologias`.`id` = `prodottos`.`tipologia` " +
                    " inner join `t_stato_prodottos` ON `t_stato_prodottos`.`id` = `prodottos`.`stato` " +
                    " inner join `t_categoria_prodottos` ON `t_categoria_prodottos`.`id` = `prodottos`.`categoria` " +
                    " inner join `t_competenza_prodottos` ON `t_competenza_prodottos`.`id` = `prodottos`.`competenza` " 


    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getProdottoLastId ');
    

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `prodottos`.`id` < ' + tappo + ' order by `prodottos`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura prodotto last id - erro: ${err}`,
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

exports.resettaamenu = (req,res)=> {

    console.log('backend ----------------------------- resettaamenu ');
    
    const fieldreset = '*';
     
    let strsql =  `update prodottos set
                    aMenu = '${fieldreset}'`;
    
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore update all aMenu prodottos for reset ');
            res.status(500).send({
                message: `4 errore update all aMenu for reset - errore: ${err}`,
                data:null
            });
            return;
        }
         console.log(err,`----- resettato flag aMenu per prodotti`);
         res.status(200).send({ 
              message: `resettato flag aMenu per prodotti   `,
              rc: 'ok',
              data:result
          });  
        });
}

exports.resettaselectedDay = (req,res)=> {

    console.log('backend ----------------------------- resettaselectedDay ');
    
    const fieldreset = 'N';
     
    let strsql =  `update prodottos set
                    selectedDay = '${fieldreset}'`;
    
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore update all selectedDay prodottos for reset ');
            res.status(500).send({
                message: `4 errore update all selectedDay for reset - errore: ${err}`,
                data:null
            });
            return;
        }
         console.log(err,`----- resettato flag selectedDay per prodotti`);
         res.status(200).send({ 
              message: `resettato flag selectedDay per prodotti   `,
              rc: 'ok',
              data:result
          });  
        });
}


exports.getProdottibytipolattiva = (req,res)=> {
 
    console.log('backend -----------------------------  getprodottosforMenu ' + req.params.menu);
    
    let stato = 1;
    let strsql = '';

    strsql =  strSql + " where `t_tipologias`.`stato` = " + stato + order; 

    console.log('getProdottibytipolattiva - strsql: ' + strsql);

   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura  prodottos for menu- erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti  prodotti con selezione tipologia = 1 -- N.ro ' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti con selezione tipologia = 1: ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun prodotto presente `,
                rc: 'nf',
                number:  0,
                data:null
            });                    
        }

    });
}

exports.getProdottimenuforCompetenza = (req,res)=> {
 
    console.log('backend -----------------------------  getprodottosforMenu ' + req.params.menu);
    

    let menu = req.params.menu;
    let comp = req.params.competenza;
    let strsql = '';

    strsql =  strSql + " where `prodottos`.`aMenu` = '" + menu + "' and `prodottos`.`competenza` = " + comp  + order; 

    console.log('getProdottimenuforCompetenza - strsql: ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura  prodottos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti  prodotti con selezione menu per competenza -- N.ro ' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti per competenza e con selezione menu: ' + menu,
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun prodotto presente `,
                rc: 'nf',
                number:  0,
                data:null
            });                    
        }

    });
}