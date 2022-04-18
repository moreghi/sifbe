const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `cassawcs`.*,`t_taglias`.`d_taglia`, `t_taglias`.`valore_taglia`  from `cassawcs` " + 
               " inner join `t_taglias` ON `t_taglias`.`id` = `cassawcs`.`idTaglia` " 
           

exports.getAll = (req,res)=> {
     
    let strsql = strSql;

    console.log('backend - cassawss - getall ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all cassawcs - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le taglie della cassawcs ' + result.length);  

            console.log(`rilevate ${result.length} taglie `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale tagli della cassawcs',
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

exports.getAllTagliebyCommanda = (req,res)=> {
    let idCommanda = req.params.idCommanda;
     
    let strsql = strSql + ' where `cassawcs`.`idCommanda` = ' + idCommanda;

    console.log('backend - Cssaws - getAllTagliebyCommanda ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `step_011 errore in lettura taglie per  idCommanda - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                res.status(200).send({ 
                message: `situazione taglie per commanda   `,
                rc: 'ok',
                data:result,
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


exports.gettaglieNoMoneybyCommanda = (req,res)=> {
 
    let idCommanda = req.params.idCommanda;
    console.log('gettaglieNoMoneybyCommanda ----- params: ' + JSON.stringify(req.params)); 
    let strsql = strSql + ' where `cassawcs`.`idCommanda` = ' + idCommanda + ' and `cassawcs`.`idTaglia` < 6  ORDER by `cassawcs`.`idTaglia` desc';
    console.log('backend - Cassawcs ----------------------------------    gettaglieNoMoneybyCommanda ' + strsql);
 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `step_015 errore in lettura taglie cassa  per idCommanda - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('backend - gettaglieNoMoneybyCommanda  --- trovate taglie --------------     ' + JSON.stringify(result));
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




exports.getTagliabyCommanda = (req,res)=> {
   
    let idCommanda = req.params.idCommanda;
    let idTaglia = req.params.idTaglia;

    let strsql = strSql + ' where `cassawcs`.`idCommanda` = ' + idCommanda + ' and `cassawcs`.`idTaglia` = ' + idTaglia;

    console.log('backend - Cssaws - getTagliabyCommanda ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `step_012 errore in lettura taglia per  idCommanda - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                res.status(200).send({ 
                message: `situazione taglia per commanda   `,
                rc: 'ok',
                data:result,
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

exports.delete = (req,res)=> {
   
    let id = req.params.id;

    console.log(req.body,`cancellazione taglia cassawc id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from cassawcs where id= ${id} `;

    let strsql =  `delete from cassawcs  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura cassawcs for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione cassawc id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione cassawc -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `cassawc  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente cassawc id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna cassawc presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}

exports.updatebyidTest = (req,res)=> {
    console.log('backend - cassawc ----- params --------  updateByid - appena entrato: ' + JSON.stringify(req.params));
    console.log('backend - cassawc ------ body -------  updateByid - appena entrato: ' + JSON.stringify(req.body));

    
    let body = req.body;
    console.log('backend - cassawc ------ body1 -------  updateByid - appena entrato: ' + JSON.stringify(body));
    let idTaglia = req.params.idTaglia;
    let idCommanda = req.params.idCommanda;

}

exports.deleteTagliaByidCommanda = (req,res)=> {
    let idTaglia = req.params.idTaglia;
    let idCommanda = req.params.idCommanda;  

    console.log(req.body,`cancellazione taglia cassawc per commanda ${idCommanda } e taglia ${idTaglia}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from cassawcs where idCommanda= ${idCommanda} and idTaglia=${idTaglia} `;

    
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura cassawcs for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            let id = result[0].id;
            let strsql =  `delete from cassawcs  where id = ${id}`;
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione cassawc id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione cassawc -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `cassawc  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente cassawc id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna cassawc presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  


}

exports.updateByid = (req,res)=> {
   
    console.log('backend - cassawc ----- params --------  updateByid - appena entrato: ' + JSON.stringify(req.params));
    console.log('backend - cassawc ------ body -------  updateByid - appena entrato: ' + JSON.stringify(req.body));
    let idTaglia = req.params.idTaglia;
    let idCommanda = req.params.idCommanda;

    let strsql_conteggi = 'SELECT SUM(valoreInc) incassato, SUM(valoreRes)  resto FROM `cassawcs` where `cassawcs`.`idCommanda` = ' + idCommanda; 
    
    console.log(req.body,`Modifica taglia assawc id ${idTaglia}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu =  strSql + ' where cassawcs.idTaglia= ' + `${idTaglia} and cassawcs.idCommanda = ${idCommanda}`;

    console.log('backend - updatebyid -------- strsql_Inqu ----------- ' + strsql_Inqu );



    // definisco le variabili per aggiornamento campi

    let qtaInc = req.body.qtaInc;
    let qtaRes = req.body.qtaRes;
    let valoreInc = req.body.valoreInc;
    let valoreRes = req.body.valoreRes;
  

    // verifico prima l'esistenza del record
     console.log('strsql_inqu: ' + strsql_Inqu);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura taglia cassawcs for idTaglia ' + idTaglia + ' e Commanda: ' + idCommanda);
            res.status(500).send({
                message: `4 errore il lettura taglia cassawcs for idTaglia ${idTaglia} e commanda ${idCommanda} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            let id = result[0].id;
            console.log('backend - cassaw-update ' + JSON.stringify(result[0]));
            console.log('valoretaglia: ' + result[0].valore_taglia);
            valoreInc = req.body.qtaInc * result[0].valore_taglia;
            valoreRes = req.body.qtaRes * result[0].valore_taglia;
            console.log('valoreInc: ' + valoreInc);
            let strsql =  `update cassaws set
                            qtaInc = ${qtaInc},
                            valoreInc  = ${valoreInc},
                            qtaRes = ${qtaRes},
                            valoreRes  = ${valoreRes}
                            where id = ${id}`;
console.log('strsql per update: ----------------------- strsql per update ---------------------------------- ' + strsql);
                            db.query(strsql,(err,result) => {    
                                if(err) { 
                                    console.log(err,`----- errore in aggiornamento taglia cassawc id: ${id}`);
                                    res.status(500).send({ 
                                        message: `errore in aggiornamnto taglia cassawc ${err} --  `,
                                        rc: 'ko',
                                        data:null
                                    });  
                                    return;
                                } else {
                                    db.query(strsql_conteggi,(err,result) => {    
                                        if(err) { 
                                            console.log(err,`----- errore in aggiornamento taglia cassawc id: ${id}`);
                                            res.status(500).send({ 
                                                message: `errore in aggiornamnto taglia cassawc ${err} --  `,
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
                                            resto:result[0].resto,                                  
                                            }); 
                                        }
                                     
                                    });  
                              }
                             
                    });   
                } else {
                    console.log(`----- inesistente taglia cassawc id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna taglia cassawc presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
            }
       
    });  


}
exports.createNew = (req,res)=> {
   
    console.log('backend ----------------------------------------------------- cassaw- createnew ' + JSON.stringify(req.body));


     // creo le variabili dai campi di input
    let id = req.body.id;
    let idTaglia = req.body.idTaglia;
    let idCommanda = req.body.idCommanda;
    let qtaInc = req.body.qtaInc;
    let qtaRes = req.body.qtaRes;
    let valoreInc = req.body.valoreInc;
    let valoreRes = req.body.valoreRes;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
    
  */
  
      let strsql =  `insert into cassawcs
                  (
                    id,idTaglia,idCommanda, qtaInc, valoreInc, qtaRes, valoreRes
                  ) 
                  valueS
                  (
                    ${id},${idTaglia},${idCommanda}, ${qtaInc}, ${valoreInc}, ${qtaRes}, ${valoreRes}
                   )`;
    
                  console.log('backend - ----------- taglia cassawc - create: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova taglia cassawc su tabella cassawcs ');
              res.status(500).send({
                message: `errore in registrazione nuova taglia cassawc su tabella cassawcs - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... taglia cassawc inserita regolarmente `);
          res.status(200).send({
            message: `taglia cassawc inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
}
exports.deletebyCommanda = (req,res)=> {
    let idCommanda = req.params.idCommanda

    console.log(req.body,`cancellazione taglie cassawc  per commanda ${idCommanda}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from cassawcs where idCommanda= ${idCommanda} `;

    let strsql =  `delete from cassawcs  where idCommanda = ${idCommanda}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura cassawcs for idCommanda ${idCommanda} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione cassawc idCommanda: ${idCommanda}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione Taglie per Commanda -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `taglie per commanda: ${idCommanda} cancellate regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistenti taglie per commanda: ${idCommanda} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna taglia presente for commanda: ${idCommanda}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}

exports.azzeraFullbyidCommanda = (req,res)=> {
    let idCommanda = req.params.idCommanda;

    console.log(req.body,`azzeramento tutti importi cassa per Commanda ${idCommanda}`);  // visualizzo la struttura dei campi immessi dall'commanda 

    // definisco la strsql per lettura commanda

    let strsql = 'UPDATE `cassawcs` SET `qtaInc`=0,`valoreInc`=0, `qtaRes`=0,`valoreRes`=0 WHERE  `cassawcs`.`idCommanda` = ' + idCommanda;
   
    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore in azzeramento importi cassawc per commanda  ' + idCommanda);
            res.status(500).send({
                message: `4 errore in azzeramento importo cassawc per commanda ${idCommanda} - errore: ${err}`,
                data:null
            });
            return;
        }
        
           console.log(err,`----- azzerato importi per la cassa della commanda: ${idCommanda}`);
           res.status(200).send({ 
                    message: `Cassa azzerata correttamente   `,
                    rc: 'ok',
                    data:result
                    });  
                 
            });  
}
exports.azzeraRestobyidCommanda = (req,res)=> {
    let idCommanda = req.params.idCommanda;

    console.log(req.body,`azzeramento resto cassa per Commanda ${idCommanda}`);  // visualizzo la struttura dei campi immessi dall'commanda 

    // definisco la strsql per lettura commanda

    let strsql = 'UPDATE `cassawcs` SET `qtaRes`=0,`valoreRes`=0 WHERE  `cassawcs`.`idCommanda` = ' + idCommanda;
   
    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore in azzeramento importi cassawc per commanda  ' + idCommanda);
            res.status(500).send({
                message: `4 errore in azzeramento importo cassawc per commanda ${idCommanda} - errore: ${err}`,
                data:null
            });
            return;
        }
        
           console.log(err,`----- azzerato importi resto per la cassa della commanda: ${idCommanda}`);
           res.status(200).send({ 
                    message: `Cassa azzerata correttamente   `,
                    rc: 'ok',
                    data:result
                    });  
                 
            });  
}

exports.gettotalibyidCommanda = (req,res)=> {
    let idCommanda = req.params.idCommanda;
     
    let strsql = 'SELECT SUM(valoreInc) as incassato, SUM(valoreRes) as resto FROM `cassawcs` where cassawcs.idCommanda = ' + idCommanda; 

    console.log('backend - Cssawcs - gettotalibyidCommanda ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `step_015 errore in riconteggio cassa  per Commanda - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                console.log(`----- importo riconteggiato: ${result[0].incassato}`);
                res.status(200).send({ 
                message: `totale cassawc ricalcolata   `,
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

exports.updateRestoByid = (req,res)=> {

    console.log('backend - cassawc ----- params --------  updateRestoByid - appena entrato: ' + JSON.stringify(req.params));
    console.log('backend - cassawc ------ body -------  updateRestoByid - appena entrato: ' + JSON.stringify(req.body));
    let idTaglia = req.params.idTaglia;
    let idCommanda = req.params.idCommanda;

  
    let strsql_conteggi = 'SELECT SUM(valoreRes)  resto FROM `cassawcs` where `cassawcs`.`idCommanda` = ' + idCommanda; 
    
       // definisco la strsql per lettura utente

    let strsql_Inqu =  strSql + ' where cassawcs.idTaglia= ' + `${idTaglia} and cassawcs.idCommanda = ${idCommanda}`;

    console.log('backend - updateRestoByid -------- strsql_Inqu ----------- ' + strsql_Inqu );

    // definisco le variabili per aggiornamento campi
  
    let qtaRes = req.body.qtaRes;
    let valoreRes = req.body.valoreRes;
  
    // verifico prima l'esistenza del record
     console.log('strsql_inqu: ' + strsql_Inqu);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura taglia cassawcs for idTaglia ' + idTaglia + ' e Commanda: ' + idCommanda);
            res.status(500).send({
                message: `4 errore il lettura taglia cassawcs for idTaglia ${idTaglia} e commanda ${idCommanda} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            let id = result[0].id;
            console.log('backend - cassaw-update ' + JSON.stringify(result[0]));
            console.log('valoretaglia: ' + result[0].valore_taglia);
          //  valoreRes = req.body.qtaRes * result[0].valore_taglia;
          //  console.log('valoreRes: ' + valoreRes);
            let strsql =  `update cassawcs set
                            qtaRes = ${qtaRes},
                            valoreRes  = ${valoreRes}
                            where id = ${id}`;
console.log('strsql per update: ----------------------- strsql per update ---------------------------------- ' + strsql);
                            db.query(strsql,(err,result) => {    
                                if(err) { 
                                    console.log(err,`----- errore in aggiornamento resto taglia cassawc id: ${id}`);
                                    res.status(500).send({ 
                                        message: `errore in aggiornamnto resto taglia cassawc ${err} --  `,
                                        rc: 'ko',
                                        data:null
                                    });  
                                    return;
                                } else {
                                    db.query(strsql_conteggi,(err,result) => {    
                                        if(err) { 
                                            console.log(err,`----- errore in aggiornamento resto taglia cassawc id: ${id}`);
                                            res.status(500).send({ 
                                                message: `errore in aggiornamnto resto taglia cassawc ${err} --  `,
                                                rc: 'ko',
                                                data:null
                                            });  
                                            return;
                                        }
                                        if(result.length>0) {
                                            console.log(`----- importo riconteggiato: ${result[0].resto}`);
                                            res.status(200).send({ 
                                            message: `Taglia cassaw aggiornata regolarmente   `,
                                            rc: 'ok',
                                            resto:result[0].resto,                                  
                                            }); 
                                        }
                                     
                                    });  
                              }
                             
                    });   
                } else {
                    console.log(`----- inesistente taglia cassawc id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna taglia cassawc presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
            }
       
    });  


}
