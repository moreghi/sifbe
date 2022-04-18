// creo i metodi per la gestione dell'fornitore

const db = require('../db');


exports.getAll = (req,res)=> {
 
    let strsql = 'select * from t_stato_fornitores';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_stato_fornitores');
        }
        if(result.length>0) {
            console.log('lettura tutti gli stati fornitore ' + result.length);  

            console.log(`rilevati ${result.length} stati fornitore `)
            res.send({
                message:'Situazione attuale stati fornitore',
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

// lettura singolo fornitore
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
  
    let strsql = `select * from t_stato_fornitores where id= ${id} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_stato_fornitores for id ' + id);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Stati fornitore `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${id} -------   Stati fornitore`,
                message:`situazione attuale per stato id: .....  ${id}`,
                data:result[0]
            });
        }else {
            console.log(`nessun record presente per id: ${id} `); 
            res.send({
                message: `nessun stato presente for id: ${id}`,
                data:null
            });
        }

    });  
}

// creazione nuovo stato   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo fornitore');  // visualizzo la struttura dei campi immessi dall'fornitore 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_stato_fornitore = req.body.d_stato_fornitore;
      let tappo = req.body.tappo;
      let id_utenti_operation = req.body.id_utenti_operation;
   
      let strsql =  `insert into t_stato_fornitores
                  (id,d_stato_fornitore,tappo,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_stato_fornitore}','${tappo}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo stato fornitore su tabella t_stato_fornitores ');
          }
          console.log(result, `result ...... Ruolo inserito regolarmente `);
  
        
                  res.send({
                  message: `Stato Fornitore inserito regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica Stato fornitore id ${id}`);  // visualizzo la struttura dei campi immessi dall'fornitore 

    // definisco la strsql per lettura fornitore

    let strsql_Inqu = `select * from t_stato_fornitores where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_stato_fornitore = req.body.d_stato_fornitore;
    let tappo = req.body.tappo;
    let id_utenti_operation = req.body.id_utenti_operation;


    let strsql =  `update t_stato_fornitores set
                    d_stato_fornitore = '${d_stato_fornitore}',
                    tappo = '${tappo}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_fornitores for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato fornitore id: ${id}`);
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
                    console.log(`----- inesistente stato fornitore id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato fornitore presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica stato fornitore id ${id}`);  // visualizzo la struttura dei campi immessi dall'fornitore 

  // definisco la strsql per lettura fornitore

    let strsql_Inqu = `select * from t_stato_fornitores where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_fornitore: req.body.d_stato_fornitore,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_fornitores for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_stato_fornitores SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato fornitore id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato fornitore aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato fornitore id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato fornitore presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`cancellazione stato fornitore id ${id}`);  // visualizzo la struttura dei campi immessi dall'fornitore 

    // definisco la strsql per lettura fornitore

    let strsql_Inqu = `select * from t_stato_fornitores where id= ${id} `;

    let strsql =  `delete from t_stato_fornitores  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_fornitores for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione stato fornitore id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato fornitore  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato fornitore id: ${id} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun stato fornitore presente for id: ${id}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  


exports.getLastId = (req,res)=> {
    
    let strSql = 'select * from t_stato_fornitores';

    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getLastId ');
     
    strsql =  strSql + ' where `t_stato_fornitores`.`id` < ' + tappo + ' order by `t_stato_fornitores`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all fornitores - erro: ${err}`,
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
                message: `nessuno stato fornitore presente  `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}