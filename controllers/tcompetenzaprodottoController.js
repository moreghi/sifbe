// creo i metodi per la gestione dell'

const db = require('../db');


exports.getAll = (req,res)=> {
 
    let strsql = 'select * from t_competenza_prodottos';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_competenza_prodottos');
        }
        if(result.length>0) {
            console.log('lettura tutte le competenze  ' + result.length);  

            console.log(`rilevate ${result.length} competenze  `)
            res.send({
                message:'Situazione attuale competenze ',
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


// lettura singola competenza
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
  
    let strsql = `select * from t_competenza_prodottos where id= ${id} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_competenza_prodottos for id ' + id);
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   competenze  `)
            res.send({
             messagexx:`rilevate ${result.length}  ------- get per id ${id} -------   competenze `,
                message:`situazione attuale per ruolo id: .....  ${id}`,
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

// creazione nuovo ruolo   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo ');  // visualizzo la struttura dei campi immessi dall' 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_competenza = req.body.d_competenza;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
    
  */
  
      let strsql =  `insert into t_competenza_prodottos
                  (id,d_competenza,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_competenza}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova competenza  su tabella t_competenza_prodottos ');
          }
          console.log(result, `result ...... competenza inserita regolarmente `);
  
        
                  res.send({
                  message: `competenza inserita regolarmente `,
                  rc: 'ko',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica competenza  id ${id}`);  // visualizzo la struttura dei campi immessi dall' 

    // definisco la strsql per lettura 

    let strsql_Inqu = `select * from t_competenza_prodottos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_competenza = req.body.d_competenza;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_competenza_prodottos set
                    d_competenza = '${d_competenza}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_competenza_prodottos for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento competenza  id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `competenza aggiornata regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente competenza  id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessuna competenza  presente for id: ${id}  -- aggiornamento non possibile`,
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

    let strsql_Inqu = `select * from t_competenza_prodottos where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_: req.body.d_stato_,
            tappo: req.body.tappo,
            id_utenti_operation: req.body.id_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_competenza_prodottos for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_competenza_prodottos SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
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

    console.log(req.body,`cancellazione competenza id ${id}`);  // visualizzo la struttura dei campi immessi dall' 

    // definisco la strsql per lettura 

    let strsql_Inqu = `select * from t_competenza_prodottos where id= ${id} `;

    let strsql =  `delete from t_competenza_prodottos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore in lettura t_competenza_prodottos for id ' + id);
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
                        message: `competenza   id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente competenza  id: ${id} -- cancellazione non possibile`);
                    res.send({
                        message: `nessuna competenza presente for id: ${id}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

exports.getLastId = (req,res)=> {
    
    let strSql = 'select * from t_competenza_prodottos';

    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getLastId ');
     
    strsql =  strSql + ' where `t_competenza_prodottos`.`id` < ' + tappo + ' order by `t_competenza_prodottos`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all prodottos - erro: ${err}`,
                data:null
            });
            return;  
        }
        if(result.length>0) {
            console.log('abc - lettura ultimo id' + result.length);  

            console.log(`rilevati ${result.length} record `)
            res.status(200).send({ 
                message:'Situazione attuale ultimo id',
                number:  result.length,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuno stato prodotto presente  `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}