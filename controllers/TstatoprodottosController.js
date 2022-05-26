// creo i metodi per la gestione dell'prodotto

const db = require('../db');


exports.getAll = (req,res)=> {
 
    let strsql = 'select * from t_stato_prodottos';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_stato_prodottos');
        }
        if(result.length>0) {
            console.log('lettura tutti gli stati prodotto ' + result.length);  

            console.log(`rilevati ${result.length} stati prodotto `)
            res.send({
                message:'Situazione attuale stati prodotto',
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
  
    let strsql = `select * from t_stato_prodottos where id= ${id} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_stato_prodottos for id ' + id);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Stati prodotto `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${id} -------   Stati prodotto`,
                message:`situazione attuale per stato id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });
        }else {
            console.log(`nessun record presente per id: ${id} `); 
            res.send({
                message: `nessun stato presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo stato   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo prodotto');  // visualizzo la struttura dei campi immessi dall'prodotto 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_stato_prodotto = req.body.d_stato_prodotto;
      let tappo = req.body.tappo;
      let key_utenti_operation = req.body.key_utenti_operation;
   
      let strsql =  `insert into t_stato_prodottos
                  (id,d_stato_prodotto,tappo,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_stato_prodotto}','${tappo}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo stato prodotto su tabella t_stato_prodottos ');
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

    let id = req.params.id;

    console.log(req.body,`Modifica Stato prodotto id ${id}`);  // visualizzo la struttura dei campi immessi dall'prodotto 

    // definisco la strsql per lettura prodotto

    let strsql_Inqu = `select * from t_stato_prodottos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_stato_prodotto = req.body.d_stato_prodotto;
    let tappo = req.body.tappo;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_stato_prodottos set
                    d_stato_prodotto = '${d_stato_prodotto}',
                    tappo = '${tappo}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_prodottos for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato prodotto id: ${id}`);
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
                    console.log(`----- inesistente stato prodotto id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato prodotto presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica stato prodotto id ${id}`);  // visualizzo la struttura dei campi immessi dall'prodotto 

  // definisco la strsql per lettura prodotto

    let strsql_Inqu = `select * from t_stato_prodottos where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_prodotto: req.body.d_stato_prodotto,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_prodottos for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_stato_prodottos SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato prodotto id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato prodotto aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato prodotto id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato prodotto presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}

// cancellazione stato

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione stato prodotto id ${id}`);  // visualizzo la struttura dei campi immessi dall'prodotto 

    // definisco la strsql per lettura prodotto

    let strsql_Inqu = `select * from t_stato_prodottos where id= ${id} `;

    let strsql =  `delete from t_stato_prodottos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_prodottos for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione stato prodotto id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato prodotto  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato prodotto id: ${id} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun stato prodotto presente for id: ${id}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  


exports.getLastId = (req,res)=> {
    
    let strSql = 'select * from t_stato_prodottos';

    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getLastId ');
     
    strsql =  strSql + ' where `t_stato_prodottos`.`id` < ' + tappo + ' order by `t_stato_prodottos`.`id` desc';  
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

            console.log(`rilevati ${result.length} prodotti `)
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

















