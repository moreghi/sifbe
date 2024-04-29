const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `cassacs`.*,`t_taglias`.`d_taglia`, `t_taglias`.`valore_taglia`  from `cassacs` " + 
               " inner join `t_taglias` ON `t_taglias`.`id` = `cassacs`.`idTaglia` " 
           

exports.getAll = (req,res)=> {
     
    let strsql = strSql;

    console.log('backend - cassacs - getall ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all cassacs - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le taglie della cassa ' + result.length);  

            console.log(`rilevate ${result.length} taglie `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale tagli della cassa',
                number:  result.length,
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


exports.getbyid = (req,res)=> {
 
    let id = req.params.id;
     
    let strsql = strSql + ' where `cassacs`.`id` = ' + id;

    console.log('backend - Cssaws - getbyId ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura taglia cassa - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura taglia cassa by id ' + result.length);  

            console.log(`rilevate ${result.length} cassa `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale taglia cassa',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna cassa presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}

exports.getbyidTagliaeCommanda = (req,res)=> {
 
    let idTaglia = req.params.idTaglia;
    let idCommanda = req.params.idCommanda;

    let strsql = strSql + ` where idTaglia = ${idTaglia}  and idCommanda= ${idCommanda} `;

    console.log('backend - cassacs - getbyidTagliaeCommanda ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura taglia cassa - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura taglia cassa by id ' + result.length);  

            console.log(`rilevate ${result.length} cassa `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale taglia cassa',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna cassa presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione taglia cassa id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from cassacs where id= ${id} `;

    let strsql =  `delete from cassacs  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura cassacs for id ${id} - errore: ${err}`,
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
                        message: `nessuna cassa presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  
// ok
exports.updateByid = (req,res)=> { 


   // console.log('backend - updateByid - appena entrato: ' + req.params);

    let idtaglia = req.params.idtaglia;
    let idCommanda = req.params.idCommanda;

    let strsql_Inqu = `select * from cassacs where idTaglia= ${idtaglia}  and idCommanda= ${idCommanda}             `;

    console.log(req.body,`Modifica taglia cassa id ${idtaglia}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

   let strsql = '';

    console.log('backend - updatebyid -------- strsql ----------- ' + strsql_Inqu );

   // definisco le variabili per aggiornamento campi
 
   let idTaglia = req.body.idTaglia;
   let qtaInc = req.body.qtaInc;
   let qtaRes = req.body.qtaRes;
   let valoreInc = req.body.valoreInc;
   let valoreRes = req.body.valoreRes;
   let key_utenti_operation = req.body.key_utenti_operation;
  

   // verifico prima l'esistenza del record
   console.log('------------------------------------------------ update: ' + strsql);

    db.query(strsql_Inqu,(err,result)=> {  
       if(err) {
           console.log(err,'4 errore il lettura cassacs for idTaglia ' + idtaglia + ' e idCommanda: ' + idCommanda);
           res.status(500).send({
               message: `4 errore il lettura cassacs for idTaglia ${idtaglia}  e idCommanda: ${idCommanda} - errore: ${err}`,
               data:null
           });
           return;
       }
       if(result.length>0) {
               let id = result[0].id;
               strsql =  `update cassacs set
                                idCommanda = ${idCommanda},
                                idTaglia = ${idTaglia},
                                qtaInc = ${qtaInc},
                                valoreInc = ${valoreInc},
                                qtaRes = ${qtaRes},
                                valoreRes = ${valoreRes},
                                key_utenti_operation = ${key_utenti_operation}
                                where id = ${id}`;
               db.query(strsql,(err,result) => {    
                   if(err) { 
                       console.log(err,`----- errore in aggiornamento cassa idTaglia ${idtaglia}  e idCommanda: ${idCommanda}`);
                       res.status(500).send({ 
                           message: `errore in aggiornamnto cassacs ${err} --  `,
                           rc: 'ko',
                           data:null
                       });  
                       return;
                   } 
                   console.log(err,`----- aggiornato cassacs idTaglia ${idtaglia}  e idCommanda: ${idCommanda}`);
                   res.status(200).send({ 
                       message: `taglia aggiornata regolarmente   `,
                       rc: 'ok',
                       data:result
                   });  
                 });  
               }  
               else {
                   console.log(`----- inesistente taglia idTaglia ${idtaglia}  e idCommanda: ${idCommanda} -- aggiornamento non possibile`);
                   res.status(200).send({ 
                       message: `nessun user pressente for idTaglia ${idtaglia}  e idCommanda: ${idCommanda}  -- aggiornamento non possibile`,
                       rc: 'nf',
                       data:null
                   });
                   return;
               }
           });  
      } 
     
// ok
exports.createNew = (req,res)=> {
       

    console.log('backend ----------------------------------------------------- cassa- createnew ' + JSON.stringify(req.body));


     // creo le variabili dai campi di input
    let id = req.body.id;
    let idCommanda = req.body.idCommanda;
    let idTaglia = req.body.idTaglia;
    let qtaInc = req.body.qtaInc;
    let qtaRes = req.body.qtaRes;
    let valoreInc = req.body.valoreInc;
    let valoreRes = req.body.valoreRes;
    let key_utenti_operation = req.body.key_utenti_operation;
       
    let strsql =  `insert into cassacs
                  (
                    id,idTaglia,idCommanda, qtaInc, valoreInc, qtaRes, valoreRes, key_utenti_operation
                  ) 
                  valueS
                  (
                    ${id},${idTaglia},${idCommanda}, ${qtaInc}, ${valoreInc}, ${qtaRes}, ${valoreRes}, ${key_utenti_operation}
                   )`;
    
                  console.log('backend - ----------- taglia cassa - create: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova taglia cassa su tabella cassacs ');
              res.status(500).send({
                message: `errore in registrazione nuova taglia cassa su tabella cassacs - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... taglia cassa inserita regolarmente `);
          res.status(200).send({
            message: `taglia cassa inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  exports.deletebyCommanda = (req,res)=> {  

    let idCommanda = req.params.idCommanda;

    console.log(req.body,`cancellazione  cassa idCommanda ${idCommanda}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from cassacs where idCommanda= ${idCommanda} `;

    let strsql =  `delete from cassacs  where idCommanda = ${idCommanda}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `deleteAll_Step01 errore in lettura cassacs for id ${idCommanda} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione cassa idCommanda: ${idCommanda}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione cassa per idCommanda -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `cassa  idCommanda: ${idCommanda} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente cassa idCommanda: ${idCommanda} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna cassa presente for idCommanda: ${idCommanda}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  
  
exports.getbyidCommanda = (req,res)=> {
 
    let idCommanda = req.params.idCommanda;
   
    let order = ' ORDER BY `cassacs`.`qtaInc` desc, `cassacs`.`qtaRes`;  ';
    
    let strsql = strSql + ' where `cassacs`.`idCommanda` = ' + idCommanda  + order;

    console.log('backend - Cassas - getbyIdGiornata ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `step_013 errore il lettura taglia cassa  per idCommanda - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura cassa by idCommanda ' + result.length);  

            console.log(`rilevate ${result.length} taglie  `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale cassa per idCommanda',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna cassa presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}

exports.gettotalibyidCommanda = (req,res)=> {
 
    let idCommanda = req.params.idCommanda;
     
    let strsql = 'SELECT SUM(valoreInc) as incassato, SUM(valoreRes) as resto FROM `cassacs` where cassacs.idCommanda = ' + idCommanda; 

    console.log('backend - Cassa - getbyIdCommanda ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `step_015 errore in riconteggio cassa  per idCommanda - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                console.log(`----- importo riconteggiato: ${result[0].incassato}`);
                res.status(200).send({ 
                message: `totale cassa ricalcolata   `,
                rc: 'ok',
                incassato:result[0].incassato,
                resto:result[0].resto,
                }); 
        }else {
            console.log('nessun record presente ' + result.length); 
            res.status(200).send({ 
                message: `nessuna cassa presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}