// creo i metodi per la gestione dell'Magazzino

const db = require('../db');


exports.getAll = (req,res)=> {
 
    let strsql = 'select * from t_stato_magazzinos';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_stato_magazzinos');
        }
        if(result.length>0) {
            console.log('lettura tutti gli stati Magazzino ' + result.length);  

            console.log(`rilevati ${result.length} stati Magazzino `)
            res.send({
                message:'Situazione attuale stati Magazzino',
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

// lettura singolo Magazzino
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
  
    let strsql = `select * from t_stato_magazzinos where id= ${id} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_stato_magazzinos for id ' + id);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Stati Magazzino `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${id} -------   Stati Magazzino`,
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
    
    //  console.log(req.body,'Creazione nuovo Magazzino');  // visualizzo la struttura dei campi immessi dall'Magazzino 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_stato_magazzino = req.body.d_stato_magazzino;
      let key_utenti_operation = req.body.key_utenti_operation;
   
      let strsql =  `insert into t_stato_magazzinos
                  (id,d_stato_magazzino,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_stato_magazzino}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo stato Magazzino su tabella t_stato_magazzinos ');
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

    console.log(req.body,`Modifica Stato Magazzino id ${id}`);  // visualizzo la struttura dei campi immessi dall'Magazzino 

    // definisco la strsql per lettura Magazzino

    let strsql_Inqu = `select * from t_stato_magazzinos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_stato_magazzino = req.body.d_stato_magazzino;
    let tappo = req.body.tappo;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update t_stato_magazzinos set
                    d_stato_magazzino = '${d_stato_magazzino}',
                    tappo = '${tappo}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

                    console.log('bk - statoMagazzino - strsql : ' + strsql);

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_magazzinos for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato Magazzino id: ${id}`);
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
                    console.log(`----- inesistente stato Magazzino id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato Magazzino presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica stato Magazzino id ${id}`);  // visualizzo la struttura dei campi immessi dall'Magazzino 

  // definisco la strsql per lettura Magazzino

    let strsql_Inqu = `select * from t_stato_magazzinos where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_Magazzino: req.body.d_stato_Magazzino,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_magazzinos for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_stato_magazzinos SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato Magazzino id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato Magazzino aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato Magazzino id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato Magazzino presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`cancellazione stato Magazzino id ${id}`);  // visualizzo la struttura dei campi immessi dall'Magazzino 

    // definisco la strsql per lettura Magazzino

    let strsql_Inqu = `select * from t_stato_magazzinos where id= ${id} `;

    let strsql =  `delete from t_stato_magazzinos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_magazzinos for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione stato Magazzino id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato Magazzino  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato Magazzino id: ${id} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun stato Magazzino presente for id: ${id}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  


exports.getLastId = (req,res)=> {
    
    let strSql = 'select * from t_stato_magazzinos';

    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getLastId ');
     
    strsql =  strSql + ' where `t_stato_magazzinos`.`id` < ' + tappo + ' order by `t_stato_magazzinos`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all Magazzinos - erro: ${err}`,
                data:null
            });
            return;  
        }
        if(result.length>0) {
            console.log('abc - lettura ultimo id' + result.length);  

            console.log(`rilevati ${result.length} tabella Magazzino  `)
            res.status(200).send({ 
                message:'Situazione attuale ultimo id',
                number:  result.length,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuno stato Magazzino presente  `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}