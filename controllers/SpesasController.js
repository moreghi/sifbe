const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `spesas`.*, `t_stato_spesas`.`d_stato_spesa`, `fornitores`.`ragsociale` from `spesas` " + 
                " inner join `t_stato_spesas` ON `t_stato_spesas`.`id` = `spesas`.`stato` " +
                " inner join `fornitores` ON `fornitores`.`id` = `spesas`.`idFornitore` ";

const order = " order by `fornitores`.`ragsociale`  asc  ";

// ------  ok 
exports.getAll = (req,res)=> {
 
    let strsql = strSql  + order; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all spese - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le spese ' + result.length);  

            console.log(`rilevati ${result.length} spese `)
            res.status(200).send({ 
                message:'Situazione attuale spese',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun spesa presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo spesa
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `spesas`.`id` = ' + id;

    console.log('backend - spesaController ----------------------------------> getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from spesas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura spesas for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura spesas for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   spese `)

            res.status(200).send({ 
                message:`situazione attuale per spesa id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuova spesa   (post)    
// ok 
exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuova spesa');  // visualizzo la struttura dei campi immessi dall'spesa 
  
      // creo le variabili dai campi di input
      let idFornitore = req.body.idFornitore;
      let stato = req.body.stato;
      let documento = req.body.documento;
      let importo = req.body.importo;
      let motivo = req.body.motivo;
      let key_utenti_operation = req.body.key_utenti_operation;
 
  /*
      Attenzione:
          trovare modalità di controllo se record già inserita
          - per id con Incremento automatico fare select su un campo unico
          - per id inserita manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
       
  
      let strsql =  `insert into spesas
                  (idFornitore,stato,documento,importo,motivo,key_utenti_operation) 
                  valueS
                  (
                     ${idFornitore},${stato},'${documento}',${importo},'${motivo}',${key_utenti_operation} 
                  )`;
      
                  console.log('backend - create ' + strsql);

      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova spesa su tabella spesas ');
              res.status(500).send({
                message: `errore in registrazione nuova spesa su tabella spesas - errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
          }
          console.log(result, `result ...... spesa inserita regolarmente `);
          res.status(200).send({
            message: `spesa inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento spesa   
  // ok
  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica spesa id ${id}`);  // visualizzo la struttura dei campi immessi dall'spesa 

    // definisco la strsql per lettura spesa

    let strsql_Inqu = `select * from spesas where id= ${id} `;

    // definisco le variabili per aggiornamento campi


    let idFornitore = req.body.idFornitore;
    let stato = req.body.stato;
    let documento = req.body.documento;
    let importo = req.body.importo;
    let motivo = req.body.motivo;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update spesas set
                    idFornitore = ${idFornitore},
                    stato = ${stato},
                    documento = '${documento}',
                    importo = ${importo},
                    motivo = '${motivo}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura spesas for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura spesas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,` ----- errore in aggiornamento spesa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto spesa ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(`----- aggiornato spesa id: ${id}`);
                    res.status(200).send({ 
                        message: `spesa aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente spesa id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  
// metodo 1  -- da sistemare

exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica spesa id ${id}`);  // visualizzo la struttura dei campi immessi dall'spesa 

  // definisco la strsql per lettura spesa

    let strsql_Inqu = `select * from spesas where id= ${id} `;
    
    // definisco 
   let usernew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            idRuolo_Day: req.body.idRuolo_Day,
            idruoloweb: req.body.idruoloweb,
            notespesa: req.body.notespesa,
            id_spese_operation: req.body.id_spese_operation,
          




       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura spesas for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura spesas for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE spesas SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento spesa id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto spesa ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `spesa aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente spesa id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione spesa   
// ok
exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione spesa id ${id}`);  // visualizzo la struttura dei campi immessi dall'spesa 

    // definisco la strsql per lettura spesa

    let strsql_Inqu = `select * from spesas where id= ${id} `;

    let strsql =  `delete from spesas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura spesas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione spesa id: ${id}`);
                        res.status(500).send({ 
                            message: `${err} `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `spesa  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente spesa id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getSpesaforFornitore = (req,res)=> {

    console.log('backend -----------------------------  getSpeseforFornitore ' + req.params.fornitore);
    
    let idFornitore = req.params.fornitore;
    let strsql = '';

    strsql =  strSql + ' where `idFornitore` = ' + idFornitore;  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3xx errore il lettura all spesas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('qaz - lettura tutti gli spese per fornitore' + result.length);  

            console.log(`rilevati ${result.length} spese `)
            res.status(200).send({ 
                message:'Situazione attuale spese per fornitore',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna spesa presente per il fornitore richiesto !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}


// ok
exports.getSpeseforStato = (req,res)=> {

    let stato = req.params.stato;
    let strsql = '';

    console.log('backend -----------------------------  getSpeseforStato ' + req.params.stato);
    
  
    strsql =  strSql + ' where `spesas`.`stato` = ' + stato +  order;;  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all spesas  per stato - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti i spese per stato ' + result.length);  

            console.log(`rilevati ${result.length} spese `)
            res.status(200).send({ 
                message:'Situazione attuale spese per stato ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna spesa presente !! `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });

}

exports.getSpeselastid = (req,res)=> {

    const strSql = "select `spesas`.*, `t_stato_spesas`.`d_stato_spesa`, `fornitores`.`ragsociale` from `spesas` " + 
                    " inner join `t_stato_spesas` ON `t_stato_spesas`.`id` = `spesas`.`stato` " +
                    " inner join `fornitores` ON `fornitores`.`id` = `spesas`.`idFornitore` ";

    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getSpeselastid ');
  
    strsql =  strSql + ' where `spesas`.`id` < ' + tappo + ' order by `spesas`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all spesas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('abc - lettura ultimo id' + result.length);  

            console.log(`rilevati ${result.length} spese `)
            res.status(200).send({ 
                message:'Situazione attuale ultimo id',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna spesa presente con lo stato richiesto  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}

exports.getCountbyspese = (req,res)=> {

    console.log('backend -----------------------------  getCountbyspese ' + JSON.stringify(req.params));
    
    let id = req.params.id;
    let totale = 0;
    let dapagare = 0;
    let pagate = 0;
    
    let strsql = '';
    let strsql0 = '';
    let strsql1 = '';
    let strsql2 = '';
   

    if(id == 999) {
        strsql = 'SELECT SUM(`spesas`.`importo`) as tot from  `spesas` ';
        strsql1 = "SELECT SUM(`spesas`.`importo`) as dapag from  `spesas` " +
                  " inner join `t_stato_spesas` ON `t_stato_spesas`.`id` = `spesas`.`stato` " +
                  " inner join `fornitores` ON `fornitores`.`id` = `spesas`.`idFornitore` " +
                  " where `t_stato_spesas`.`tipo` = 'A'"; 
        strsql2 = "SELECT SUM(`spesas`.`importo`) as pag from  `spesas` " +
                  " inner join `t_stato_spesas` ON `t_stato_spesas`.`id` = `spesas`.`stato` " +
                  " inner join `fornitores` ON `fornitores`.`id` = `spesas`.`idFornitore` " +
                  " where `t_stato_spesas`.`tipo` = 'P'";           
    }
    if(id != 999) {
        strsql = 'SELECT SUM(`spesas`.`importo`) as tot from  `spesas` where `spesas`.`idFornitore` = ' + id;
        strsql1 = "SELECT SUM(`spesas`.`importo`) as dapag from  `spesas` " +
                  " inner join `t_stato_spesas` ON `t_stato_spesas`.`id` = `spesas`.`stato` " +
                  " inner join `fornitores` ON `fornitores`.`id` = `spesas`.`idFornitore` " +
                  " where `t_stato_spesas`.`tipo` = 'A'  and `spesas`.`idFornitore` = " + id; 
        strsql2 = "SELECT SUM(`spesas`.`importo`) as pag from  `spesas` " +
                  " inner join `t_stato_spesas` ON `t_stato_spesas`.`id` = `spesas`.`stato` " +
                  " inner join `fornitores` ON `fornitores`.`id` = `spesas`.`idFornitore` " +
                  " where `t_stato_spesas`.`tipo` = 'P' and `spesas`.`idFornitore` = " + id;            
    }

    if(id == 999) {
            strsql0 = "select `spesas`.*, `t_stato_spesas`.`d_stato_spesa`, `fornitores`.`ragsociale` from `spesas` " + 
                    " inner join `t_stato_spesas` ON `t_stato_spesas`.`id` = `spesas`.`stato` " +
                    " inner join `fornitores` ON `fornitores`.`id` = `spesas`.`idFornitore` ";
    }
    if(id != 999) {
        strsql0 = "select `spesas`.*, `t_stato_spesas`.`d_stato_spesa`, `fornitores`.`ragsociale` from `spesas` " + 
                " inner join `t_stato_spesas` ON `t_stato_spesas`.`id` = `spesas`.`stato` " +
                " inner join `fornitores` ON `fornitores`.`id` = `spesas`.`idFornitore` " +
                " where `spesas`.`idFornitore` = " + id;
}

console.log('start - id: ' + id + ' strsql: ' + strsql + ' strsql0: ' + strsql0);
db.query(strsql0,(err,result)=> {
    if(err) {
        res.status(500).send({
             message: `kuytr errore in lettura conteggi all spese - erro: ${err}`,
             data:null
         });
         return;
     }
     if(result.length === 0) {
        if(id !== 999) {
            res.status(200).send({ 
                message: `nessuna spesa presente per il fornitore richiesto  !! `,
                rc: 'nf',
                totale: 0,
                dapagare: 0,
                pagate: 0
            });
            return;        
        }
        if(id === 999) {
            res.status(200).send({ 
                message: `nessuna spesa presente  !! `,
                rc: 'nf',
                totale: 0,
                dapagare: 0,
                pagate: 0
            });
            return;        
        }            
     } 
    });
   
    console.log(`strsql ----  step1 :  ${strsql} `);

    totale = 0;
    dapagare = 0;
    pagate = 0;

    db.query(strsql,(err,result)=> {
        if(err) {
            res.status(500).send({
                 message: `3xwq errore in lettura conteggi all spese - erro: ${err.JSON}`,
                 data:null
             });
             return;
         }

         if(result.length>0)  {
            totale = result[0].tot;
            if(totale == 0) {
                console.log('--------------   per id ' + id + ' non trovati movimenti ');
                res.status(200).send({ 
                    message:'prodotto non movimentato',
                    rc: 'ko',
                    totale:0,
                    dapagare:0,
                    pagate:0
                 });
                return;
            }
          };
         
            db.query(strsql1,(err,result)=> {
                    if(err) {
                        res.status(500).send({
                            message: `3xwq errore in lettura conteggi all commandarigas per prodotto da cucinare - erro: ${err}`,
                            data:null
                        });
                        return;
                    } 
                    dapagare = 0;
                    if(result.length>0) {
                        if(result[0].dapag != null) {
                            dapagare = result[0].dapag; 
                        } else {
                            dapagare = 0; 
                            res.status(200).send({ 
                                message:'Situazione attuale totali spese ',
                                rc: 'ok',
                                totale,
                                dapagare,
                                pagate
                            }); 
                            return; 
                        }
                    }
            });
           
            db.query(strsql2,(err,result)=> {
                if(err) {
                   res.status(500).send({
                        message: `3acr errore in lettura conteggi all commandarigas per prodotto da consegnare - erro: ${err}`,
                        data:null
                    });
                    return;
                } 
                pagate = 0;
                if(result.length>0) {
                    if(result[0].pag != null) {
                        pagate = result[0].pag; 
                    } else {
                        pagate = 0;  
                    }
                  
          //          console.log('trovati da consegnare: ' + daconsegnare);
                } 
                res.status(200).send({ 
                    message:'Situazione attuale totali spese ',
                    rc: 'ok',
                    totale,
                    dapagare,
                    pagate
                });

          });
     });

}

exports.getTotalibyspese = (req,res)=> { 

    console.log(`getTotalibyspese  appenna entrato`);
    
 let strsql = '';   
      strsql = "select distinct `fornitores`.`ragsociale`, SUM(`spesas`.`importo`) as importo, `spesas`.`idFornitore` from  `spesas` " +
             " inner join `fornitores` ON `fornitores`.`id` = `spesas`.`idFornitore` ";

             console.log(`strsql:  ${strsql} `);
             db.query(strsql,(err,result)=> {
                 if(err) {
                    res.status(500).send({
                         message: `553x errore il lettura all spesas - erro: ${err}`,
                         data:null
                     });
                     return;
                 }
                 if(result.length>0) {
                     console.log('abc - lettura ultimo id' + result.length);  
         
                     console.log(`rilevati ${result.length} fornitori `)
                     res.status(200).send({ 
                         message:'Situazione attuale fornitori',
                         rc: 'ok',
                         number:  result.length,
                         data:result
                     });                    
                 }else {
                     console.log('nessun record presente ' + result.length); 
         
                     res.status(200).send({ 
                         message: `nessuna fornitore per spese  !! `,
                         rc: 'nf',
                         data:null
                     });                    
                 }
         
             });

}

exports.getimportispeseFornitore = (req,res)=> { 

  

    let id = req.params.id
    //let stato = req.params.stato;
    let stato1 = 1;
    let sttao2 = 2;
    let dapagare = 0;
    let pagate = 0;

    console.log(`getimportispeseFornitore  appenna entrato  params: ${JSON.stringify(req.params)}`);
    
    let strsql = ''; 
    let strsql1 = 'SELECT distinct sum(importo) as totale FROM `spesas` WHERE idFornitore =' + id + ' and stato = 1'; 
    let strsql2 = 'SELECT distinct sum(importo) as totale FROM `spesas` WHERE idFornitore =' + id + ' and stato = 2';

    //  strsql = 'SELECT distinct sum(importo) as totale FROM `spesas` WHERE idFornitore =' + id + ' and stato = '+ stato; 
             console.log(`strsql:  ${strsql1} `);
             db.query(strsql1,(err,result)=> {
                 if(err) {
                    res.status(500).send({
                         message: `553x errore il lettura all spesas - erro: ${err}`,
                         data:null
                     });
                     return;
                 }
                 dapagare = 0;
                 if(result.length>0) {
                     if(result[0].totale != null) {
                         dapagare = result[0].totale; 
                     } else {
                         dapagare = 0; 
                     }
                 }
             });


             db.query(strsql2,(err,result)=> {
                if(err) {
                   res.status(500).send({
                        message: `3acr errore in lettura conteggi all commandarigas per prodotto da consegnare - erro: ${err}`,
                        data:null
                    });
                    return;
                } 
                pagate = 0;
                if(result.length>0) {
                    if(result[0].totale != null) {
                        pagate = result[0].totale; 
                    } else {
                        pagate = 0;  
                    }
                  
          //          console.log('trovati da consegnare: ' + daconsegnare);
                } 
                res.status(200).send({ 
                    message:'Situazione attuale totali spese ',
                    rc: 'ok',
                    dapagare,
                    pagate
                });
            });

        }



