const strSql = 'select `cassasinteticas`.*  ' +  
                ' FROM `cassasinteticas` '; 
                


const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from cassasinteticas';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all cassasinteticas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le casse ' + result.length);  

            console.log(`rilevati ${result.length} casse `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun cassa presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo cassa
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `cassasinteticas`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from cassasinteticas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura cassasinteticas for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura cassasinteticas for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassa `)

            res.status(200).send({ 
                message:`situazione attuale per cassa id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun record cassa presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo cassa   (post)

exports.createNew = (req,res)=> {
    
    strsql1 ="SELECT * FROM `cassasinteticas` WHERE id < 99999 ORDER BY id DESC;";

      console.log(req.body,'..........................................   Creazione nuovo cassasintetica');  // visualizzo la struttura dei campi immessi dall'cassa 
  
      // creo le variabili dai campi di input
    
      
      let idGiornata = req.body.idGiornata;
      let dataCassa = req.body.dataCassa;
      let cassaIniziale = req.body.cassaIniziale;
      let cassaAttuale = req.body.cassaAttuale;
      let cassaFinale = req.body.cassaFinale;
      let differenza = req.body.differenza;
      let key_utenti_operation = req.body.key_utenti_operation;
     
    
      console.log('backend ------------ Cassa ---------------------- Creazione nuovo cassa ' + JSON.stringify(req.body));


      let strsql =  `insert into cassasinteticas
                  (idGiornata,dataCassa,cassaIniziale,cassaAttuale,cassaFinale,differenza,key_utenti_operation) 
                  valueS
                  (
                    ${idGiornata},'${dataCassa}',${cassaIniziale},${cassaAttuale},${cassaFinale},${differenza},${key_utenti_operation} 
                  )`;
      console.log('pronto per fare create Cassa: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova cassa su tabella cassasinteticas ');
              res.status(500).send({
                message: `errore in registrazione nuova cassa su tabella cassasinteticas - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... Cassa inserita regolarmente `);
          db.query(strsql1,(err,result) => {
            if(err) {
                console.log(err,'errore in lettura ultima cassa creata su tabella cassasinteticas ');
                res.status(500).send({
                  message: `errore in lettura ultima cassa creata su tabella cassasinteticas - errore: ${err}`,
                  rc: 'kk',
                  data:null
              });
              return;
            }
            res.status(200).send({
                message: `cassa inserita regolarmente`,
                rc: 'ok',
                data:result[0],
                lastnumber:result[0].id 
            });
        });
    
    });    
    
  }
  
  // aggiornamento cassa   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica cassa id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassa 

    // definisco la strsql per lettura cassa

    let strsql_Inqu = `select * from cassasinteticas where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idGiornata = req.body.idGiornata;
    let dataCassa = req.body.dataCassa;
    let cassaIniziale = req.body.cassaIniziale;
    let cassAttuale = req.body.cassaAttuale;
    let cassaFinale = req.body.cassaFinale;
    let differenza = req.body.differenza;
        let strsql =  `update cassasinteticas set
                    idGiornata = ${idGiornata},
                    dataCassa = '${dataCassa}',
                    cassaIniziale = ${cassaIniziale},
                    cassAttuale = ${cassAttuale},
                    cassaFinale = ${cassaFinale},
                    differenza = ${differenza},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('-----------  cassa ------------------------------------- update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura cassasinteticas for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura cassasinteticas for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento cassa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto cassa ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(`----- aggiornata cassa id: ${id}`);
                    res.status(200).send({ 
                        message: `cassa aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente cassa id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna cassa presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento cassa   // metodo 1  -- funziona

exports.updatecassaByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica cassa id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassa 

  // definisco la strsql per lettura cassa

    let strsql_Inqu = `select * from cassasinteticas where id= ${id} `;
    
    // definisco 
   let cassanew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            cassaname: req.body.cassaname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            notecassa: req.body.notecassa,
            key_soci_operation: req.body.key_soci_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura cassasinteticas for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura cassasinteticas for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE cassasinteticas SET ? WHERE id = ' + req.params.id, cassanew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento cassa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto cassa ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `cassa aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente cassa id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun cassa pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione cassa

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione cassa id ${id}`);  // visualizzo la struttura dei campi immessi dall'cassa 

    // definisco la strsql per lettura cassa

    let strsql_Inqu = `select * from cassasinteticas where id= ${id} `;

    let strsql =  `delete from cassasinteticas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura cassasinteticas for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione cassa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione cassa -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `cassa  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente cassa id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun cassa presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  


exports.getbyGiornata = (req,res)=> {
    
    let idGiornata = req.params.idGiornata;
    
    const strsql = strSql + ' where `cassasinteticas`.`idGiornata` = ' + idGiornata;

    console.log('backend - getbyidGiornata - strsql --> ' + strsql);
  
   // let strsql = `select * from cassasinteticas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura cassasinteticas for idGiornata ' + idGiornata);

            res.status(500).send({
                message: `2 errore il lettura cassasinteticas for id ${idGiornata}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   cassa `)

            res.status(200).send({ 
                message:`situazione attuale per cassa idGiornata: .....  ${idGiornata}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per idGiornata: ${idGiornata} `);
            res.status(200).send({
                message: `nessun record cassa presente for idGiornata: ${idGiornata}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}