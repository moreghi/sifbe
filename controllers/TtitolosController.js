// creo i metodi per la gestione dell'

const db = require('../db');

const strSql = "select * from t_titolos "

exports.getAll = (req,res)=> {
 
    let strsql = strSql + ' where id < 90';

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_titolos');
        }
        if(result.length>0) {
            console.log('lettura tutte i titoli  ' + result.length);  

            console.log(`rilevate ${result.length} tipolgie  `)
            res.send({
                message:'Situazione attuale titoli ',
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

// lettura singola titolo
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
  
    let strsql = `select * from t_titolos where id= ${id} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_titolos for id ' + id);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   titoli  `)
            res.send({
             messagexx:`rilevate ${result.length}  ------- get per id ${id} -------   titoli `,
                message:`situazione attuale per titolo id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });
        }else {
            console.log(`nessun record presente per id: ${id} `); 
            res.send({
                message: `nessun ruolo presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo titolo   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo ');  // visualizzo la struttura dei campi immessi dall' 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_titolo = req.body.d_titolo;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
    
  */
  
      let strsql =  `insert into t_titolos
                  (id,d_titolo,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_titolo}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo titolo  su tabella t_titolos ');
          }
          console.log(result, `result ...... Titolo inserito regolarmente `);
  
        
                  res.send({
                  message: `Titolo inserita regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica Titolo  id ${id}`);  // visualizzo la struttura dei campi immessi dall' 

    // definisco la strsql per lettura 

    let strsql_Inqu = `select * from t_titolos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_titolo = req.body.d_titolo;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_titolos set
                    d_titolo = '${d_titolo}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_titolos for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento titolo  id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `Tipologia aggiornata regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente titolo  id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessuna titolo  presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento Ruolo   // metodo 1  -- funziona

exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica stato  id ${id}`);  // visualizzo la struttura dei campi immessi dall' 

  // definisco la strsql per lettura 

    let strsql_Inqu = `select * from t_titolos where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_: req.body.d_stato_,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_titolos for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_titolos SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato  id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato  aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato  id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato  presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}

// cancellazione ruolo

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione titolo id ${id}`);  // visualizzo la struttura dei campi immessi dall' 

    // definisco la strsql per lettura 

    let strsql_Inqu = `select * from t_titolos where id= ${id} `;

    let strsql =  `delete from t_titolos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore in lettura t_titolos for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione stato  id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `titolo   id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente titolo  id: ${id} -- cancellazione non possibile`);
                    res.send({
                        message: `nessuna titolo presente for id: ${id}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

