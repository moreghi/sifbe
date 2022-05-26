// creo i metodi per la gestione dell'

const db = require('../db');

const strSql = "select * from tabella_ts "

exports.getAll = (req,res)=> {
 
    let strsql = strSql;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all tabella_ts');
        }
        if(result.length>0) {
            console.log('lettura tutte i tabelle  ' + result.length);  

            console.log(`rilevate ${result.length} tipolgie  `)
            res.send({
                message:'Situazione attuale tabelle ',
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

// lettura singola tabella
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
  
    let strsql = `select * from tabella_ts where id= ${id} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura tabella_ts for id ' + id);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   tabelle  `)
            res.send({
             messagexx:`rilevate ${result.length}  ------- get per id ${id} -------   tabelle `,
                message:`situazione attuale per tabella id: .....  ${id}`,
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

// creazione nuovo tabella   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo ');  // visualizzo la struttura dei campi immessi dall' 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let nametab = req.body.nametab;
      let d_tabella = req.body.d_tabella;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  
      let strsql =  `insert into tabella_ts
                  (id,d_tabella,nametab,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_tabella}','${nametab}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo tabella  su tabella tabella_ts ');
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

    let strsql_Inqu = `select * from tabella_ts where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let nametab = req.body.nametab;
    let d_tabella = req.body.d_tabella;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update tabella_ts set
                    d_tabella = '${d_tabella}',
                    nametab = '${nametab}',
                    id_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura tabella_ts for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento tabella  id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `tabella aggiornata regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente tabella  id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessuna tabella  presente for id: ${id}  -- aggiornamento non possibile`,
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

    let strsql_Inqu = `select * from tabella_ts where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_: req.body.d_stato_,
            tappo: req.body.tappo,
            id_utenti_operation: req.body.id_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura tabella_ts for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE tabella_ts SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
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

    console.log(req.body,`cancellazione tabella id ${id}`);  // visualizzo la struttura dei campi immessi dall' 

    // definisco la strsql per lettura 

    let strsql_Inqu = `select * from tabella_ts where id= ${id} `;

    let strsql =  `delete from tabella_ts  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore in lettura tabella_ts for id ' + id);
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
                        message: `tabella   id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente tabella  id: ${id} -- cancellazione non possibile`);
                    res.send({
                        message: `nessuna tabella presente for id: ${id}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

