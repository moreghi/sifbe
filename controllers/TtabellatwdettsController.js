// creo i metodi per la gestione dell'

const db = require('../db');

const strSql = "select * from tabella_tw_detts "

exports.getAll = (req,res)=> {
 
    let strsql = strSql;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all tabella_tw_detts');
        }
        if(result.length>0) {
            console.log('lettura elementi tabella  ' + result.length);  

            console.log(`rilevate ${result.length} record  `)
            res.send({
                message:'Situazione attuale telementi tabella ',
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
  
    let strsql = `select * from tabella_tw_detts where id= ${id} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura tabella_tw_detts for id ' + id);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   record  `)
            res.send({
             messagexx:`rilevate ${result.length}  ------- get per id ${id} -------   record `,
                message:`situazione attuale record per id: .....  ${id}`,
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
      let idtab = req.body.idtab;
      let idtabella = req.body.idtabella;
      let descrizione = req.body.descrizione;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  
      let strsql =  `insert into tabella_tw_detts
                  (id,idtab,idtabella,descrizione,key_utenti_operation) 
                  valueS
                  (
                    ${id},${idtab},${idtabella},'${descrizione}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo elemento  su tabella tabella_tw_detts ');
          }
          console.log(result, `result ...... record inserito regolarmente `);
  
        
                  res.send({
                  message: `record inserita regolarmente `,
                  rc: 'ok',
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento Ruolo   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica record  id ${id}`);  // visualizzo la struttura dei campi immessi dall' 

    // definisco la strsql per lettura 

    let strsql_Inqu = `select * from tabella_tw_detts where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idtab = req.body.idtab;
    let idtabella = req.body.idtabella;
    let stato = req.body.stato;
    let descrizione = req.body.descrizione;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update tabella_tw_detts set
                    idtab = ${idtab},
                    idtabella = ${idtabella},
                    descrizione = '${descrizione}',
                    stato = '${stato}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura tabella_tw_detts for id ' + id);
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

    let strsql_Inqu = `select * from tabella_tw_detts where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_: req.body.d_stato_,
            tappo: req.body.tappo,
            id_utenti_operation: req.body.id_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura tabella_tw_detts for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE tabella_tw_detts SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
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

// cancellazione singola

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione tabella id ${id}`);  // visualizzo la struttura dei campi immessi dall' 

    // definisco la strsql per lettura 

    let strsql_Inqu = `select * from tabella_tw_detts where id= ${id} `;

    let strsql =  `delete from tabella_tw_detts  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore in lettura tabella_tw_detts for id ' + id);
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

// cancellazione globale

exports.deleteAll = (req,res)=> {  

  
    let strsql =  `delete from tabella_tw_detts `;
  
       db.query(strsql,(err,result)=> {  
        if(err) {
            console.log(err,'errore in lettura tabella_tw_detts for id ' + id);
            return;
        }
        res.send({ 
            message: `tabella  cancellata globalmente  `,
            rc: 'ok',
            data:null
          });  
       });  

}  
