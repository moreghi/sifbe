const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = 'select `locandinas`.* ' +  
               ' from `locandinas`  '; 
              
const order =  ' order by `locandinas`.`id` asc';


exports.getAll = (req,res)=> {
 
    let strsql = strSql + order;

    console.log('backend - Locandina -- strsql: ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3kt errore il lettura all locandinas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le locandina ' + result.length);  

            console.log(`rilevate ${result.length} locandina `)
            res.status(200).send({ 
                message:'Situazione attuale locandina',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}





// lettura singola Locandina
exports.getbyid = (req,res)=> {
    
    const id = req.params.id;
    
    let strsql = strSql + ' where `locandinas`.`id` = ' + id;

   
    console.log('backend - Locandina getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2gh errore il lettura locandinas for id ' + id);

            res.status(500).send({
                message: `2gh errore il lettura locandinas for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   locandina `)

            res.status(200).send({ 
                message:`situazione attuale per Locandina id: .....  ${id}`,
                number:  result.length,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `locandina -- getbyid --- nessun user presente for id: ${id}`,
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

      let idManif = req.body.idManif;
      let idEvento = req.body.idEvento;
      let photo = req.body.photo;
      let key_utenti_operation = req.body.key_utenti_operation;
       
      let strsql =  `insert into locandinas
                  (idManif,idEvento,photo,key_utenti_operation) 
                  valueS
                  (
                    ${idManif},${idEvento},'${photo}',${key_utenti_operation} 
                  )`;
      console.log('insert - strsql: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova Locandina su tabella locandinas ');
              res.status(500).send({
                message: `errore in registrazione nuova Locandina su tabella locandinas - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... Locandina inserita regolarmente `);
          res.status(200).send({
            message: `Locandina inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,` <----------  updatebyId ----------  Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from locandinas where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idManif = req.body.idManif;
    let idEvento = req.body.idEvento;
    let photo = req.body.photo;
    let stato = req.body.stato;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update locandinas set
                    idManif = ${idManif},
                    idEvento = ${idEvento},
                    photo = '${photo}',
                    stato = ${stato},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;


                    console.log('bk - --------------  Locandina ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4se errore il lettura locandinas for id ' + id);
            res.status(500).send({
                message: `4se errore il lettura locandinas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento Locandina id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto Locandina ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato Locandina id: ${id}`);
                    res.status(200).send({ 
                        message: `Locandina aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente Locandina id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna Locandina presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica Locandina id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from locandinas where id= ${id} `;
    
    // definisco 
   let manifw = {
            descManif: req.body.descManif,
            anno: req.body.anno,
            numUtentiTot : req.body.numUtentiTot ,
            incassatoTot: req.body.incassatoTot,
            stato: req.body.stato,
            noteLocandina: req.body.noteLocandina,
            key_utenti_operation: req.body.key_utenti_operation
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5we errore il lettura users for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE locandinas SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento mamifestazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto Locandina ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `Locandina aggiornata regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente Locandina id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna Locandina pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione Locandina

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione Locandina id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from locandinas where id= ${id} `;

    let strsql =  `delete from locandinas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura locandinas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione Locandina id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione Locandina -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `Locandina  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente Locandina id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna manifetsazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  




// lettura singola Locandina
exports.getbynameloc = (req,res)=> {
    
    const nameloc = req.params.nameloc;
    
    let strsql = strSql + " where `locandinas`.`photo` = '"  + nameloc + "' ";
   
    console.log('backend - Locandina getbynameloc - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'4fegh errore il lettura locandinas for name locandina ' + nameloc);

            res.status(500).send({
                message: `2gdgh errore il lettura locandinas for id ${nameloc}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   locandine `)

            res.status(200).send({ 
                message:`situazione attuale per Locandina photo: .....  ${nameloc}`,
                number:  result.length,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per photo: ${nameloc} `);
            res.status(200).send({
                message: `nessun user pressente for photo: ${nameloc}`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getlastid = (req,res)=> {
    
    let id = 99999;
    let order = ' order by `locandinas`.`id` desc';
    const strsql = strSql + '  where `locandinas`.`id` <= ' + id + order;

    console.log('backend - getlastid - strsql --> ' + strsql);
  
   // let strsql = `select * from elementos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2de errore il lettura locandinas for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura locandinas for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   locandine `)

            res.status(200).send({ 
                message:`ultima locandina in tabella `,
                rc: 'ok',
                data:result[0]
            });                    
         }

    });  
}
