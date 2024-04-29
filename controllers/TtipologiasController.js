// creo i metodi per la gestione dell'

const db = require('../db');

const strSql = "select * from t_tipologias "

exports.getAll = (req,res)=> {
 
    let strsql = strSql + ' where id < 90';

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_tipologias');
        }
        if(result.length>0) {
            console.log('lettura tutte le tipologie  ' + result.length);  

            console.log(`rilevate ${result.length} tipolgie  `)
            res.send({
                message:'Situazione attuale tipologie ',
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

exports.getAllmenu = (req,res)=> {
 
    let strsql = 'SELECT * FROM `t_tipologias` WHERE `t_tipologias`.`id` > 0 and `t_tipologias`.`id` < 90 ';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_tipologias for menu');
        }
        if(result.length>0) {
            console.log('lettura tutte le tipologie for menu ' + result.length);  

            console.log(`rilevate ${result.length} tipolgie  `)
            res.send({
                message:'Situazione attuale tipologie ',
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


// lettura singola tipologia
exports.getbyid = (req,res)=> {
    
    let key = req.params.id;
  
    let strsql = `select * from t_tipologias where id= ${key} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_tipologias for key ' + key);
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
      let d_tipologia = req.body.d_tipologia;
      let stato = req.body.stato;
      let ordinemenu = req.body.ordinemenu;
      let photo = req.body.photo;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
    
  */
  
      let strsql =  `insert into t_tipologias
                  (id,d_tipologia,stato,ordinemenu,photo,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_tipologia}',${stato},${ordinemenu},'${photo}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova tipologia  su tabella t_tipologias ');
          }
          console.log(result, `result ...... Tipologia inserita regolarmente `);
  
        
                  res.send({
                  message: `Tipologia inserita regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let key = req.params.id;

    console.log(req.body,`Modifica Tipologia  id ${key}`);  // visualizzo la struttura dei campi immessi dall' 

    // definisco la strsql per lettura 

    let strsql_Inqu = `select * from t_tipologias where id= ${key} `;

    // definisco le variabili per aggiornamento campi

    let d_tipologia = req.body.d_tipologia;
    let stato = req.body.stato;
    let ordinemenu = req.body.ordinemenu;
    let photo = req.body.photo;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_tipologias set
                    d_tipologia = '${d_tipologia}',
                    stato = '${stato}',
                    ordinemenu = '${ordinemenu}',
                    photo = '${photo}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${key}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_tipologias for key ' + key);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento tipologia  id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `Tipologia aggiornata regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente tipologia  id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessuna tipologia  presente for id: ${key}  -- aggiornamento non possibile`,
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

    let strsql_Inqu = `select * from t_tipologias where id= ${key} `;
    
    // definisco 
   let stato = {
            d_stato_: req.body.d_stato_,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_tipologias for key ' + key);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_tipologias SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
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

    console.log(req.body,`cancellazione tipologia id ${key}`);  // visualizzo la struttura dei campi immessi dall' 

    // definisco la strsql per lettura 

    let strsql_Inqu = `select * from t_tipologias where id= ${key} `;

    let strsql =  `delete from t_tipologias  where id = ${key}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore in lettura t_tipologias for key ' + key);
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
                        message: `tipologia   id: ${key} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente tipologia  id: ${key} -- cancellazione non possibile`);
                    res.send({
                        message: `nessuna tipologia presente for id: ${key}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

exports.getAllbyStato = (req,res)=> {
 
    let stato = req.params.stato;
     
    let strsql = 'SELECT * FROM `t_tipologias` WHERE `t_tipologias`.`stato` = ' + stato;
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_tipologias by stato ' + stato);
        }
        if(result.length>0) {
            console.log('lettura tutte le tipologie  by stato  ' + result.length);  

            console.log(`rilevate ${result.length} tipolgie  `)
            res.send({
                message:'Situazione attuale tipologie ',
                rc: 'ok',
                number: result.length,
                data:result
            });
        }else {
            console.log('nessun record presente ' + result.length); 
            res.send({
                message:'nessun record presente',
                rc: 'nf',
                number: 0,
                data:null
            });
        }

    });
}
