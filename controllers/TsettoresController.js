const db = require('../db');


exports.getAll = (req,res)=> {
 
    let strsql = 'select * from t_settores where id > 0';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_settores');
        }
        if(result.length>0) {
            console.log('lettura tutti i settori ' + result.length);  

            console.log(`rilevati ${result.length} settori `)
            res.send({
                message:'Situazione attuale Settori',
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
    
    let id = req.params.id;
  
    let strsql = `select * from t_settores where id= ${id} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_settores for id ' + id);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Settori `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${id} -------   Settori`,
                message:`situazione attuale per settore id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });
        }else {
            console.log(`nessun record presente per id: ${id} `); 
            res.send({
                message: `nessun settore presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo settore   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_settore = req.body.d_settore;
      let tappo = req.body.tappo;
      let id_utenti_operation = req.body.id_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into t_settores
                  (id,d_settore,tappo,key_utenti_operation) 
                  valueS
                  (
                     ${id},'${d_settore}','${tappo}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo settore su tabella t_settores ');
          }
          console.log(result, `result ...... Settore inserito regolarmente `);
  
        
                  res.send({
                  message: `Ruolo inserito regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica Settore id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_settores where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_settore = req.body.d_settore;
    let tappo = req.body.tappo;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_settores set
                    d_settore = '${d_settore}',
                    tappo = '${tappo}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_settores for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento settore id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `Ruolo aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente settore id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun settore presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento Ruolo   // metodo 1  -- funziona

exports.updateRuoloByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica settore id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_settores where id= ${id} `;
    
    // definisco 
   let settorenew = {
            d_settore: req.body.d_settore,
            tappo: req.body.tappo,
            id_utenti_operation: req.body.id_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_settores for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_settores SET ? WHERE id = ' + req.params.id, settorenew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento settore id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `settore aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente settore id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun settore pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}

// cancellazione settore

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione settore id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from t_settores where id= ${id} `;

    let strsql =  `delete from t_settores  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_settores for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione settore id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `settore  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente settore id: ${id} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun settore presente for id: ${id}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  


