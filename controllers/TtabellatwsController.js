// creo i metodi per la gestione dell'

const db = require('../db');

const strSql = "select * from tabella_tws "

exports.getAll = (req,res)=> {
 
    let strsql = strSql;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all tabella_tws');
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
  
    let strsql = `select * from tabella_tws where id= ${id} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura tabella_tws for id ' + id);
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
      let idTab = req.body.idTab;
      let nametab = req.body.nametab;
      let numNew = req.body.numNew;
      let numUpd = req.body.numUpd;
      let numDlt = req.body.numDlt; 
      let key_utenti_operation = req.body.key_utenti_operation;
  
  
      let strsql =  `insert into tabella_tws
                  (id,idTab,nametab,numNew,numUpd,numDlt,key_utenti_operation) 
                  valueS
                  (
                    ${id},${idTab},'${nametab}',${numNew},${numUpd},${numDlt},${key_utenti_operation} 
                  )`;
      
    
            console.log('be - createnew: ----------------------------------------------  ' + strsql);


      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo elemento  su tabella tabella_tws ');
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

    let strsql_Inqu = `select * from tabella_tws where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idTab = req.body.idTab;
    let nometab = req.body.nometab;
    let numNew = req.body.numNew;
    let numUpd = req.body.numUpd;
    let numDlt = req.body.numDlt; 
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update tabella_tws set
                    idTab = ${idTab},
                    numNew = ${numNew},
                    numUpd = ${numUpd},
                    numDlt = ${numDlt},
                    nometab = '${nometab}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura tabella_tws for id ' + id);
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

    let strsql_Inqu = `select * from tabella_tws where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_: req.body.d_stato_,
            tappo: req.body.tappo,
            id_utenti_operation: req.body.id_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura tabella_tws for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE tabella_tws SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
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

    let strsql_Inqu = `select * from tabella_tws where id= ${id} `;

    let strsql =  `delete from tabella_tws  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore in lettura tabella_tws for id ' + id);
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

    console.log('bk - tabellatws - deleteAll');
  
    let strsql =  `delete from tabella_tws `;
  
       db.query(strsql,(err,result)=> {  
        if(err) {
            console.log(err,'errore in lettura tabella_tws for id ' + id);
            return;
        }
        console.log('tabellatw -------------- delete all -----------------');
        res.send({ 
            message: `tabella  cancellata globalmente  `,
            rc: 'ok',
            data:null
          });  
       });  

}  
