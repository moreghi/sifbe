const strSql = 'select `cassas`.*  ' +  
                ' FROM `cassas` '; 
                


const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from cassas';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all cassas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le casse ' + result.length);  

            console.log(`rilevati ${result.length} casse `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun cassa presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo cassa
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `cassas`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from cassas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura cassas for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura cassas for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassa `)

            res.status(200).send({ 
                message:`situazione attuale per cassa id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun record cassa presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo cassa   (post)

exports.createNew = (req,res)=> {
    
    strsql1 ="SELECT * FROM `cassas` WHERE id < 99999 ORDER BY id DESC;";

      console.log(req.body,'..........................................   Creazione nuovo cassa');  // visualizzo la struttura dei campi immessi dall'cassa 
  
      // creo le variabili dai campi di input
    
      let datacassa = req.body.datacassa;
      let idEvento = req.body.idEvento;
      let contanti = req.body.contanti;
      let pos = req.body.pos;
      let carteCredito = req.body.carteCredito;
      let bonifici = req.body.bonifici;
      let key_utenti_operation = req.body.key_utenti_operation;
     
    
      console.log('backend ------------ Cassa ---------------------- Creazione nuovo cassa ' + JSON.stringify(req.body));


      let strsql =  `insert into cassas
                  (datacassa,idEvento,contanti,pos,carteCredito,bonifici,key_utenti_operation) 
                  valueS
                  (
                   '${datacassa}',${idEvento},${contanti},${pos},${carteCredito},${bonifici},${key_utenti_operation} 
                  )`;
      console.log('pronto per fare create Cassa: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova cassa su tabella cassas ');
              res.status(500).send({
                message: `errore in registrazione nuova cassa su tabella cassas - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... Cassa inserita regolarmente `);
          db.query(strsql1,(err,result) => {
            if(err) {
                console.log(err,'errore in lettura ultima cassa creata su tabella cassas ');
                res.status(500).send({
                  message: `errore in lettura ultima cassa creata su tabella cassas - errore: ${err}`,
                  rc: 'kk',
                  data:null
              });
              return;
            }
            res.status(200).send({
                message: `cassa inserita regolarmente`,
                rc: 'ok',
                data:result[0],
                lastnumber:result[0].id 
            });
        });
    
    });    
    
  }
  
  // aggiornamento cassa   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica cassa id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassa 

    // definisco la strsql per lettura cassa

    let strsql_Inqu = `select * from cassas where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let datacassa = req.body.datacassa;
    let contanti = req.body.contanti;
    let pos = req.body.pos;
    let carteCredito = req.body.carteCredito;
    let bonifici = req.body.bonifici;
    let key_utenti_operation = req.body.key_utenti_operation;
        let strsql =  `update cassas set
                    datacassa = '${datacassa}',
                    contanti = ${contanti},
                    pos = ${pos},
                    carteCredito = ${carteCredito},
                    bonifici = ${bonifici},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('-----------  cassa ------------------------------------- update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura cassas for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura cassas for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento cassa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto cassa ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(`----- aggiornata cassa id: ${id}`);
                    res.status(200).send({ 
                        message: `cassa aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente cassa id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna cassa presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento cassa   // metodo 1  -- funziona

exports.updatecassaByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica cassa id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassa 

  // definisco la strsql per lettura cassa

    let strsql_Inqu = `select * from cassas where id= ${id} `;
    
    // definisco 
   let cassanew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            cassaname: req.body.cassaname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            notecassa: req.body.notecassa,
            key_soci_operation: req.body.key_soci_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura cassas for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura cassas for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE cassas SET ? WHERE id = ' + req.params.id, cassanew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento cassa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto cassa ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `cassa aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente cassa id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun cassa pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione cassa

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione cassa id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassa 

    // definisco la strsql per lettura cassa

    let strsql_Inqu = `select * from cassas where id= ${id} `;

    let strsql =  `delete from cassas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura cassas for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione cassa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione cassa -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `cassa  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente cassa id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun cassa presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getbydata = (req,res)=> {
    
    let datacassa = req.params.datacassa;
    let idEvento = req.params.idEvento;
      
    const strsql = strSql + " where `cassas`.`datacassa` = '" + datacassa + "' and `cassas`.`idEvento` = " + idEvento;

    console.log('backend - --------- Cassa --------------------------- getbydata - strsql --> ' + strsql);
  
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2rw errore il lettura cassas for datacassa ' + datacassa);

            res.status(500).send({
                message: `2 errore il lettura cassas for datacassa ${datacassa}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassa `)

            res.status(200).send({ 
                message:`situazione attuale per cassa datacassa: .....  ${datacassa}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per datacassa: ${datacassa} `);
            res.status(200).send({
                message: `nessun record cassa presente for datacassa: ${datacassa}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getlastdata = (req,res)=> {
    
    let id = 9999;
    let idEvento = req.body.idEvento;

    const strsql = strSql + ' where `cassas`.`id` <= ' + id +  ' and `cassas`.`idEvento` = ' + idEvento + ' order by id desc ';

    console.log('backend - getlastdata - strsql --> ' + strsql);
  
   // let strsql = `select * from cassas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2rw errore il lettura ultima cassa ');

            res.status(500).send({
                message: `2 errore il lettura cassas for ultima cassa - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassa `)

            res.status(200).send({ 
                message:`situazione attuale per ultima cassa`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente `);
            res.status(200).send({
                message: `nessun record cassa presente `,
                rc: 'nf',
                data:null
            });
        }

    });  
}


exports.getAllDaybyEvento = (req,res)=> {
    
    let idEvento = req.params.idEvento;
      
    const strsql = strSql + " where `cassas`.`idEvento` = " + idEvento;

    console.log('backend - --------- Cassa --------------------------- getAllDaybyEvento - strsql --> ' + strsql);
  
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2rw errore il lettura cassas for datacassa ' + datacassa);

            res.status(500).send({
                message: `2 errore il lettura cassas for evento ${idEvento}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassa `)

            res.status(200).send({ 
                message:`situazione attuale giornate di cassa per evento: .....  ${idEvento}`,
                rc: 'ok',
                number: result.length, 
                data:result
            });                    
        }else {
            console.log(`nessun record presente per evento: ${idEvento} `);
            res.status(200).send({
                message: `nessun record cassa presente for evento: ${idEvento}`,
                rc: 'nf',
                number: 0,
                data:null
            });
        }

    });  
}


exports.getAllbyEvento = (req,res)=> {
   
    let data1 = null;
    let t_Co = 0;
    let t_Po = 0;
    let t_Cr = 0;
    let t_bo = 0;


    let idEvento = req.params.idEvento;
    const strsql_1 = " SELECT sum(IFNULL(`cassas`.`contanti`,0)) as tContanti, sum(IFNULL(`cassas`.`pos`,0)) as tPos,  sum(IFNULL(`cassas`.`carteCredito`,0)) as tCarte, sum(IFNULL(`cassas`.`bonifici`,0)) as tBonifici  FROM `cassas` ";
    const strsql = strsql_1 + " where `cassas`.`idEvento` = " + idEvento;

    console.log('backend - --------- Cassa --------------------------- getAllbyEvento - strsql --> ' + strsql);
  
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2rw errore il lettura cassas globale for evento ' + idEvento);

            res.status(500).send({
                message: `2 errore il lettura cassas for evento ${idEvento}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassa `)

// test
            data1 = result[0];
            console.log('data1: ' + JSON.stringify(data1));
            t_Co = result[0].tContanti;
            t_Po = result[0].tPos;
            t_Cr = result[0].tCarte;
            t_bo = result[0].tBonifici;
   
            
            console.log('Contanti: ' + t_Co);
            console.log('Pos: ' + t_Po);
            console.log('Carte Credito: ' + t_Cr);
            console.log('Bonifici: ' + t_bo);



           //     tContanti: result[0].tContanti,
          //      tPos: result[0].tPos,
          //      tCarte: result[0].tCarte,
          //      tBonifici: result[0].tBonifici,




// fine test




            res.status(200).send({ 
                message:`situazione attuale giornate di cassa per evento: .....  ${idEvento}`,
                rc: 'ok',
                number: result.length, 
                data:result[0],
                tContanti: result[0].tContanti,
                tPos: result[0].tPos,
                tCarte: result[0].tCarte,
                tBonifici: result[0].tBonifici,
            });                    
        }else {
            console.log(`nessun record presente per evento: ${idEvento} `);
            res.status(200).send({
                message: `nessun record cassa presente for evento: ${idEvento}`,
                rc: 'nf',
                number: 0,
                data:null
            });
        }

    });  
}


exports.gettotalibyidGiornata = (req,res)=> {
 
    let idGiornata = req.params.idGiornata;
     
    let strsql = 'SELECT SUM(valoreIn) as incassato, SUM(valoreAc) as attuale, SUM(valoreFi) as finale, SUM(valoreSb) as sbilancio FROM `cassas` where cassas.idGiornata = ' + idGiornata; 

    console.log('backend - Cassa - getbyIdGiornata ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `step_015 errore in riconteggio cassa  per idGiornata - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                console.log(`----- importo riconteggiato: ${result[0].incassato}`);
                res.status(200).send({ 
                message: `totale cassa ricalcolata   `,
                rc: 'ok',
                incassato:result[0].incassato,
                attuale:result[0].attuale,
                finale:result[0].finale,
                sbilancio:result[0].sbilancio,
                }); 
        }else {
            console.log('nessun record presente ' + result.length); 
            res.status(200).send({ 
                message: `nessuna cassa presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}

exports.getbyidTagliaeGiorno = (req,res)=> {
 
    let idTaglia = req.params.idTaglia;
    let idGiornata = req.params.idGiornata;

    let strsql = strSql + ` where idTaglia = ${idTaglia}  and idGiornata= ${idGiornata} `;

    console.log('backend - cassas - getbyidTagliaeGiorno ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura taglia cassa - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura taglia cassa by id ' + result.length);  

            console.log(`rilevate ${result.length} cassa `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale taglia cassa',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna cassa presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}

exports.gettagliebyDay = (req,res)=> {
 
    let idGiornata = req.params.idGiornata;
    console.log('gettagliebyDay ----- params: ' + JSON.stringify(req.params)); 
    let strsql = strSql + ' where `cassas`.`idGiornata` = ' + idGiornata + ' and `cassas`.`idTaglia` < 6  ORDER by `cassas`.`idTaglia` desc';
    console.log('backend - Cassa ----------------------------------    gettagliebyDay ' + strsql);
 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `step_015 errore in lettura taglie cassa  per idGiornata - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('backend - gettagliebyDay --- trovate taglie --------------     ' + JSON.stringify(result));
                res.status(200).send({ 
                message: `trovate ${result.length} taglie   `,
                rc: 'ok',
                data:result
            }); 
        }else {
            console.log('nessun record presente ' + result.length); 
            res.status(200).send({ 
                message: `nessuna taglia presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}