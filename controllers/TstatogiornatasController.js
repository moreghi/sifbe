// creo i metodi per la gestione dell'Giornata

const db = require('../db');


exports.getAll = (req,res)=> {
 
    let strsql = 'select * from t_stato_giornatas';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all t_stato_giornatas');
        }
        if(result.length>0) {
            console.log('lettura tutti gli stati Giornata ' + result.length);  

            console.log(`rilevati ${result.length} stati Giornata `)
            res.send({
                message:'Situazione attuale stati Giornata',
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

// lettura singolo Giornata
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
  
    let strsql = `select * from t_stato_giornatas where id= ${id} `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura t_stato_giornatas for id ' + id);
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   Stati Giornata `)
            res.send({
             messagexx:`rilevati ${result.length}  ------- get per id ${id} -------   Stati Giornata`,
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
    
    //  console.log(req.body,'Creazione nuovo Giornata');  // visualizzo la struttura dei campi immessi dall'Giornata 
  
      // creo le variabili dai campi di input
      let id = req.body.id;
      let d_stato_giornata = req.body.d_stato_giornata;
      let key_utenti_operation = req.body.key_utenti_operation;
   
      let strsql =  `insert into t_stato_giornatas
                  (id,d_stato_giornata,key_utenti_operation) 
                  valueS
                  (
                    ${id},'${d_stato_giornata}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo stato Giornata su tabella t_stato_giornatas ');
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

    console.log(req.body,`Modifica Stato Giornata id ${id}`);  // visualizzo la struttura dei campi immessi dall'Giornata 

    // definisco la strsql per lettura Giornata

    let strsql_Inqu = `select * from t_stato_giornatas where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let d_stato_giornata = req.body.d_stato_giornata;
    let tappo = req.body.tappo;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update t_stato_giornatas set
                    d_stato_giornata = '${d_stato_giornata}',
                    tappo = '${tappo}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    console.log('bk - update stato giornata: ' + strsql);
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_giornatas for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato Giornata id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    console.log('eseguito aggiornamento ' + JSON.stringify(result));
                    res.send({ 
                        message: `Ruolo aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato Giornata id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato Giornata presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica stato Giornata id ${id}`);  // visualizzo la struttura dei campi immessi dall'Giornata 

  // definisco la strsql per lettura Giornata

    let strsql_Inqu = `select * from t_stato_giornatas where id= ${id} `;
    
    // definisco 
   let stato = {
            d_stato_Giornata: req.body.d_stato_Giornata,
            tappo: req.body.tappo,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_giornatas for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE t_stato_giornatas SET ? WHERE id = ' + req.params.id, stato,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento stato Giornata id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato Giornata aggiornato regolarmente ...   ok per  id: ${id} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato Giornata id: ${id} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun stato Giornata presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`cancellazione stato Giornata id ${id}`);  // visualizzo la struttura dei campi immessi dall'Giornata 

    // definisco la strsql per lettura Giornata

    let strsql_Inqu = `select * from t_stato_giornatas where id= ${id} `;

    let strsql =  `delete from t_stato_giornatas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura t_stato_giornatas for id ' + id);
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione stato Giornata id: ${id}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `stato Giornata  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente stato Giornata id: ${id} -- cancellazione non possibile`);
                    res.send({
                        message: `nessun stato Giornata presente for id: ${id}  -- cancellazione non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  


exports.getLastId = (req,res)=> {
    
    let strSql = 'select * from t_stato_giornatas';

    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getLastId ');
     
    strsql =  strSql + ' where `t_stato_giornatas`.`id` < ' + tappo + ' order by `t_stato_giornatas`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all Giornatas - erro: ${err}`,
                data:null
            });
            return;  
        }
        if(result.length>0) {
            console.log('abc - lettura ultimo id' + result.length);  

            console.log(`rilevati ${result.length} tabella Giornata  `)
            res.status(200).send({ 
                message:'Situazione attuale ultimo id',
                number:  result.length,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuno stato Giornata presente  `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}