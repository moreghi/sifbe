const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `cassaws`.*,`t_taglias`.`d_taglia`, `t_taglias`.`valore_taglia`  from `cassaws` " + 
               " inner join `t_taglias` ON `t_taglias`.`id` = `cassaws`.`idTaglia` " 
           

exports.getAll = (req,res)=> {
     
    let strsql = strSql;

    console.log('backend - cassaws - getall ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all cassaws - erro: ${err}`,
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
     
    let strsql = strSql + ' where `cassaws`.`id` = ' + id;

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
            console.log('lettura taglia cassaw by id ' + result.length);  

            console.log(`rilevate ${result.length} cassaw `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale taglia cassaw',
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

    console.log(req.body,`cancellazione taglia cassaw id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from cassaws where id= ${id} `;

    let strsql =  `delete from cassaws  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura cassaws for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione cassaw id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione cassaw -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `cassaw  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente cassaw id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna cassaw presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  
// ok
exports.updateByid = (req,res)=> { 


    console.log('backend - cassaw -------------  updateByid - appena entrato: ' + req.params);

    let idtaglia = req.params.idtaglia;
    let idGiornata = req.params.idGiornata;

    let strsql_conteggi = 'SELECT SUM(valoreInc) as incassato FROM `cassaws` where cassaws.idGiornata = ' + idGiornata; 
    
    console.log(req.body,`Modifica taglia assaw id ${idtaglia}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu =  strSql + ' where cassaws.idTaglia= ' + `${idtaglia} and cassaws.idGiornata = ${idGiornata}`;

    console.log('backend - updatebyid -------- strsql ----------- ' + strsql_Inqu );



    // definisco le variabili per aggiornamento campi

    let qtaInc = req.body.qtaInc;
    let valoreInc = req.body.valoreInc;
    
  

    // verifico prima l'esistenza del record
     console.log('strsql_inqu: ' + strsql_Inqu);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura taglia cassaws for id ' + idtaglia + ' e giornata: ' + idGiornata);
            res.status(500).send({
                message: `4 errore il lettura taglia cassaw for id ${idtaglia} e giornata ${idGiornata} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            let id = result[0].id;
            console.log('backend - cassaw-update ' + JSON.stringify(result[0]));
            console.log('valoretaglia: ' + result[0].valore_taglia);
            valoreInc = req.body.qtaInc * result[0].valore_taglia;
            console.log('valoreInc: ' + valoreInc);
            let strsql =  `update cassaws set
                            qtaInc = ${qtaInc},
                            valoreInc  = ${valoreInc}
                            where id = ${id}`;
console.log('strsql per update: ----------------------- strsql per update ---------------------------------- ' + strsql);
                            db.query(strsql,(err,result) => {    
                                if(err) { 
                                    console.log(err,`----- errore in aggiornamento taglia cassaw id: ${id}`);
                                    res.status(500).send({ 
                                        message: `errore in aggiornamnto taglia cassaw ${err} --  `,
                                        rc: 'ko',
                                        data:null
                                    });  
                                    return;
                                } else {
                                    db.query(strsql_conteggi,(err,result) => {    
                                        if(err) { 
                                            console.log(err,`----- errore in aggiornamento taglia cassaw id: ${id}`);
                                            res.status(500).send({ 
                                                message: `errore in aggiornamnto taglia cassaw ${err} --  `,
                                                rc: 'ko',
                                                data:null
                                            });  
                                            return;
                                        }
                                        if(result.length>0) {
                                            console.log(`----- importo riconteggiato: ${result[0].incassato}`);
                                            res.status(200).send({ 
                                            message: `Taglia cassaw aggiornata regolarmente   `,
                                            rc: 'ok',
                                            incassato:result[0].incassato,
                                                                              
                                            }); 
                                        }
                                     
                                    });  
                              }
                              /*
                                console.log(`----- Conteggi: ${result[0].incassato}`);
                                if(result.length>0) {
                                    console.log(`----- strsql_Conteggi: ${strsql_conteggi}`);
                                    
                                    db.query(strsql_conteggi,(err,result) => {    
                                        if(err) { 
                                            console.log(err,`----- errore in aggiornamento taglia cassaw id: ${id}`);
                                            res.status(500).send({ 
                                                message: `errore in aggiornamnto taglia cassaw ${err} --  `,
                                                rc: 'ko',
                                                data:null
                                            });  
                                            return;
                                        }
                                        if(result.length>0) {
                                            console.log(`----- importo riconteggiato: ${result[0].incassato}`);
                                            res.status(200).send({ 
                                            message: `Taglia cassaw aggiornata regolarmente   `,
                                            rc: 'ok',
                                            data:result[0].incassato 
                                            }); 
                                        }
                            
                                     
                            });  
                        } */
                    });   
                } else {
                    console.log(`----- inesistente taglia cassaw id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna taglia cassaw presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
            }
       
    });  



              } 
     
// ok
exports.createNew = (req,res)=> {
       

    console.log('backend ----------------------------------------------------- cassaw- createnew ' + JSON.stringify(req.body));


     // creo le variabili dai campi di input
    let id = req.body.id;
    let idTaglia = req.body.idTaglia;
    let idGiornata = req.body.idGiornata;
    let qtaInc = req.body.qtaInc;
    let valoreInc = req.body.valoreInc;
     
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
    
  */
  
      let strsql =  `insert into cassaws
                  (
                    id,idTaglia,idGiornata, qtaInc, valoreInc
                  ) 
                  valueS
                  (
                    ${id},${idTaglia},${idGiornata}, ${qtaInc}, ${valoreInc}
                   )`;
    
                  console.log('backend - ----------- taglia cassaw - create: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova taglia cassaw su tabella cassaws ');
              res.status(500).send({
                message: `errore in registrazione nuova taglia cassaw su tabella cassaws - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... taglia cassaw inserita regolarmente `);
          res.status(200).send({
            message: `taglia cassaw inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  exports.deletebyGiornata = (req,res)=> {  

    let idGiornata = req.params.idGiornata;

    console.log(req.body,`cancellazione  cassaw idGiornata ${idGiornata}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from cassaws where idGiornata= ${idGiornata} `;

    let strsql =  `delete from cassaws  where idGiornata = ${idGiornata}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `deleteAll_Step01 errore in lettura cassaws for id ${idGiornata} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione cassaw idGiornata: ${idGiornata}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione cassaw per idGiornata -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `cassaw  idGiornata: ${idGiornata} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente cassaw idGiornata: ${idGiornata} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna cassaw presente for idGiornata: ${idGiornata}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  
  
exports.getbyidGiornata = (req,res)=> {
 
    let idGiornata = req.params.idGiornata;
     
    let strsql = strSql + ' where `cassaws`.`idGiornata` = ' + idGiornata;

    console.log('backend - Cssaws - getbyIdGiornata ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `step_013 errore il lettura taglia cassa  per idGiornata - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura cassaw by idGiornata ' + result.length);  

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



exports.azzerabyidGiornata = (req,res)=> {  

    let idGiornata = req.params.idGiornata;

    console.log(req.body,`azzeramento importi cassa per giornata ${idGiornata}`);  // visualizzo la struttura dei campi immessi dall'commanda 

    // definisco la strsql per lettura commanda

    let strsql = 'UPDATE `cassaws` SET `qtaInc`=0,`valoreInc`=0 WHERE  `cassaws`.`idGiornata` = ' + idGiornata;
   
    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore in azzeramento importo cassaw per giornata  ' + idGiornata);
            res.status(500).send({
                message: `4 errore in azzeramento importo cassaw per giornata ${idGiornata} - errore: ${err}`,
                data:null
            });
            return;
        }
        
           console.log(err,`----- azzerato importi per la cassa del giorno: ${idGiornata}`);
           res.status(200).send({ 
                    message: `Cassa azzerata correttamente   `,
                    rc: 'ok',
                    data:result
                    });  
                 
              
         
            });  
}  


exports.gettotalibyidGiornata = (req,res)=> {
 
    let idGiornata = req.params.idGiornata;
     
    let strsql = 'SELECT SUM(valoreInc) as incassato FROM `cassaws` where cassaws.idGiornata = ' + idGiornata; 

    console.log('backend - Cssaws - getbyIdGiornata ' + strsql);
   
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
                message: `totale cassaw ricalcolata   `,
                rc: 'ok',
                incassato:result[0].incassato,
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