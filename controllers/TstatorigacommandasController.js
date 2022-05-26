const db = require('../db');

let strSql = 'select * from t_stato_rigacommandas';

exports.getAll = (req,res)=> {
 
    let strsql = strSql;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_stato_rigacommandas');
        }
        if(result.length>0) {
            console.log('lettura tutti gli stati t_stato_rigacommanda ' + result.length);  

            console.log(`rilevati ${result.length} stati t_stato_rigacommanda `)
            res.send({
                message:'Situazione attuale stati t_stato_rigacommanda',
                rc: 'ok',
                data:result
            });
        }else {
            console.log('nessun record presente ' + result.length); 
            res.send({
                message:'nessun record presente',
                rc: 'nf',
                data:null
            });
        }

    });
}

// lettura singolo Ruolo
exports.getbyid = (req,res)=> {
    
    let key = req.params.id;
  
    let strsql = strSql + ` where id= ${key} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_stato_rigacommandas for key ' + key);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Stati t_stato_rigacommanda `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${key} -------   Stati t_stato_rigacommanda`,
                message:`situazione attuale per ruolo id: .....  ${key}`,
                rc: 'ok',
                data:result[0]
            });
        }else {
            console.log(`nessun record presente per id: ${key} `); 
            res.send({
                message: `nessun ruolo presente for id: ${key}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo ruolo   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo t_stato_rigacommanda');  // visualizzo la struttura dei campi immessi dall't_stato_rigacommanda 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_stato_riga_commanda = req.body.d_stato_riga_commanda;
      let key_utenti_operation = req.body.key_utenti_operation;
  
      let strsql =  `insert into t_stato_rigacommandas
                  (id,d_stato_riga_commanda,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_stato_riga_commanda}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo stato t_stato_rigacommanda su tabella t_stato_rigacommandas ');
          }
          console.log(result, `result ...... Ruolo inserito regolarmente `);
  
        
                  res.send({
                  message: `Stato Utente inserito regolarmente `,
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`Modifica Stato t_stato_rigacommanda id ${key}`);  // visualizzo la struttura dei campi immessi dall't_stato_rigacommanda 

    // definisco la strsql per lettura t_stato_rigacommanda

    let strsql_Inqu = `select * from t_stato_rigacommandas where id= ${key} `;

    // definisco le variabili per aggiornamento campi

    let d_stato_riga_commanda = req.body.d_stato_riga_commanda;
    let tappo = req.body.tappo;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_stato_rigacommandas set
                    d_stato_riga_commanda = '${d_stato_riga_commanda}',
                    tappo = '${tappo}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${key}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_rigacommandas for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato t_stato_rigacommanda id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `Ruolo aggiornato regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato t_stato_rigacommanda id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato t_stato_rigacommanda presente for id: ${key}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento Ruolo   // metodo 1  -- funziona

exports.updateByid1 = (req,res)=> {

    let key = req.params.id;

    console.log(req.body,`Modifica stato t_stato_rigacommanda id ${key}`);  // visualizzo la struttura dei campi immessi dall't_stato_rigacommanda 

  // definisco la strsql per lettura t_stato_rigacommanda

    let strsql_Inqu = `select * from t_stato_rigacommandas where id= ${key} `;
    
    // definisco 
   let stato = {
            d_stato_t_stato_rigacommanda: req.body.d_stato_t_stato_rigacommanda,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_rigacommandas for key ' + key);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_stato_rigacommandas SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato t_stato_rigacommanda id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato t_stato_rigacommanda aggiornato regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato t_stato_rigacommanda id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato t_stato_rigacommanda presente for id: ${key}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}

// cancellazione ruolo

exports.delete = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`cancellazione stato t_stato_rigacommanda id ${key}`);  // visualizzo la struttura dei campi immessi dall't_stato_rigacommanda 

    // definisco la strsql per lettura t_stato_rigacommanda

    let strsql_Inqu = `select * from t_stato_rigacommandas where id= ${key} `;

    let strsql =  `delete from t_stato_rigacommandas  where id = ${key}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_rigacommandas for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione stato t_stato_rigacommanda id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato t_stato_rigacommanda  id: ${key} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato t_stato_rigacommanda id: ${key} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun stato t_stato_rigacommanda presente for id: ${key}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

