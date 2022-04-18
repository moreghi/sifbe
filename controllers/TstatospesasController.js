// creo i metodi per la gestione dell'spesa

const db = require('../db');


exports.getAll = (req,res)=> {
 
    let strsql = 'select * from t_stato_spesas';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_stato_spesas');
        }
        if(result.length>0) {
            console.log('lettura tutti gli stati spesa ' + result.length);  

            console.log(`rilevati ${result.length} stati spesa `)
            res.send({
                message:'Situazione attuale stati spesa',
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

// lettura singolo spesa
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
  
    let strsql = `select * from t_stato_spesas where id= ${id} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_stato_spesas for id ' + id);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Stati spesa `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${id} -------   Stati spesa`,
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
    
    //  console.log(req.body,'Creazione nuovo spesa');  // visualizzo la struttura dei campi immessi dall'spesa 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_stato_spesa = req.body.d_stato_spesa;
      let tappo = req.body.tappo;
      let key_utenti_operation = req.body.key_utenti_operation;
   
      let strsql =  `insert into t_stato_spesas
                  (id,d_stato_spesa,tappo,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_stato_spesa}','${tappo}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo stato spesa su tabella t_stato_spesas ');
          }
          console.log(result, `result ...... Ruolo inserito regolarmente `);
  
        
                  res.send({
                  message: `Stato Spesa inserito regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica Stato spesa id ${id}`);  // visualizzo la struttura dei campi immessi dall'spesa 

    // definisco la strsql per lettura spesa

    let strsql_Inqu = `select * from t_stato_spesas where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_stato_spesa = req.body.d_stato_spesa;
    let tappo = req.body.tappo;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_stato_spesas set
                    d_stato_spesa = '${d_stato_spesa}',
                    tappo = '${tappo}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_spesas for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato spesa id: ${id}`);
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
                    console.log(`----- inesistente stato spesa id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato spesa presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica stato spesa id ${id}`);  // visualizzo la struttura dei campi immessi dall'spesa 

  // definisco la strsql per lettura spesa

    let strsql_Inqu = `select * from t_stato_spesas where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_spesa: req.body.d_stato_spesa,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_spesas for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_stato_spesas SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato spesa id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato spesa aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato spesa id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato spesa presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`cancellazione stato spesa id ${id}`);  // visualizzo la struttura dei campi immessi dall'spesa 

    // definisco la strsql per lettura spesa

    let strsql_Inqu = `select * from t_stato_spesas where id= ${id} `;

    let strsql =  `delete from t_stato_spesas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_spesas for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione stato spesa id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato spesa  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato spesa id: ${id} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun stato spesa presente for id: ${id}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  


exports.getLastId = (req,res)=> {
    
    let strSql = 'select * from t_stato_spesas';

    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getLastId ');
     
    strsql =  strSql + ' where `t_stato_spesas`.`id` < ' + tappo + ' order by `t_stato_spesas`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all spesas - erro: ${err}`,
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
                message: `nessuno stato spesa presente  `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}


// lettura singolo spesa
exports.getAllbyTipo = (req,res)=> {
    
    let tipo = req.params.tipo;
    let tipojolly = '$';
    let strsql = '';
    if(tipo === 'A') {
        strsql = `select * from t_stato_spesas where tipo = '${tipo}' OR tipo = '${tipojolly}'`;
    }
    if(tipo === 'P') {  // prenso tutte le causali perchè posso fare modifica di un acquisto o pagare quindi servono le causali globali
        strsql = `select * from t_stato_spesas order by tipo asc`;
    }

    console.log('getAllbyTipo +++++++++++++++++++  ')+ strsql;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_stato_spesas for tipo ' + tipo);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Stati spesa `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per tipo ${tipo} -------   Stati spesa`,
                message:`situazione attuale per stato tipo: .....  ${tipo}`,
                rc: 'ok',
                data:result 
            });
        }else {
            console.log(`nessun record presente per tipo: ${tipo} `); 
            res.send({
                message: `nessun stato presente for tipo: ${tipo}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}