const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select * from `graphprods`  ";

exports.getAll = (req,res)=> {
 
    let strsql = strSql;

    console.log('backend - -----------------   Graphs1Controller -- getAll ---------------- strsql: ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all graphprods - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log(`rilevate ${result.length} graphprods `)
            res.status(200).send({ 
                message:'Situazione attuale Graphprods su Graps1Controller',
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

// lettura singola Gaphprod
exports.getbyid = (req,res)=> {
    
    const id = req.params.id;
    
    let strsql = strSql + ' where `graphprods`.`id` = ' + id;
   
    console.log('backend - Gaphprod getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura graphprods for id ' + id);
            res.status(500).send({
                message: `2 errore il lettura graphprods for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   graphprods `)

            res.status(200).send({ 
                message:`situazione attuale per graphprod id: .....  ${id}`,
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

// creazione nuovo utente   (post)
exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
    let id = req.body.id;
    let descrizione = req.body.descrizione;
    let ntot = req.body.ntot;
    let ndacuc = req.body.ndacuc;
    let ndacons = req.body.ndacons;
    let nevasi = req.body.nevasi;
    
  
      let strsql =  `insert into graphprods
                  (id,descrizione,ntot,ndacuc,ndacons,nevasi) 
                  valueS
                  (
                    ${id}, '${descrizione}',${ntot},${ndacuc},${ndacons},${nevasi} 
                  )`;
      console.log('insert - strsql: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova graphprod su tabella graphprods ');
              res.status(500).send({
                message: `errore in registrazione nuova graphprod su tabella graphprods - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... Gaphprod inserita regolarmente `);
          res.status(200).send({
            message: `Gaphprod inserita regolarmente`,
            data:result
        });
     });
    
  }
  
// aggiornamento    // metodo 2  -- funziona
  exports.updatebyid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,` <----------  updatebyId ----------  Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from graphprods where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let descrizione = req.body.descrizione;
    let ntot = req.body.ntot;
    let ndacuc = req.body.ndacuc;
    let ndacons = req.body.ndacons;
    let nevasi = req.body.nevasi;

    let strsql =  `update graphprods set
                    descrizione = '${descrizione}',
                    ntot = '${ntot}',
                    ndacuc = '${ndacuc}',
                    ndacons = '${ndacons}',
                    nevasi = '${nevasi}'
                    where id = ${id}`;


                    console.log('update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura graphprods for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura graphprods for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento graphprod id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto graphprod ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato graphprod id: ${id}`);
                    res.status(200).send({ 
                        message: `Gaphprod aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente graphprod id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna graphprod presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento   // metodo 1  -- funziona   (da sistemare)  usata solo come esempio
// da sistremare nei campi
exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica Gaphprod id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from graphprods where id= ${id} `;
    
    // definisco 
   let manifw = {
            descManif: req.body.descManif,
            anno: req.body.anno,
            buonoPastoCommanda: req.body.buonoPastoCommanda,
            impCoperto: req.body.impCoperto,
            noteGaphprod: req.body.noteGaphprod,
            stampeBackOffice: req.body.stampeBackOffice,
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
                  db.query('UPDATE graphprods SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento mamifestazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto graphprod ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `Gaphprod aggiornata regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente graphprod id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna graphprod pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione per id
exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione graphprod id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from graphprods where id= ${id} `;

    let strsql =  `delete from graphprods  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura graphprods for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione graphprod id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione graphprod -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `Gaphprod  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente graphprod id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna manifetsazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

// cancellazione per id
exports.deleteAll = (req,res)=> {  
  
    let strsql =  `delete from graphprods `;
   
     db.query(strsql,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura graphprods for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        res.status(200).send({ 
        message: `Gaphprod - tbella cancellata regolarmente  `,
        rc: 'ok',
        data:null
           }); 
       });  
               
          
}  


