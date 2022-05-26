// creo i metodi per la gestione dell'utenti

const db = require('../db');


exports.getAll = (req,res)=> {
 
    let strsql = 'select * from t_stato_utentis';

    console.log('tstatoUtente - ' + strsql);


    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_stato_utentis');
        }
        if(result.length>0) {
            console.log('lettura tutti gli stati utenti ' + result.length);  

            console.log(`rilevati ${result.length} stati utenti `)
            res.send({
                message:'Situazione attuale stati utenti',
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
  
    let strsql = `select * from t_stato_utentis where id= ${key} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_stato_utentis for key ' + key);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Stati utenti `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${key} -------   Stati utenti`,
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
    
    //  console.log(req.body,'Creazione nuovo utenti');  // visualizzo la struttura dei campi immessi dall'utenti 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_stato_utenti = req.body.d_stato_utenti;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into t_stato_utentis
                  (id,d_stato_utenti,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_stato_utenti}','${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo stato utenti su tabella t_stato_utentis ');
          }
          console.log(result, `result ...... Ruolo inserito regolarmente `);
  
        
                  res.send({
                  message: `Stato Utente inserito regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`Modifica Stato utenti id ${key}`);  // visualizzo la struttura dei campi immessi dall'utenti 

    // definisco la strsql per lettura utenti

    let strsql_Inqu = `select * from t_stato_utentis where id= ${key} `;

    // definisco le variabili per aggiornamento campi

    let d_stato_utenti = req.body.d_stato_utenti;
    let tappo = req.body.tappo;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_stato_utentis set
                    d_stato_utenti = '${d_stato_utenti}',
                    tappo = '${tappo}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${key}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_utentis for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato utenti id: ${key}`);
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
                    console.log(`----- inesistente stato utenti id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato utenti presente for id: ${key}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica stato utenti id ${key}`);  // visualizzo la struttura dei campi immessi dall'utenti 

  // definisco la strsql per lettura utenti

    let strsql_Inqu = `select * from t_stato_utentis where id= ${key} `;
    
    // definisco 
   let stato = {
            d_stato_utenti: req.body.d_stato_utenti,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_utentis for key ' + key);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_stato_utentis SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato utenti id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato utenti aggiornato regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato utenti id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato utenti presente for id: ${key}  -- aggiornamento non possibile`,
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

    console.log(req.body,`cancellazione stato utenti id ${key}`);  // visualizzo la struttura dei campi immessi dall'utenti 

    // definisco la strsql per lettura utenti

    let strsql_Inqu = `select * from t_stato_utentis where id= ${key} `;

    let strsql =  `delete from t_stato_utentis  where id = ${key}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_utentis for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione stato utenti id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato utenti  id: ${key} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato utenti id: ${key} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun stato utenti presente for id: ${key}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  