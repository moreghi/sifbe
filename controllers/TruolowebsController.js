// creo i metodi per la gestione della tabella t_ruolo_webs

const db = require('../db');


exports.getAll = (req,res)=> {
 
    let strsql = 'select * from t_ruolo_webs';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_ruolo_webs');
        }
        if(result.length>0) {
            console.log('lettura tutti i ruoli ' + result.length);  

            console.log(`rilevati ${result.length} ruoli `)
            res.send({
                message:'Situazione attuale RuoliWeb',
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
  
    let strsql = `select * from t_ruolo_webs where id= ${key} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_ruolo_webs for key ' + key);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Ruoli `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${key} -------   Ruoli`,
                message:`situazione attuale per ruoloweb id: .....  ${key}`,
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
      let d_ruolo_web = req.body.d_ruolo-web;
      let tappo = req.body.tappo;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into t_ruolo_webs
                  (d_ruolo-web,tappo,key_utenti_operation) 
                  valueS
                  (
                     '${d_ruolo_web}','${tappo}','${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo ruolo su tabella t_ruolo_webs ');
          }
          console.log(result, `result ...... Ruoloweb inserito regolarmente `);
  
        
                  res.send({
                  message: `Ruoloweb inserito regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updatebyid = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`Modifica Ruoloweb id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_ruolo_webs where id= ${key} `;

    // definisco le variabili per aggiornamento campi

    let d_ruolo_web = req.body.d_ruolo_web;
    let tappo = req.body.tappo;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_ruolo_webs set
                    d_ruolo_web = '${d_ruolo_web}',
                    tappo = '${tappo}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${key}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_ruolo_webs for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento ruoloweb id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `Ruoloweb aggiornato regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente ruolo id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun ruoloweb presente for id: ${key}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica ruoloweb id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_ruolo_webs where id= ${key} `;
    
    // definisco 
   let ruolonew = {
            d_ruolo_web: req.body.d_ruolo_web,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_ruolo_webs for key ' + key);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_ruolo_webs SET ? WHERE id = ' + req.params.id, ruolonew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento ruoloweb id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `ruoloweb aggiornato regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente ruoloweb id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun ruoloweb pressente for id: ${key}  -- aggiornamento non possibile`,
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

    console.log(req.body,`cancellazione ruoloweb id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_ruolo_webs where id= ${key} `;

    let strsql =  `delete from t_ruolo_webs  where id = ${key}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_ruolo_webs for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione ruoloweb id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `ruoloweb  id: ${key} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente ruoloweb id: ${key} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun ruoloweb presente for id: ${key}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

