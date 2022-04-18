// creo i metodi per la gestione della tabella t_ruolo_days

const db = require('../db');


exports.getAll = (req,res)=> {
 
    let strsql = 'select * from t_ruolo_days';

    console.log('tRuoloDay - ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_ruolo_days');
        }
        if(result.length>0) {
            console.log('lettura tutti i ruoli ' + result.length);  

            console.log(`rilevati ${result.length} ruoli `)
            res.send({
                message:'Situazione attuale Ruoliday',
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
  
    let strsql = `select * from t_ruolo_days where id= ${key} `;

    console.log('backend - ---  tRuoloDay--    getbyid ' + strsql);
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_ruolo_days for key ' + key);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Ruoli `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${key} -------   Ruoli`,
                message:`situazione attuale per ruoloday id: .....  ${key}`,
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
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
      let d_ruolo_day = req.body.d_ruolo_day;
      let tappo = req.body.tappo;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into t_ruolo_days
                  (d_ruolo_day,tappo,key_utenti_operation) 
                  valueS
                  (
                     '${d_ruolo_day}','${tappo}','${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo ruolo su tabella t_ruolo_days ');
          }
          console.log(result, `result ...... ruoloday inserito regolarmente `);
  
        
                  res.send({
                  message: `ruoloday inserito regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updatebyid = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`Modifica ruoloday id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_ruolo_days where id= ${key} `;

    // definisco le variabili per aggiornamento campi

    let d_ruolo_day = req.body.d_ruolo_day;
    let tappo = req.body.tappo;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_ruolo_days set
                    d_ruolo_day = '${d_ruolo_day}',
                    tappo = '${tappo}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${key}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_ruolo_days for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento ruoloday id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `ruoloday aggiornato regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente ruolo id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun ruoloday presente for id: ${key}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento Ruolo   // metodo 1  -- funziona

exports.updatebyid1 = (req,res)=> {

    let key = req.params.id;

    console.log(req.body,`Modifica ruoloday id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_ruolo_days where id= ${key} `;
    
    // definisco 
   let ruolonew = {
            d_ruolo_web: req.body.d_ruolo_web,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_ruolo_days for key ' + key);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_ruolo_days SET ? WHERE id = ' + req.params.id, ruolonew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento ruoloday id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `ruoloday aggiornato regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente ruoloday id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun ruoloday pressente for id: ${key}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}

// cancellazione ruolo

exports.deletebyid = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`cancellazione ruoloday id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_ruolo_days where id= ${key} `;

    let strsql =  `delete from t_ruolo_days  where id = ${key}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_ruolo_days for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione ruoloday id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `ruoloday  id: ${key} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente ruoloday id: ${key} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun ruoloday presente for id: ${key}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

