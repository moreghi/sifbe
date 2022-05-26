// creo i metodi per la gestione dell'

const db = require('../db');


exports.getAll = (req,res)=> {
 
    let strsql = 'select * from t_categoria_prodottos';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_categoria_prodottos');
        }
        if(result.length>0) {
            console.log('lettura tutte le categorie  ' + result.length);  

            console.log(`rilevate ${result.length} categorie  `)
            res.send({
                message:'Situazione attuale categorie ',
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


// lettura singola categoria
exports.getbyid = (req,res)=> {
    
    let key = req.params.id;
  
    let strsql = `select * from t_categoria_prodottos where id= ${key} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_categoria_prodottos for key ' + key);
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   tipolgie  `)
            res.send({
             messagexx:`rilevate ${result.length}  ------- get per id ${key} -------   tipolgie `,
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
    
    //  console.log(req.body,'Creazione nuovo ');  // visualizzo la struttura dei campi immessi dall' 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_categoria = req.body.d_categoria;
      let stato = req.body.stato;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
    
  */
  
      let strsql =  `insert into t_categoria_prodottos
                  (id,d_categoria,stato,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_categoria}',${stato},${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova categoria  su tabella t_categoria_prodottos ');
          }
          console.log(result, `result ...... categoria inserita regolarmente `);
  
        
                  res.send({
                  message: `categoria inserita regolarmente `,
                  rc: 'ko',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`Modifica categoria  id ${key}`);  // visualizzo la struttura dei campi immessi dall' 

    // definisco la strsql per lettura 

    let strsql_Inqu = `select * from t_categoria_prodottos where id= ${key} `;

    // definisco le variabili per aggiornamento campi

    let d_categoria = req.body.d_categoria;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update t_categoria_prodottos set
                    d_categoria = '${d_categoria}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${key}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_categoria_prodottos for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento categoria  id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `categoria aggiornata regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente categoria  id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessuna categoria  presente for id: ${key}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica stato  id ${key}`);  // visualizzo la struttura dei campi immessi dall' 

  // definisco la strsql per lettura 

    let strsql_Inqu = `select * from t_categoria_prodottos where id= ${key} `;
    
    // definisco 
   let stato = {
            d_stato_: req.body.d_stato_,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_categoria_prodottos for key ' + key);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_categoria_prodottos SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato  id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato  aggiornato regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato  id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato  presente for id: ${key}  -- aggiornamento non possibile`,
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

    console.log(req.body,`cancellazione categoria id ${key}`);  // visualizzo la struttura dei campi immessi dall' 

    // definisco la strsql per lettura 

    let strsql_Inqu = `select * from t_categoria_prodottos where id= ${key} `;

    let strsql =  `delete from t_categoria_prodottos  where id = ${key}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore in lettura t_categoria_prodottos for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione stato  id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `categoria   id: ${key} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente categoria  id: ${key} -- cancellazione non possibile`);
                    res.send({
                        message: `nessuna categoria presente for id: ${key}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

exports.getLastId = (req,res)=> {
    
    let strSql = 'select * from t_categoria_prodottos';

    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getLastId ');
     
    strsql =  strSql + ' where `t_categoria_prodottos`.`id` < ' + tappo + ' order by `t_categoria_prodottos`.`id` desc';  
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