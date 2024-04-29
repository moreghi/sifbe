const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `commandas`.*, `t_stato_commandas`.`d_stato_commanda` from `commandas` " + 
               " inner join `t_stato_bevandes` ON `t_stato_bevandes`.`id` = `commandas`.`statoBevande` " +
               " inner join `t_stato_commandas` ON `t_stato_commandas`.`id` = `commandas`.`stato` " +
               " inner join `t_stato_contabiles` ON `t_stato_contabiles`.`id` = `commandas`.`statoContabile` " +
               " inner join `t_stato_cucinas` ON `t_stato_cucinas`.`id` = `commandas`.`statoCucina` " +
               " inner join `manifestaziones` ON `manifestaziones`.`id` = `commandas`.`idSanfra` "  +
               " inner join `giornatas` ON `giornatas`.`id` = `commandas`.`idGiornata` "

               // in attesa di capire come ordinare

// const order = " order by `commandas`.`statoBevande`  asc, `commandas`.`statoCucina` asc, `commandas`.`statoContabile` asc  ";
const order = " ";

// ------  ok 
exports.getAll = (req,res)=> {
 
    let strsql = strSql  + order; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all commande - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le commande ' + result.length);  

            console.log(`rilevati ${result.length} commande `)
            res.status(200).send({ 
                message:'Situazione attuale commande',
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

// lettura singolo commanda
// ------   ok  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `commandas`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from commandas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura commandas for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura commandas for id ${id}- errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   commande `)

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

// creazione nuovo commanda   (post)    
// ok 
exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo commanda');  // visualizzo la struttura dei campi immessi dall'commanda 
  
      // creo le variabili dai campi di input
     
      const strsql1 ="SELECT * FROM `commandas` WHERE id < 99999 ORDER BY id DESC;";

      let idSanfra = req.body.idSanfra;
      let idprenotazione = req.body.idprenotazione;
      let idpersona = req.body.idpersona;
      let anagrafica_cliente = req.body.anagrafica_cliente;
      let idGiornata = req.body.idGiornata;
      let buonoPasto = req.body.buonoPasto;
      let stato = req.body.stato;
      let numTavolo = req.body.numTavolo;
      let numPersone = req.body.numPersone;
      let numProdotti = req.body.numProdotti;
      let importoProdotti = req.body.importoProdotti;
      let importoCoperto = req.body.importoCoperto;
      let importodaPagare = req.body.importodaPagare;
      let importoPagato = req.body.importoPagato;
      let resto = req.body.resto;
      let noteCommanda = req.body.noteCommanda;
      let key_utenti_operation = req.body.key_utenti_operation;
      
      let strsql =  `insert into commandas
                  (idSanfra,idprenotazione,stato,idpersona,anagrafica_cliente,idGiornata,buonoPasto,numTavolo,numPersone,numProdotti,importoProdotti,importoCoperto,importodaPagare,importoPagato,resto,noteCommanda,key_utenti_operation) 
                  valueS
                  (
                     ${idSanfra},${idprenotazione},${stato}, ${idpersona},'${anagrafica_cliente}',${idGiornata},${buonoPasto},${numTavolo},${numPersone},${numProdotti},${importoProdotti}, ${importoCoperto},${importodaPagare},${importoPagato},${resto},'${noteCommanda}',${key_utenti_operation}
                  )`;
      
    
    //   db.query(strsql,(err,result) => {
    //       if(err) {
    //           console.log(err,'errore in registrazione nuova commanda su tabella commandas ');
    //           res.status(500).send({
    //             message: `errore in registrazione nuova commanda su tabella commandas - errore: ${err}`,
    //             rc: 'ko',
    //             data:null
    //         });
    //         return;
    //       }
    //       console.log(result, `result ...... commanda inserita regolarmente `);
    //       res.status(200).send({
    //         message: `commanda inserita regolarmente`,
    //         rc: 'ok',
    //         data:result
    //     });
    //  });
    
    db.query(strsql,(err,result) => {
        if(err) {
           console.log(err,'errore in registrazione errore in registrazione nuova commanda su tabella commandas ');
           res.status(500).send({
             message: `errore in registrazione errore in registrazione nuova commanda su tabella commandas - errore: ${err}`,
             data:null
          });
          return;
        }
          
        db.query(strsql1,(err,result) => {
          if(err) {
                       console.log(err,'errore in lettura ultima commanda ');
                       res.status(500).send({
                       message: `errore in lettura ultima Commanda - errore: ${err}`,
                       rc: 'kk',
                       data:null
            });
            return;
          }
          res.status(200).send({
               message: `commanda inserita regolarmente`,
               rc: 'ok',
               data:result[0],
               lastnumber:result[0].id 
          });
      });
  });



  }
  
  // aggiornamento commanda   
  // ok
  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica commanda id ${id}`);  // visualizzo la struttura dei campi immessi dall'commanda 

    // definisco la strsql per lettura commanda

    let strsql_Inqu = `select * from commandas where id= ${id} `;

    // definisco le variabili per aggiornamento campi
 
    let idpersona = req.body.idpersona;
    let anagrafica_cliente = req.body.anagrafica_cliente;
    let numTavolo = req.body.numTavolo;
    let numPersone = req.body.numPersone;
    let stato = req.body.stato;
    let semaphore = req.body.semaphore;
    let delay = req.body.delay;
    let statoContabile = req.body.statoContabile;
    let statoCucina = req.body.statoCucina;
    let statoBevande = req.body.statoBevande;
    let cassaAttuale = req.body.cassaAttuale;
    let numProdotti = req.body.numProdotti;
    let importoProdotti = req.body.importoProdotti;
    let importoCoperto = req.body.importoCoperto;
    let importodaPagare = req.body.importodaPagare;
    let importoPagato = req.body.importoPagato;
    let resto = req.body.resto;
    let stampaEseguita = req.body.stampaEseguita;
    let noteCommanda = req.body.noteCommanda;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update commandas set
                    idpersona = ${idpersona},
                    anagrafica_cliente = '${anagrafica_cliente}',
                    numTavolo = ${numTavolo},
                    numPersone = ${numPersone},
                    stato = ${stato},
                    semaphore = '${semaphore}',
                    delay = ${delay},
                    statoBevande = '${statoBevande}',
                    statoContabile = '${statoContabile}',
                    statoCucina = '${statoCucina}',
                    cassaAttuale = ${cassaAttuale},
                    numProdotti = ${numProdotti},
                    importoProdotti = ${importoProdotti},
                    importoCoperto = ${importoCoperto},
                    importodaPagare = ${importodaPagare},
                    importoPagato = ${importoPagato},
                    resto = ${resto},
                    stampaEseguita = '${stampaEseguita}',
                    noteCommanda = '${noteCommanda}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

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
                        console.log(err,` ----- errore in aggiornamento commanda id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto commanda ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato commanda id: ${id}`);
                    res.status(200).send({ 
                        message: `commanda aggiornata regolarmente   `,
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

// cancellazione commanda   
// ok
exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione commanda id ${id}`);  // visualizzo la struttura dei campi immessi dall'commanda 

    // definisco la strsql per lettura commanda

    let strsql_Inqu = `select * from commandas where id= ${id} `;

    let strsql =  `delete from commandas  where id = ${id}`;
                    

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
                        console.log(err,`----- errore in cancellazione commanda id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione commanda -- ${err} --  `,
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
                    console.log(`----- inesistente commanda id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

// ok

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

    console.log('backend -----------------------------  getCommandeforGiornata ' + JSON.stringify(req.params));
    
    let id = req.params.id;
    let order = req.params.order;
    let strsql = '';
      
    if(order == '*') {
        sort = ' order by `commandas`.`id` desc';
    }
    if(order == 'A') {
        sort = ' order by `commandas`.`anagrafica_cliente` asc';
    }

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `commandas`.`idGiornata` = ' + id +  sort;  
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
                rc: 'ok',
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
                rc: 'ok',
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

// eseguo la cancellazione commande - commandarighe e imposto i contatori auto_increment a 1 per nuova giornata
exports.deleteAll = (req,res)=> {
    
    let strsql = '';

    console.log('backend -----------------------------  deleteAll ');
      
    strsql =  ' delete from `commandas` ';  
    console.log(`strsql:  ${strsql} `);
  // cancello le commande
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore cancellazione tutte commande - erro: ${err}`,
                data:null
            });
            return;
        }
    }); 

    strsql = 'ALTER TABLE `commandas` AUTO_INCREMENT = 1';
    db.query(strsql,(err,result)=>  {
            if(err) {
               res.status(500).send({
                    message: `resetIndice -  errore reset indice commandas - errore: ${err}`,
                    data:null
                });
                return;
            }
        });

// cancello le righe commande
strsql =  ' delete from `commandarigas` ';  
db.query(strsql,(err,result)=> {
    if(err) {
       res.status(500).send({
            message: `4x errore cancellazione tutte righe commande - erro: ${err}`,
            data:null
        });
        return;
    }
});
 
strsql = 'ALTER TABLE `commandarigas` AUTO_INCREMENT = 1';
db.query(strsql,(err,result)=>  {
        if(err) {
           res.status(500).send({
                message: `resetIndice -  errore reset indice righe commandas - errore: ${err}`,
                data:null
            });
            return;
        }
    });

  
    res.status(200).send({ 
                message: `cancellate tutte le commande, righecommande e impostati a 1 i valori per id  !! `,
                rc: 'ok',
                data:null
            });                    
 


}

// ------------ non da errore ma non cancella ----- buttare
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
                rc: 'ok',
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


exports.getConteggiByGiornataId = (req,res)=> {

    console.log('backend -----------------------------  getCommandeforGiornata ' + req.params.id);
    
    let id = req.params.id;
    let strsql = 'SELECT COUNT(*) as numero, SUM(numPersone) as numPersone, SUM(importoCoperto) as coperto, SUM(importoPagato) as pagato FROM `commandas`';

    strsql = strsql + ' where `commandas`.`idGiornata` = ' + id;  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT commandas.*, t_ruolos.d_ruolo FROM commandas INNER JOIN t_ruolos ON t_ruolos.id = commandas.idRuolo WHERE commandas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3xwq errore in lettura conteggi all commandas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti i conteggi delle commande per giornata ' + result.length);  

            console.log(`rilevati ${result.length} commande `)
            res.status(200).send({ 
                message:'Situazione attuale commande per giornata ',
                number:  result.length,
                rc: 'ok',
                data:result[0],
                numero:result[0].numero,
                numpersone:result[0].numPersone,
                coperto:result[0].coperto,
                pagato:result[0].pagato
            });                    
        }else {
            console.log('nessuna record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessunaa commanda presente !! `,
                rc: 'nf',
                data:null,
                numero:result[0].numero,
                numpersone:result[0].numPersone,
                coperto:result[0].coperto,
                pagato:result[0].pagato
            });                    
        }

    });

}

// -----------------------------------------  richiede commandarighe  ---  da sistemare quando definito model
exports.getCommandeforGiornataeCompetenzaestato = (req,res)=> {
    //  ->where('idGiornata',$id)->where('competenza', '=', $competenza)->where('commandas.stato', '!=', $stato)->distinct()->get(['competenza']);
      
      
      let stato = req.params.stato;
      let id = req.params.id;
      let comp = req.params.comp;
      let order = req.params.order;
      let sort = ' order by `commandas`.`id` desc';
      let strsql = '';  
      console.log('backend -----------------------------  getCommandeforGiornataeCompetenzaestato ' + JSON.stringify(req.params));

      let strSql = "select `commandas`.*, `t_stato_commandas`.`d_stato_commanda` from `commandas` " + 
                   " inner join `t_stato_commandas` ON `t_stato_commandas`.`id` = `commandas`.`stato` " +
                   " inner join `manifestaziones` ON `manifestaziones`.`id` = `commandas`.`idSanfra` "  +
                   " inner join `giornatas` ON `giornatas`.`id` = `commandas`.`idGiornata` "

      
      if(order == '*') {
          sort = ' order by `commandas`.`id` desc';
      }
      if(order == 'A') {
          sort = ' order by `commandas`.`anagrafica_cliente` asc';
      }
   
    if(comp  == 1) {
        if(stato === 2) {
            strsql =  strSql + ' where `commandas`.`idGiornata` = ' + id + " and `commandas`.`stato` < 3 ";
        } else {
            // per stati 3 e 4
            strsql =  strSql + ' where `commandas`.`idGiornata` = ' + id + " and `commandas`.`stato` = " + stato + sort;
        }
    }
    if(comp  == 2) {
        strsql =  strSql + ' where `commandas`.`idGiornata` = ' + id + " and `commandas`.`stato` = " + stato + sort;
    }

      
      console.log(`backend -------  strsql:  ${strsql} `);
 

    


      db.query(strsql,(err,result)=> {
          if(err) {
             res.status(500).send({
                  message: `3x errore il lettura all commandas  per stato e competenza - erro: ${err}`,
                  data:null
              });
              return;
          }
          if(result.length>0) {
              console.log('xxx - lettura tutti i commande per stato e competenza ' + result.length);  
  
              console.log(`rilevati ${result.length} commande `)
              res.status(200).send({ 
                  message:'Situazione attuale commande per stato e competenza ',
                  number:  result.length,
                  rc: 'ok',
                  data:result
              });                    
          }else {
              console.log('nessuna record presente ' + result.length); 
  
              res.status(200).send({ 
                  message: `nessunaa commanda presente !! `,
                  rc: 'nf',
                  strsql: strsql,
                  data:null
              });                    
          }
  
      });
     
  }

  exports.getcommandebyStrsql = (req,res)=> {
  
    let strsql = req.params.strsql;
    
    console.log('backend - getcommandebyStrsql ---------  strsql --> ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3gt errore in lettura all righe da strsql --- erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le commande da strsql' + result.length);  

            console.log(`rilevate ${result.length} commande da strsql`)
            res.status(200).send({ 
                message:'Situazione attuale commande ',
                rc: 'ok',
                number: result.length,
                data:result
            });                    
        }else {
            console.log('nessuna commanda presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna commanda presente `,
                rc: 'nf',
                number: 0,
                data:null
            });                    
        }

    });
}
