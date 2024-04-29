const strSql = 'select `cassamovs`.* , `t_stato_cassamovs`.`d_stato_cassamov`, `cassas`.* ' +  
                ' FROM `cassamovs` ' + 
                ' inner join `t_stato_cassamovs` ON `t_stato_cassamovs`.`id` = `cassamovs`.`stato` ' + 
                ' inner join `cassas` on `cassas`.`id` = `cassamovs`.`idcassa`'; 



const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from cassamovs';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all cassamovs - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti movimenti di cassa ' + result.length);  

            console.log(`rilevati ${result.length} movimenti di cassa `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun movimento presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo cassamov
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `cassamovs`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from cassamovs where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura cassamovs for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura cassamovs for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassamov `)

            res.status(200).send({ 
                message:`situazione attuale per cassamov id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun record cassamov presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo cassamov   (post)

exports.createNew = (req,res)=> {
    
      console.log(req.body,'..........................................   Creazione nuovo cassamov');  // visualizzo la struttura dei campi immessi dall'cassamov 
  
      // creo le variabili dai campi di input
 

      let idcassa = req.body.idcassa;
      let idevento = req.body.idevento;
      let datamov = req.body.datamov;
      let idbiglietto = req.body.idbiglietto;
      let importo = req.body.importo;
      let stato = req.body.stato;
      let modpag = req.body.modpag;
      let causale = req.body.causale;
      let provenienza = req.body.provenienza;
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let specifica = req.body.specifica;
      let key_utenti_operation = req.body.key_utenti_operation;
    
      console.log('backend ------------ cassamov ---------------------- Creazione nuovo cassamov ' + JSON.stringify(req.body) );


      let strsql =  `insert into cassamovs
                  (idcassa,idevento,datamov,idbiglietto,stato,causale,provenienza,importo,modpag,cognome,nome,specifica,key_utenti_operation) 
                  valueS
                  (
                   ${idcassa},${idevento},'${datamov}',${idbiglietto},${stato},UPPER('${causale}'),UPPER('${provenienza}'),${importo},${modpag},UPPER('${cognome}'),UPPER('${nome}'),UPPER('${specifica}'),${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo movimento cassa su tabella cassamovs ');
              res.status(500).send({
                message: `errore in registrazione nuovo movimento cassa su tabella cassamovs - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... movimento cassa inserito regolarmente `);
          res.status(200).send({
            message: `movimento cassa inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento cassamov   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica cassamov id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassamov 

    // definisco la strsql per lettura cassamov

    let strsql_Inqu = `select * from cassamovs where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idcassa = req.body.idcassa;
    let idevento = req.body.idevento;
    let datamov = req.body.datamov;
    let idbiglietto = req.body.idbiglietto;
    let importo = req.body.importo;
    let stato = req.body.stato;
    let modpag = req.body.modpag;
    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let specifica = req.body.specifica;
    let key_utenti_operation = req.body.key_utenti_operation;
      
    let strsql =  `update cassamovs set
                    idcassa = ${idcassa},
                    idevento = ${idevento},
                    datamov = '${datamov}',
                    idbiglietto = ${idbiglietto},
                    importo = ${importo},
                    stato = ${stato},
                    modpag = ${modpag},
                    cognome = UPPER('${cognome}'),
                    nome = UPPER('${nome}'),
                    specifica = UPPER('${specifica}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura movimento cassa for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura movimento cassa for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento movimento cassa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto movimento cassa ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato moviemnto cassa id: ${id}`);
                    res.status(200).send({ 
                        message: `moviemnto cassa aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente movimento cassa id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun movimento cassa presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento cassamov   // metodo 1  -- funziona

exports.updatecassamovByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica cassamov id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassamov 

  // definisco la strsql per lettura cassamov

    let strsql_Inqu = `select * from cassamovs where id= ${id} `;
    
    // definisco 
   let cassamovnew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            cassamovname: req.body.cassamovname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            notecassamov: req.body.notecassamov,
            key_soci_operation: req.body.key_soci_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura cassamovs for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura cassamovs for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE cassamovs SET ? WHERE id = ' + req.params.id, cassamovnew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento cassamov id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto cassamov ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `cassamov aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente cassamov id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun cassamov pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione cassamov

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione cassamov id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassamov 

    // definisco la strsql per lettura cassamov

    let strsql_Inqu = `select * from cassamovs where id= ${id} `;

    let strsql =  `delete from cassamovs  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura cassamovs for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione cassamov id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione cassamov -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `cassamov  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente cassamov id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun cassamov presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  



exports.getAllbyCassa = (req,res)=> {
    
    
    let idcassa = req.params.id;
    let modpag = 1;  // incasso di contanti 
    let TotaleContanti = 0;


    const strsql_1 = " SELECT sum(IFNULL(`cassamovs`.`importo` ,0)) as tContanti from `cassamovs` where `cassamovs`.`idcassa` = " + idcassa + " and `cassamovs`.`modpag`= " + modpag;

    const strsql = strSql + ' where `cassamovs`.`idcassa` = ' + idcassa;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from cassamovs where id= ${id} `;    originale
  
// query 1
/*
db.query(strsql_1,(err,result1)=> {
    console.log('----   eseguita query son strsql_1 ' + strsql_1 )
    if(err) {
        console.log(err,'2ggg errore il lettura cassamovs for id ' + idcassa);

        res.status(500).send({
            message: `2g5tfr errore il lettura cassamovs for id ${idcassa}- errore: ${err}`,
            rc: 'kk',
            data:null
        });
        return;
    }
     if(result1.length>0) {
            console.log(`rilevata ${result1.length}  ------------------------   cassamov `)
         //     TotaleContanti:result1[0].tContanti
            };                    
    });

*/




    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2ggg errore il lettura cassamovs for id ' + idcassa);

            res.status(500).send({
                message: `2g5tfr errore il lettura cassamovs for id ${idcassa}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassamov `)
          /*  
            db.query(strsql_1,(err,result1)=> {
                if(err) {
                    console.log(err,'2sdfsd errore il lettura totale contanti cassamovs for idEvento ' + idEvento);
       
                    res.status(500).send({
                        message: `deeeetfr errore il lettura cassamovs for cassaid ${idcassa}- errore: ${err}`,
                        rc: 'kk',
                        data:null
                    });
                    return;
                  } 
                });  */
            res.status(200).send({ 
                message:`situazione attuale per cassamov idcassa: .....  ${idcassa}`,
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log(`nessun record presente per idcassa: ${idcassa} `);
            res.status(200).send({
                message: `nessun record cassamov presente for idcassa: ${idcassa}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}



exports.getAllbyEvento = (req,res)=> {
    
    let idEvento = req.params.id;
        
    const strsql_1 = " SELECT sum(IFNULL(`cassamovs`.`contanti`,0)) as tContanti)) where `cassamovs`.`idevento` = " + idEvento;

    const strsql = strSql + ' where `cassamovs`.`idevento` = ' + idEvento;

    console.log('backend - getAllbyEvento - strsql --> ' + strsql);
  
   // let strsql = `select * from cassamovs where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2ggg errore il lettura cassamovs for idEvento ' + idEvento);

            res.status(500).send({
                message: `2g5tfr errore il lettura cassamovs for id ${idEvento}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassamov `)
         /*
            db.query(strsql_1,(err,result1)=> {
                if(err) {
                    console.log(err,'2sdfsd errore il lettura totale contanti cassamovs for idEvento ' + idEvento);
       
                    res.status(500).send({
                        message: `2g5tfr errore il lettura cassamovs for id ${idEvento}- errore: ${err}`,
                        rc: 'kk',
                        data:null,
                        contanti:result1[0].tContanti
                    });
                    return;
                  } 
                });*/
            res.status(200).send({ 
                message:`situazione attuale per cassamov idEvento: .....  ${idEvento}`,
                rc: 'ok',
                number:  result.length,
                data:result
          //      contanti:result1[0].tContanti
            });                    
        }else {
            console.log(`nessun record presente per idEvento: ${idEvento} `);
            res.status(200).send({
                message: `nessun record cassamov presente for idEvento: ${idEvento}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}



exports.getAllbyEventoetipopag = (req,res)=> {
    
    let idEvento = req.params.id;
    let tipopag = req.params.tipopag;
        
    console.log('backend ---- getAllbyEventoetipopag req.body  ' + JSON.stringify(req.params))

    const strsql_1 = " SELECT sum(IFNULL(`cassamovs`.`contanti`,0)) as tContanti)) where `cassamovs`.`idevento` = " + idEvento;

    const strsql = strSql + " where `cassamovs`.`idevento` = " + idEvento + " and `cassamovs`.`causale` = '" + tipopag +"'";

    console.log('backend - getAllbyEventoetipopag - strsql --> ' + strsql);
  
   // let strsql = `select * from cassamovs where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,`hytfr errore il lettura cassamovs for idEvento  ${idEvento}  e tipoPagamento ${tipopag}`);

            res.status(500).send({
                message: `2g5tfr errore il lettura cassamovs for id ${idEvento} e tipoPagamento ${tipopag} --- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassamov `)
         /*
            db.query(strsql_1,(err,result1)=> {
                if(err) {
                    console.log(err,'2sdfsd errore il lettura totale contanti cassamovs for idEvento ' + idEvento);
       
                    res.status(500).send({
                        message: `2g5tfr errore il lettura cassamovs for id ${idEvento}- errore: ${err}`,
                        rc: 'kk',
                        data:null,
                        contanti:result1[0].tContanti
                    });
                    return;
                  } 
                });*/
            res.status(200).send({ 
                message:`situazione attuale per cassamov idEvento: .....  ${idEvento} e tipoPagamento ${tipopag}`,
                rc: 'ok',
                number:  result.length,
                data:result
          //      contanti:result1[0].tContanti
            });                    
        }else {
            console.log(`nessun record presente per idEvento: ${idEvento} e tipoPagamento ${tipopag} `);
            res.status(200).send({
                message: `nessun record cassamov presente for idEvento: ${idEvento}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}



exports.getAllbyEventoeprovenienza = (req,res)=> {
    
    let idEvento = req.params.id;
    let provenienza = req.params.provenienza;
        
    console.log('backend ---- getAllbyEventoeprovenienza req.body  ' + JSON.stringify(req.params))

    const strsql_1 = " SELECT sum(IFNULL(`cassamovs`.`contanti`,0)) as tContanti)) where `cassamovs`.`idevento` = " + idEvento;

    const strsql = strSql + " where `cassamovs`.`idevento` = " + idEvento + " and `cassamovs`.`provenienza` = '" + provenienza +"'";

    console.log('backend - getAllbyEventoeprovenienza - strsql --> ' + strsql);
  
   // let strsql = `select * from cassamovs where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,`hytfr errore il lettura cassamovs for idEvento  ${idEvento}  e provenienza ${provenienza}`);

            res.status(500).send({
                message: `2g5tfr errore il lettura cassamovs for id ${idEvento} e provenienza ${provenienza} --- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassamov `)
         /*
            db.query(strsql_1,(err,result1)=> {
                if(err) {
                    console.log(err,'2sdfsd errore il lettura totale contanti cassamovs for idEvento ' + idEvento);
       
                    res.status(500).send({
                        message: `2g5tfr errore il lettura cassamovs for id ${idEvento}- errore: ${err}`,
                        rc: 'kk',
                        data:null,
                        contanti:result1[0].tContanti
                    });
                    return;
                  } 
                });*/
            res.status(200).send({ 
                message:`situazione attuale per cassamov idEvento: .....  ${idEvento} e provenienza ${provenienza}`,
                rc: 'ok',
                number:  result.length,
                data:result
          //      contanti:result1[0].tContanti
            });                    
        }else {
            console.log(`nessun record presente per idEvento: ${idEvento} e provenienza ${provenienza} `);
            res.status(200).send({
                message: `nessun record cassamov presente for idEvento: ${idEvento}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


exports.getAllbyEventoeprovenienzatipopag = (req,res)=> {
    
    let idEvento = req.params.id;
    let provenienza = req.params.provenienza;
    let tipopag = req.params.tipopag;
        
    console.log('backend ---- getAllbyEventoeprovenienzatipopag req.params  ' + JSON.stringify(req.params))

    const strsql_1 = " SELECT sum(IFNULL(`cassamovs`.`contanti`,0)) as tContanti)) where `cassamovs`.`idevento` = " + idEvento;

    const strsql = strSql + " where `cassamovs`.`idevento` = " + idEvento + " and `cassamovs`.`provenienza` = '" + provenienza +"' and `cassamovs`.`causale` = '" + tipopag +"'";

    console.log('backend - getAllbyEventoeprovenienzatipopag - strsql --> ' + strsql);
  
   // let strsql = `select * from cassamovs where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,`yhtgtt errore il lettura cassamovs for idEvento  ${idEvento}  e provenienza ${provenienza}  e tipopag ${tipopag}`);

            res.status(500).send({
                message: `2g5tfr errore il lettura cassamovs for id ${idEvento} e provenienza ${provenienza}  e tipopag ${tipopag} --- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassamov `)
         /*
            db.query(strsql_1,(err,result1)=> {
                if(err) {
                    console.log(err,'2sdfsd errore il lettura totale contanti cassamovs for idEvento ' + idEvento);
       
                    res.status(500).send({
                        message: `2g5tfr errore il lettura cassamovs for id ${idEvento}- errore: ${err}`,
                        rc: 'kk',
                        data:null,
                        contanti:result1[0].tContanti
                    });
                    return;
                  } 
                });*/
            res.status(200).send({ 
                message:`situazione attuale per cassamov idEvento: .....  ${idEvento} e provenienza ${provenienza}  e tipopag ${tipopag}`,
                rc: 'ok',
                number:  result.length,
                data:result
          //      contanti:result1[0].tContanti
            });                    
        }else {
            console.log(`nessun record presente per idEvento: ${idEvento} e provenienza ${provenienza}  e tipopag ${tipopag}`);
            res.status(200).send({
                message: `nessun record cassamov presente for idEvento: ${idEvento}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


exports.getAllbyEventodataeprovenienza = (req,res)=> {
    
    let idEvento = req.params.id;
    let provenienza = req.params.provenienza;
    let day = req.params.day;
        
    console.log('backend ---- getAllbyEventodataeprovenienza req.params  ' + JSON.stringify(req.params))

    const strsql_1 = " SELECT sum(IFNULL(`cassamovs`.`contanti`,0)) as tContanti)) where `cassamovs`.`idevento` = " + idEvento;

    const strsql = strSql + " where `cassamovs`.`idevento` = " + idEvento + " and `cassamovs`.`provenienza` = '" + provenienza +"' and `cassamovs`.`idcassa` = " + day;

    console.log('backend - getAllbyEventodataeprovenienza - strsql --> ' + strsql);
  
   // let strsql = `select * from cassamovs where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,`yhtgtt errore il lettura cassamovs for idEvento  ${idEvento}  e provenienza ${provenienza}  e tipopag ${tipopag}`);

            res.status(500).send({
                message: `2g5tfr errore il lettura cassamovs for id ${idEvento} e provenienza ${provenienza}  e tipopag ${tipopag} --- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassamov `)
            res.status(200).send({ 
                message:`situazione attuale per cassamov idEvento: .....  ${idEvento} e provenienza ${provenienza}  e giornata ${day}`,
                rc: 'ok',
                number:  result.length,
                data:result
          //      contanti:result1[0].tContanti
            });                    
        }else {
            console.log(`nessun record presente per idEvento: ${idEvento} e provenienza ${provenienza}  e giornata ${day}`);
            res.status(200).send({
                message: `nessun record cassamov presente for idEvento: ${idEvento}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getAllbyEventodataeprovenienzatipopag = (req,res)=> {
    
    let idEvento = req.params.id;
    let provenienza = req.params.provenienza;
    let day = req.params.day;
    let tipopag = req.params.tipopag;
        
    console.log('backend ---- getAllbyEventodataeprovenienzatipopag req.params  ' + JSON.stringify(req.params))
   
    const strsql = strSql + " where `cassamovs`.`idevento` = " + idEvento + " and `cassamovs`.`provenienza` = '" + provenienza +"' and `cassamovs`.`idcassa` = " + day + " and `cassamovs`.`causale` = '" + tipopag +"'";
    console.log('backend - getAllbyEventodataeprovenienzatipopag - strsql --> ' + strsql);
  
   // let strsql = `select * from cassamovs where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,`yhtgtt errore il lettura cassamovs for idEvento  ${idEvento}  e provenienza ${provenienza}  e tipopag ${tipopag} e giornata ${day}`);

            res.status(500).send({
                message: `2g5tfr errore il lettura cassamovs for id ${idEvento} e provenienza ${provenienza} e giornata ${day} e tipopag ${tipopag} --- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassamov `)
            res.status(200).send({ 
                message:`situazione attuale per cassamov idEvento: .....  ${idEvento} e provenienza ${provenienza}  e giornata ${day}`,
                rc: 'ok',
                number:  result.length,
                data:result
          //      contanti:result1[0].tContanti
            });                    
        }else {
            console.log(`nessun record presente per idEvento: ${idEvento} e provenienza ${provenienza}  e giornata ${day}  e tipopag ${tipopag}`);
            res.status(200).send({
                message: `nessun record cassamov presente for idEvento: ${idEvento}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

