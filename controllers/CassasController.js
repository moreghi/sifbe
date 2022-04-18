const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `cassas`.*,`t_taglias`.`d_taglia`, `t_taglias`.`valore_taglia`  from `cassas` " + 
               " inner join `t_taglias` ON `t_taglias`.`id` = `cassas`.`idTaglia` " 
           

exports.getAll = (req,res)=> {
     
    let strsql = strSql;

    console.log('backend - cassas - getall ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all cassas - erro: ${err}`,
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
     
    let strsql = strSql + ' where `cassas`.`id` = ' + id;

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

exports.getbyidTagliaeGiorno = (req,res)=> {
 
    let idTaglia = req.params.idTaglia;
    let idGiornata = req.params.idGiornata;

    let strsql = strSql + ` where idTaglia = ${idTaglia}  and idGiornata= ${idGiornata} `;

    console.log('backend - cassas - getbyidTagliaeGiorno ' + strsql);
   
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

    let strsql_Inqu = `select * from cassas where id= ${id} `;

    let strsql =  `delete from cassas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura cassas for id ${id} - errore: ${err}`,
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
    let idGiornata = req.params.idGiornata;

    let strsql_Inqu = `select * from cassas where idTaglia= ${idtaglia}  and idGiornata= ${idGiornata}             `;

    console.log(req.body,`Modifica taglia cassa id ${idtaglia}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

   let strsql = '';

    console.log('backend - updatebyid -------- strsql ----------- ' + strsql_Inqu );

   // definisco le variabili per aggiornamento campi
 
   let idTaglia = req.body.idTaglia;
   let qtaIn = req.body.qtaIn;
   let valoreIn = req.body.valoreIn;
   let qtaAc = req.body.qtaAc;
   let valoreAc = req.body.valoreAc;
   let qtaFi = req.body.qtaFi;
   let valoreFi = req.body.valoreFi;
   let qtaSb = req.body.qtaSb;
   let valoreSb = req.body.valoreSb;
   let key_utenti_operation = req.body.key_utenti_operation;
  

   // verifico prima l'esistenza del record
   console.log('------------------------------------------------ update: ' + strsql);

    db.query(strsql_Inqu,(err,result)=> {  
       if(err) {
           console.log(err,'4 errore il lettura cassas for idTaglia ' + idtaglia + ' e idGiornata: ' + idGiornata);
           res.status(500).send({
               message: `4 errore il lettura cassas for idTaglia ${idtaglia}  e idGiornata: ${idGiornata} - errore: ${err}`,
               data:null
           });
           return;
       }
       if(result.length>0) {
               let id = result[0].id;
               strsql =  `update cassas set
                                idGiornata = ${idGiornata},
                                idTaglia = ${idTaglia},
                                qtaIn = ${qtaIn},
                                valoreIn = ${valoreIn},
                                qtaAc = ${qtaAc},
                                valoreAc = ${valoreAc},
                                qtaFi = ${qtaFi},
                                valoreFi = ${valoreFi},
                                qtaSb = ${qtaSb},
                                valoreSb = ${valoreSb},
                                key_utenti_operation = ${key_utenti_operation}
                                where id = ${id}`;
               db.query(strsql,(err,result) => {    
                   if(err) { 
                       console.log(err,`----- errore in aggiornamento cassa idTaglia ${idtaglia}  e idGiornata: ${idGiornata}`);
                       res.status(500).send({ 
                           message: `errore in aggiornamnto cassas ${err} --  `,
                           rc: 'ko',
                           data:null
                       });  
                       return;
                   } 
                   console.log(err,`----- aggiornato cassas idTaglia ${idtaglia}  e idGiornata: ${idGiornata}`);
                   res.status(200).send({ 
                       message: `taglia aggiornata regolarmente   `,
                       rc: 'ok',
                       data:result
                   });  
                 });  
               }  
               else {
                   console.log(`----- inesistente taglia idTaglia ${idtaglia}  e idGiornata: ${idGiornata} -- aggiornamento non possibile`);
                   res.status(200).send({ 
                       message: `nessun user pressente for idTaglia ${idtaglia}  e idGiornata: ${idGiornata}  -- aggiornamento non possibile`,
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
    let idGiornata = req.body.idGiornata;
    let idTaglia = req.body.idTaglia;
    let qtaIn = req.body.qtaIn;
    let valoreIn = req.body.valoreIn;
    let qtaAc = req.body.qtaAc;
    let valoreAc = req.body.valoreAc;
    let qtaFi = req.body.qtaFi;
    let valoreFi = req.body.valoreFi;
    let qtaSb = req.body.qtaSb;
    let valoreSb = req.body.valoreSb;
    let key_utenti_operation = req.body.key_utenti_operation;
     
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
    
  */
  
      let strsql =  `insert into cassas
                  (
                    id,idTaglia,idGiornata, qtaIn, valoreIn, qtaAc, valoreAc, qtaFi, valoreFi, qtaSb, valoreSb, key_utenti_operation
                  ) 
                  valueS
                  (
                    ${id},${idTaglia},${idGiornata}, ${qtaIn}, ${valoreIn}, ${qtaAc}, ${valoreAc}, ${qtaFi}, ${valoreFi}, ${qtaSb}, ${valoreSb}, ${key_utenti_operation}
                   )`;
    
                  console.log('backend - ----------- taglia cassa - create: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova taglia cassa su tabella cassas ');
              res.status(500).send({
                message: `errore in registrazione nuova taglia cassa su tabella cassas - errore: ${err}`,
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
  
  exports.deletebyGiornata = (req,res)=> {  

    let idGiornata = req.params.idGiornata;

    console.log(req.body,`cancellazione  cassa idGiornata ${idGiornata}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from cassas where idGiornata= ${idGiornata} `;

    let strsql =  `delete from cassas  where idGiornata = ${idGiornata}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `deleteAll_Step01 errore in lettura cassas for id ${idGiornata} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione cassa idGiornata: ${idGiornata}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione cassa per idGiornata -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `cassa  idGiornata: ${idGiornata} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente cassa idGiornata: ${idGiornata} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna cassa presente for idGiornata: ${idGiornata}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  
  
exports.getbyidGiornata = (req,res)=> {
 
    let idGiornata = req.params.idGiornata;
     
    let strsql = strSql + ' where `cassas`.`idGiornata` = ' + idGiornata;

    console.log('backend - Cassas - getbyIdGiornata ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `step_013 errore il lettura taglia cassa  per idGiornata - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura cassa by idGiornata ' + result.length);  

            console.log(`rilevate ${result.length} taglie  `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale cassa per idGiornata',
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

exports.gettotalibyidGiornata = (req,res)=> {
 
    let idGiornata = req.params.idGiornata;
     
    let strsql = 'SELECT SUM(valoreIn) as incassato, SUM(valoreAc) as attuale, SUM(valoreFi) as finale, SUM(valoreSb) as sbilancio FROM `cassas` where cassas.idGiornata = ' + idGiornata; 

    console.log('backend - Cassa - getbyIdGiornata ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `step_015 errore in riconteggio cassa  per idGiornata - erro: ${err}`,
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
                attuale:result[0].attuale,
                finale:result[0].finale,
                sbilancio:result[0].sbilancio,
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


exports.gettagliebyDay = (req,res)=> {
 
    let idGiornata = req.params.idGiornata;
    console.log('gettagliebyDay ----- params: ' + JSON.stringify(req.params)); 
    let strsql = strSql + ' where `cassas`.`idGiornata` = ' + idGiornata + ' and `cassas`.`idTaglia` < 6  ORDER by `cassas`.`idTaglia` desc';
    console.log('backend - Cassa ----------------------------------    gettagliebyDay ' + strsql);
 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `step_015 errore in lettura taglie cassa  per idGiornata - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('backend - gettagliebyDay --- trovate taglie --------------     ' + JSON.stringify(result));
                res.status(200).send({ 
                message: `trovate ${result.length} taglie   `,
                rc: 'ok',
                data:result
            }); 
        }else {
            console.log('nessun record presente ' + result.length); 
            res.status(200).send({ 
                message: `nessuna taglia presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}