const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = 'select speseeventos.* ' +  
               ' from  speseeventos  '; 
const order =  ' order by speseeventos.id desc';

/*
pool.getConnection(function(error, conn) {
    if(error) {
        conn.release();
        res.status(500).send({
             message: `errore in rilascio connessione - error: ${error}`,
             rc: 'kc',
             success: false
         });
         return;
     }
})
*/


exports.getAll = (req,res)=> {
     let strsql = strSql + order;

     db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3xss errore il lettura all speseeventos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le spese ' + result.length);  

            console.log(`rilevate ${result.length} spese `)
            res.status(200).send({ 
                message:'Situazione attuale spese',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user pressente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }
    });

}

// lettura singola Spesa
exports.getbyid = (req,res)=> {
   
    const id = req.params.id;
    
    let strsql = strSql + ' where `speseeventos`.`id` = ' + id;

       console.log('backend - Spesa getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore il lettura speseeventos for id ' + id);

            res.status(500).send({
                message: `2vvcv errore il lettura speseeventos for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   spese `)

            res.status(200).send({ 
                message:`situazione attuale per Spesa id: .....  ${id}`,
                number:  result.length,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for id: ${id}`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// lettura singola Spesa
exports.getspesabyStato = (req,res)=> {
    
    const stato = req.params.stato;
    
    let strsql = strSql + ' where `speseeventos`.`stato` = ' + stato + order;

    console.log('backend - getspesabyStato - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'3 errore il lettura speseeventos for stato' + stato);

            res.status(500).send({
                message: `3 errore il lettura speseeventos for stato ${stato}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   spese `)

            res.status(200).send({ 
                message:`situazione attuale per Spesa stato: .....  ${stato}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per stato: ${stato} `);
            res.status(200).send({
                message: `nessuna Spesa presente per la selezione impostata`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo utente   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
      let idEvento = req.body.idEvento;
      let fornitore = req.body.fornitore;
      let motivo = req.body.motivo;
      let importo = req.body.importo;
      let datareg = req.body.datareg;
      let datapag = req.body.datapag;
      let key_utenti_operation = req.body.key_utenti_operation;
     /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into speseeventos
                  (idEvento,fornitore,motivo,importo,datareg,datapag,key_utenti_operation) 
                  valueS
                  (
                    ${idEvento},UPPER('${fornitore}'),UPPER('${motivo}'),${importo},'${datareg}','${datapag}',${key_utenti_operation} 
                  )`;
      console.log('insert - strsql: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova Spesa su tabella speseeventos ');
              res.status(500).send({
                message: `errore in registrazione nuova Spesa su tabella speseeventos - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... Spesa inserita regolarmente `);
          res.status(200).send({
            message: `Spesa inserita regolarmente`,
            data:result
        });
     });
    
  }
  
  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,` <----------  updatebyId ----------  Modifica Spesa id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from speseeventos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idEvento = req.body.idEvento;
    let fornitore = req.body.fornitore;
    let motivo = req.body.motivo;
    let importo = req.body.importo;
    let datareg = req.body.datareg;
    let datapag = req.body.datapag;

    let strsql =  `update speseeventos set
    
                    idEvento = ${idEvento},
                    fornitore = UPPER('${fornitore}'),
                    motivo = UPPER('${motivo}'),
                    datareg = '${datareg}',
                    importo = ${importo},
                    datapag = '${datapag}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;


                    console.log('bk - --------------  Spesa ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura speseeventos for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura speseeventos for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento Spesa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto Spesa ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato Spesa id: ${id}`);
                    res.status(200).send({ 
                        message: `Spesa aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente Spesa id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna Spesa presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento utente   // metodo 1  -- funziona   (da sistemare)  usata solo come esempio
// da sistremare nei campi
exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica Spesa id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from speseeventos where id= ${id} `;
    
    // definisco 
   let manifw = {
            descManif: req.body.descManif,
            anno: req.body.anno,
            numUtentiTot : req.body.numUtentiTot ,
            incassatoTot: req.body.incassatoTot,
            stato: req.body.stato,
            photo: req.body.photo,
            noteSpesa: req.body.noteSpesa,
            key_utenti_operation: req.body.key_utenti_operation
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura users for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE speseeventos SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento mamifestazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto Spesa ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `Spesa aggiornata regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente Spesa id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna Spesa pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione Spesa

exports.delete = (req,res)=> {  

    console.log('backend ----  manif.delete ' + JSON.stringify(req.params))
    let id = req.params.id;

    console.log(`cancellazione Spesa id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from speseeventos where id= ${id} `;

    let strsql =  `delete from speseeventos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura speseeventos for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione Spesa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione Spesa -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `Spesa  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente Spesa id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna manifetsazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

// lettura spese per evento
exports.getAllbyevento = (req,res)=> {
    
    const id = req.params.id;
    
    let strsql = strSql + ' where `speseeventos`.`idEvento` = ' + id;

    console.log('backend - getAllbyevento - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'3 errore il lettura speseeventos for idevento' + id);

            res.status(500).send({
                message: `3 errore il lettura speseeventos for idEvento ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   spese per evento `)

            res.status(200).send({ 
                message:`situazione attuale Spese per evento: .....  ${id}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per idEvento: ${id} `);
            res.status(200).send({
                message: `nessuna Spesa presente per la selezione impostata`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

