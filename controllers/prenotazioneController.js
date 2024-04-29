const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const saltRounds = 10;
const crypto = require("crypto");
const hash = bcrypt.hashSync("generic", salt);
const nodemailer = require('nodemailer');
const sendEmail = require('./../helpers/send-email');

// moreno per gestire nome del url di frontend per invio email
const configm = require("../configmoreno.json");

const strSql = "select `prenotaziones`.*, `t_stato_prenotaziones`.`d_stato_prenotazione`  from  `prenotaziones` " + 
               " inner join `t_stato_prenotaziones` ON `t_stato_prenotaziones`.`id` = `prenotaziones`.`idstato` "


// ------   ok  nuova modalità di craere strsql  
exports.getAll = (req,res)=> {
 
    let strsql = strSql; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all prenotazioni  - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le prenotazioni  ' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna prenotazione presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo prenotazione evento
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `prenotaziones`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from prenotaziones where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura prenotazione evento for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura prenotazione evento for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   prenotazioni evento `)

            res.status(200).send({ 
                message:`situazione attuale per prenotazione evento id: .....  ${id}`,
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

// creazione nuovo prenotazione evento   (post)    // ok

exports.createNew = (req,res)=> {
    
    const strsql1 ="SELECT * FROM `prenotaziones` WHERE id < 99999 ORDER BY id DESC;";

      console.log(req.body,'Creazione nuovo prenotazione ');  // visualizzo la struttura dei campi immessi dall'prenotazione evento 
  
      // creo le variabili dai campi di input
 
  
      let idstato = req.body.idstato;
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let idgiornata = req.body.idgiornata;
      let telefono = req.body.telefono;
      let datagiornata = req.body.datagiornata;
      let datapren = req.body.datapren;
      let dataconf = req.body.dataconf;
      let persone = req.body.persone;
      let email = req.body.email;
      let token = req.body.token;
      let tipo = req.body.tipo;
      let key_utenti_operation = req.body.key_utenti_operation;

      let strsql =  `insert into prenotaziones
                  (idstato,cognome,nome,idgiornata,telefono,datagiornata,datapren,dataconf,persone,email,key_utenti_operation,token,tipo) 
                  valueS
                  (
                    ${idstato},UCASE('${cognome}'),UCASE('${nome}'),${idgiornata},'${telefono}','${datagiornata}','${datapren}','${dataconf}',${persone},'${email}' ,${key_utenti_operation},'${token}',UCASE('${tipo}')
                  )`;
      
                  db.query(strsql,(err,result) => {
                    if(err) {
                       console.log(err,'errore in registrazione nuova prenotazione  ');
                       res.status(500).send({
                         message: `errore in registrazione nuova prenotazione  - errore: ${err}`,
                         data:null
                      });
                      return;
                    }
                    
                    db.query(strsql1,(err,result) => {
                      if(err) {
                                   console.log(err,'errore in lettura ultima prenotazione  ');
                                   res.status(500).send({
                                   message: `errore in lettura ultima prenotazione - errore: ${err}`,
                                   rc: 'kk',
                                   data:null
                        });
                        return;
                      }
                      res.status(200).send({
                           message: `prenotazione inserita regolarmente`,
                           rc: 'ok',
                           data:result[0],
                           lastnumber:result[0].id 
                      });
                  });
              });
/*


      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova prenotazione evento su tabella prenotaziones ');
              res.status(500).send({
                message: `errore in registrazione nuova prenotazione evento su tabella prenotaziones - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... prenotazione evento inserita regolarmente `);
          res.status(200).send({
            message: `prenotazione evento inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    */
  }
  
  // aggiornamento prenotazione evento   // metodo 2  -- funziona  // ok

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica prenotazione evento id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazione evento 

    // definisco la strsql per lettura prenotazione evento

    let strsql_Inqu = `select * from prenotaziones where id= ${id} `;

    // definisco le variabili per aggiornamento campi
   
    let idstato = req.body.idstato;
    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let idgiornata = req.body.idgiornata;
    let telefono = req.body.telefono;
    let datagiornata = req.body.datagiornata;
    let datapren = req.body.datapren;
    let dataconf = req.body.dataconf;
    let persone = req.body.persone;
    let email = req.body.email;
    let token = req.body.token;
    let tipo = req.body.tipo;
    let key_utenti_operation = req.body.key_utenti_operation;

      let strsql =  `update prenotaziones set
                    cognome = UCASE('${cognome}'),
                    nome = UCASE('${nome}'),
                    idgiornata = ${idgiornata},
                    telefono = '${telefono}',
                    datagiornata = '${datagiornata}',
                    datapren = '${datapren}',
                    dataconf = '${dataconf}',
                    persone = ${persone},
                    email = '${email}',
                    token = '${token}',
                    tipo = UCASE('${tipo}'),
                    idstato = ${idstato},
                    key_utenti_operation = ${key_utenti_operation}
                       where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('--------------------------------------------- update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prenotaziones for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura prenotaziones for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento prenotazione evento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto prenotazione evento ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato prenotazione evento id: ${id}`);
                    res.status(200).send({ 
                        message: `prenotazione evento aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente prenotazione evento id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento prenotazione evento   // metodo 1  -- da sistemare


// cancellazione prenotazione evento   // ok

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione prenotazione evento id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazione evento 

    // definisco la strsql per lettura prenotazione evento

    let strsql_Inqu = `select * from prenotaziones where id= ${id} `;

    let strsql =  `delete from prenotaziones  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotaziones for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione prenotazione evento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione prenotazione evento -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `prenotazione evento  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente prenotazione evento id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getPrenotazinidaEvadere = (req,res)=> {

    console.log('backend -----------------------------  getPrenotazinidaEvadere ' );
    
    let stato = 0;
    let strsql = '';
  
    strsql =  strSql + ' where `idstato` = ' + stato;  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prenotaziones da evadere - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutte le prenotazioni evento da evadere' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento da evadere',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione evento presente !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

//  ok
exports.getPrenotazinidaEvaderebyevento = (req,res)=> {

    console.log('backend -----------------------------  getPrenotazinidaEvaderebyevento ' + req.params.idevento);
    
    let idevento = req.params.idevento;
    let stato = 0;
    let strsql = '';
  
    strsql =  strSql + ' where `idstato` = ' + stato + ' and `idevento` = ' + idevento;  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prenotaziones da evadere - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti gli prenotazioni evento da evadere' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione evento presente !! `,
                number:  result.length,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

// ok
exports.getPrenotazinibystato = (req,res)=> {
    
    console.log('backend ---------------------  getPrenotazinibystato  day: ' + req.params.idday  + ' stato: ' + req.params.stato);
  
    let idday = req.params.idday;
    let stato = req.params.stato;
  
    let strsql = '';

    strsql =  strSql + ' where `idstato` = ' + stato + ' and `idgiornata` = ' + idday;  
    console.log(`strsql:  ${strsql} `);
  
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `55x errore il lettura all prenotaziones per stato - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('yyy - lettura tutte le  prenotazioni per stato' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni per stato e giorno',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessunaz prenotazione presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// ok  
exports.getPrenotazionibyemail = (req,res)=> {
    
    let email = req.params.email;
    let strsql = '';

    console.log('backend -----------------------------  getPrenotazinibyemail ' + req.params.email);
    
   
    strsql =  strSql + " where `email` = '" + email + "' ";  
    console.log(`strsql:  ${strsql} `);
      db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prenotaziones per email - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xyz - lettura tutte le prenotazioni evento per email' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento per email',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione evento presente con la email richiesta  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getPrenotazinibyevento = (req,res)=> {

        console.log('backend -----------------------------  getPrenotazinidaEvaderebyevento ' + req.params.idevento);
        
        let idevento = req.params.idevento;
      
        let strsql = '';
      
        strsql =  strSql + ' where idevento = ' + idevento;  
        console.log(`strsql:  ${strsql} `);
        db.query(strsql,(err,result)=> {
            if(err) {
               res.status(500).send({
                    message: `3x errore il lettura all prenotaziones per evento - erro: ${err}`,
                    data:null
                });
                return;
            }
            if(result.length>0) {
                console.log('xxx - lettura tutti gli prenotazioni evento per id' + result.length);  
    
                console.log(`rilevate ${result.length} prenotazioni evento `)
                res.status(200).send({ 
                    message:'Situazione attuale prenotazioni evento',
                    number:  result.length,
                    rc: 'ok',
                    data:result
                });                    
            }else {
                console.log('nessun record presente ' + result.length); 
    
                res.status(200).send({ 
                    message: `nessuna prenotazione evento presente !! `,
                    number:  result.length,
                    rc: 'nf',
                    data:null
                });                    
            }
    
        });
    
}

exports.getCountbyevento = (req,res)=> {

        console.log('backend -----------------------------  getCountbyevento ' + JSON.stringify(req.params));
        
        let id = req.params.id;
     
        let locevento = '';
  
      
    
        let strsql = 'SELECT COUNT(prenotaziones.id) as numPr from  `prenotaziones` ' +
                     ' where `prenotaziones`.`idevento` = ' + id;
      
                     /*
        let strSql1 = 'select `prenotaziones`.*, `locandinas`.`photo` as locandina  from  `prenotaziones` ' + 
                    ' inner join `locandinas` ON `locandinas`.`id` = `prenotaziones`.`idevento` ' +
                    ' where `prenotaziones`.`idevento` = ' + id;

 */

       
        console.log(`strsql:  ${strsql} `);
       // let strsql = 'SELECT commandas.*, t_ruolos.d_ruolo FROM commandas INNER JOIN t_ruolos ON t_ruolos.id = commandas.idRuolo WHERE commandas.idRuolo > 0 ';
       locevento = 'merda';
       db.query(strsql,(err,result)=> {
       if(err) {
                res.status(500).JSON.send({
                     message: `3xwq errore in lettura conteggi all prenotaziones - erro: ${err.JSON}`,
                     data:null
                 });
                 return;
         }
         console.log('result : ' + result.length);

         if(result.length>0) {
            if(result[0].numPr === 0) {
                console.log('nessun record presente ' + result.length); 
           
                res.status(200).send({ 
                    message: `evento senza prenotazioni !! `,
                    number:  result.length,
                    rc: 'ok',
                    prenotati: 0
                });               
            } else {
                console.log(`rilevate ${result.length} prenotazioni evento `)
                res.status(200).send({ 
                    message:'Situazione attuale prenotazioni evento',
                    number:  result.length,
                    rc: 'ok',
                    prenotati: result[0].numPr
                });
            }
                               
        }else {
            console.log('nessun record presente ' + result.length); 
           
            res.status(200).send({ 
                message: `evento senza prenotazioni !! `,
                number:  result.length,
                rc: 'nfxx',
                prenotati: 0 
            });                    
        }
   
    });

}

exports.getCountbyeventoTest = (req,res)=> {

    console.log('backend -----------------------------  getCountbyevento ' + JSON.stringify(req.params));
    
    let id = req.params.id;
    let stato_0 = 0;
    let stato_1 = 1;
   
    let nPren = 0;
    let nPren0 = 9;
    let nPren1 = 0;
   
 
    let strsql = 'SELECT COUNT(prenotaziones.id) as numPr from  `prenotaziones` ' +
                 ' where `prenotaziones`.`idevento` = ' + id;

    let strsql_0 = 'SELECT COUNT(prenotaziones.id) as numPr0 from  `prenotaziones` ' +
                 ' where `prenotaziones`.`idevento` = ' + id + ' and `prenotaziones`.`idstato` = ' + stato_0;

    let strsql_1 = 'SELECT COUNT(prenotaziones.id) as numPr1 from  `prenotaziones` ' +
                 ' where `prenotaziones`.`idevento` = ' + id + ' and `prenotaziones`.`idstato` = ' + stato_1;


    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT commandas.*, t_ruolos.d_ruolo FROM commandas INNER JOIN t_ruolos ON t_ruolos.id = commandas.idRuolo WHERE commandas.idRuolo > 0 ';
  
   db.query(strsql,(err,result)=> {
   if(err) {
            res.status(500).JSON.send({
                 message: `3xwq errore in lettura conteggi all prenotaziones - erro: ${err.JSON}`,
                 data:null
             });
             return;
     }
     console.log('result : ' + result.length);

     if(result.length>0) {
        if(result[0].numPr === 0) {
            console.log('nessun record presente ' + result.length); 
       
            res.status(200).send({ 
                message: `evento senza prenotazioni !! `,
                number:  result.length,
                rc: 'ok',
                prenotati: 0,
                prenotatiO: 0,
                prenotati1: 0
            });               
        } else {
            db.query(strsql_0,(err,result0)=> {
                console.log('result--- lettura 0 : ' + result0.length);
                console.log('result--- result0[0].numPr0 : ' + result0[0].numPr0);
                if(result0.length>0) {
                    nPren0  = result0[0].numPr0
                } 
            });
            db.query(strsql_1,(err,result1)=> {
                console.log('result--- lettura 1 : ' + result1.length);
                if(result1.length>0) {
                    nPren1 = result1[0].numPr1
                } 
            });
            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento',
                number:  result.length,
                rc: 'ok',
                prenotati: result[0].numPr,
                prenotatiO: nPren0,
                prenotati1: 0
            });
        }
                           
    }else {
        console.log('nessun record presente ' + result.length); 
       
        res.status(200).send({ 
            message: `evento senza prenotazioni !! `,
            number:  result.length,
            rc: 'nfxx',
            prenotati: 0,
            prenotatiO: 0,
            prenotati1: 0 
        });                    
    }

});

}


exports.getPrenotazionibygiornata = (req,res)=> {

    console.log('backend -----------------------------  getPrenotazionibygiornata ' + req.params.idgiornata);
    
    let idgiornata = req.params.idgiornata;
  
    let strsql = '';
  
    strsql =  strSql + ' where idgiornata = ' + idgiornata;  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prenotaziones per giornata - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutte le prenotazioni per giornata' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni per giornata `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni per giornata',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione per la giornata selezionata presente !! `,
                number:  result.length,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

exports.getCountbyeventoestato = (req,res)=> {

    console.log('backend -----------------------------  getCountbyevento ' + JSON.stringify(req.params));
    
    let id = req.params.id;
    let stato = req.params.stato;
    let locevento = '';

    let strsql = 'SELECT COUNT(prenotaziones.id) as numPr from  `prenotaziones` ' +
                 ' where `prenotaziones`.`idevento` = ' + id + ' and `prenotaziones`.`idstato` = ' + stato;
  
                 /*
    let strSql1 = 'select `prenotaziones`.*, `locandinas`.`photo` as locandina  from  `prenotaziones` ' + 
                ' inner join `locandinas` ON `locandinas`.`id` = `prenotaziones`.`idevento` ' +
                ' where `prenotaziones`.`idevento` = ' + id;

*/

   
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT commandas.*, t_ruolos.d_ruolo FROM commandas INNER JOIN t_ruolos ON t_ruolos.id = commandas.idRuolo WHERE commandas.idRuolo > 0 ';
   locevento = 'merda';
   db.query(strsql,(err,result)=> {
   if(err) {
            res.status(500).JSON.send({
                 message: `3xwq errore in lettura conteggi all prenotaziones - erro: ${err.JSON}`,
                 data:null
             });
             return;
     }
     console.log('result : ' + result.length);

     if(result.length>0) {
        if(result[0].numPr === 0) {
            console.log('nessun record presente ' + result.length); 
       
            res.status(200).send({ 
                message: `evento senza prenotazioni !! `,
                number:  result.length,
                rc: 'ok',
                prenotati: 0
            });               
        } else {
            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento',
                number:  result.length,
                rc: 'ok',
                prenotati: result[0].numPr
            });
        }
                           
    }else {
        console.log('nessun record presente ' + result.length); 
       
        res.status(200).send({ 
            message: `evento senza prenotazioni !! `,
            number:  result.length,
            rc: 'nfxx',
            prenotati: 0 
        });                    
    }

});

}

exports.getdaEvadere = (req,res)=> {
    
    let stato = 0;
  
    let strsql = '';

    strsql =  strSql + ' where `idstato` = ' + stato;  
    console.log(`strsql:  ${strsql} `);
  
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `55x errore il lettura all prenotaziones da evadere - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('yyy - lettura tutte le  prenotazioni evento da evadere' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento da evadere',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user pressente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.prenotazioneConfermata  = (req,res)=> {


    console.log('parametri Passati : ' + JSON.stringify(req.body));   
   
    let id = req.body.id;
    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let tipo = req.body.tipo;
    let idgiornata = req.body.idgiornata;
    let telefono = req.body.telefono;
    let datagiornata = req.body.datagiornata;
    let datapren = req.body.datapren;
    let dataconf = req.body.dataconf;
    let persone = req.body.persone;
    let email = req.body.email;
    let token = req.body.token;
   
    let strsql = 'select `prenotaziones`.* from  `prenotaziones` where `prenotaziones`.`id` = ' + id;
    
    console.log('backend --  su prenotaziones--- prenotazioneConfermata - strsql ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura eventos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura eventos for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
          
 	    send_gmmailfor_prenotazione_confermata(email,cognome,nome,datagiornata, persone);
          	console.log(result, `result ...... mail di conferma Prenotazione serata Sanfre inviata regolarmente `);
            res.status(200).send({
            message: `mail di conferma Prenotazione serata Sanfra inviata regolarmente`,
            rc: 'ok',
            data:result
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


exports.sendprenotazionedaConfermare = (req,res) => {

    console.log('backend - sendprenotazionedaConfermare  -- appena entrato')
    let prodotti = '';

    let id = req.body.id;
    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let tipo = req.body.tipo;
    let idgiornata = req.body.idgiornata;
    let telefono = req.body.telefono;
    let datagiornata = req.body.datagiornata;
    let datapren = req.body.datapren;
    let dataconf = req.body.dataconf;
    let persone = req.body.persone;
    let email = req.body.email;
    let token = req.body.token;
      
    let strsql = 'select `prenotaziones`.* from  `prenotaziones` where `prenotaziones`.`id` = ' + id;

    let strsql1 = 'select `prenotazioneprodottos`.* from  `prenotazioneprodottos` where `prenotazioneprodottos`.`idprenot` = ' + id;
    try{
   
console.log('--- strsql verifica esistenza prenotazione:  ' + strsql );        

  if(tipo == 'N') {
        db.query(strsql,(err,result) => {
            if(err) { 
                        console.log(err,'errore in lettura Prenotazione su tabella prenotaziones ');
                        res.status(500).send({
                        message: `errore in lettura Prenotazione su tabella prenotaziones - errore: ${err}`,
                        data:null
                        });
                        return;
            }
            if(result.length>0) {
                send_gmmailfor_prenotazione_daconfermare(email,cognome,nome,datagiornata,persone,token, telefono)
                console.log(result, `result ...... inviata correttamente richiesta conferma Prenotazione  `);
                res.status(200).send({
                    message: `inviata correttamente richiesta conferma Prenotazione`,
                    rc: 'ok',
                    data:result[0]
                    });
                }
        });
    }

    if(tipo == 'P') {
        db.query(strsql1,(err,result) => {
            if(err) { 
                        console.log(err,'errore in lettura Prenotazione su tabella prenotaziones ');
                        res.status(500).send({
                        message: `errore in lettura Prenotazione su tabella prenotaziones - errore: ${err}`,
                        data:null
                        });
                        return;
            }
            if(result.length>0) {
                console.log('letto i pporodotti  per prenotazione ---------------------->>>>> '  + JSON.stringify(result))
                console.log('result.length: ' + result.length);
                    for(var i = 0; i < result.length; i++)
                    {
                    riga = '<tr><br>' +
                            '<td style="width = 200px; table-layout:fixed;height:auto;border-collapse: collapse; border-color:red">' + result[i].descrizione + '</td>' +
                            '&nbsp;&nbsp;<td style="width=200px; table-layout:fixed; text-align: center;">' + result[i].qta + '</td>&nbsp;' +
                            '&nbsp;&nbsp;<td style="width=200px; table-layout:fixed; text-align: center;">' + result[i].prezzo + '</td>&nbsp;' +
                            '</tr>' 
                    prodotti = prodotti + riga;
                    riga = '';

                    }

                    console.log('tabella con prodotti: ' + prodotti) 
                send_gmmailfor_prenotazione_daconfermareProdotti(email,cognome,nome,datagiornata,persone,token, telefono, prodotti)
                console.log(result, `result ...... inviata correttamente richiesta conferma Prenotazione  con prodotti `);
                res.status(200).send({
                        message: `inviata correttamente richiesta conferma Prenotazione`,
                        rc: 'ok',
                        data:result[0]
                        });
            }
        });
    }

}catch(error){
        res.status(500).json({
            message: "Errore in invio richiesta conferma Prenotazione ",
            PrenConfirm: [],
            rc: 'ko',
            error: error.message
        });
    }

}


//  metodo creato da moreno per inoltro mail di conferma prenotazione
//  ----------------------------------------------------------------------------------------   funziona
async function send_gmmailfor_prenotazione_daconfermare(sendto,cognome,nome, dataev, persone, token, telefono) {
    let message;

    let urlfrontend = configm.hostfe;
  
    console.log('-------------------------------->>>>> urlfrontend ' + urlfrontend);
    //   const confURL = `http://localhost:4200/evento/prenotazioneeventoConferma?token=${token}`;  originaria

    const confURL = `${urlfrontend}/prenotazioneConferma?token=${token}`;

        message = `<p>Buongiorno sig <strong>${cognome} ${nome}</strong></p>
                    <br>
                    <p>ti diamo conferma di aver registrato la tua richiesta di partecipazione alla serata  del  <strong>${dataev}</strong></p>
                    <p>Se intendi confermare la tua partecipazion, ti chiediamo di darne conferma cliccando sul pulsante "Conferma" che trovi in fondo alla email.</p>
                    <p>Le tue modalità di contatto, come da te indicate nella pagina di registrazione sono:</p>
                    <p>- email: ${sendto}</p>
                    <p>- cellulare: ${telefono}</p>
                    <br>
                    <p>Saremo felici di accoglierti con i tuoi ${persone} ospiti e di condividere con noi lo spirito di Sanfra in Festa</p>
                    <br>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Staff Sanfra in Festa</p>
                    <br>
                    <p>per garantire la massima sicurezza, ti preghiamo di inserire il codice qui sotto riportato</p>
                    <br>
                    <p>          Codice personale di Prenotazione  &nbsp;&nbsp;&nbsp; <strong>${token}</strong></p>
                    <br>
                    
                    <p>ti preghiamo di cliccare sul link sottostante per rendere operativa la prenotazione</p>
                    <p><a href="${confURL}"><button>Conferma Prenotazione</button></a></p>`;       
    
                   await sendEmail({
                    to: sendto,
                    subject: `Sanfra in Festa - Conferma Prenotazione serata: ${dataev}`,
                    html: `<h4>Prenotazione serata del ${dataev}</h4>
                           ${message}`
                });
    }

    async function send_gmmailfor_prenotazione_confermata(sendto,cognome,nome,dataev, persone ) {
        let message;
            message = `<p>Buongiorno sig <strong>${cognome} ${nome}</strong></p>
                        <br>
                        <p>ti diamo conferma di aver registrato la tua richiesta di partecipazione alla serata del <strong>${dataev}</strong>.</p>
                        <br>
                        <p>Saremo lieti di attenderti al nostro Stand assieme ai tuoi ${persone}  ospiti.</p>
                        <p>ti ringraziamo per la stima che ci hai riservato </p>
                        <br>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Staff Sanfra in Festa</p>`;
                       
                      
        
                       await sendEmail({
                        to: sendto,
                        subject: `Sanfra in Festa - Conferma Prenotazione serata del : ${dataev}`,
                        html: `<h4>Prenotazione serata del ${dataev}</h4>
                               ${message}`
                    });
        }
    // ------   ok  nuova modalità di craere strsql  
exports.giornateConf = (req,res)=> {

    var id = req.params.id;
    let valoreZero = '0';
    console.log('giornateConf ---------------  id: ' + id);
    
    let strSql1 = "SELECT `prenotaziones`.* FROM `prenotaziones`  where `prenotaziones`.`idstato` = 0 and `prenotaziones`.`idevento` = " + id  + 
             " GROUP BY `prenotaziones`.`dataconf` ORDER BY `prenotaziones`.`dataconf` desc";
             

             console.log('giornateConf: ------ ' + strSql1);




 
   // let strsql = "SELECT DISTINCT `prenotaziones`.* FROM `prenotaziones` where `prenotaziones`.`dataconf` > '0' and `prenotaziones`.`idevento` = " + id; 
   // console.log('giornateConf: ------ ' + strsql);
    
    db.query(strSql1,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all giornate prenotazioni  - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le prenotazioni  ' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale date prenotazioni evento',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna prenotazione presente per giornate ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getPrenotazionibyeventoestato = (req,res)=> {

    let idevento = req.params.idevento;
    let stato = req.params.stato;
  
    console.log('backend -----------------------------  getPrenotazionibyeventoestato ' + req.params.idevento + ' ' +  req.params.stato);
    
  
    let strsql = '';
  
    strsql =  strSql + ' where `prenotaziones`.`idevento` = ' + idevento + ' and `prenotaziones`.`idstato` = ' + stato;  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prenotaziones per evento - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti gli prenotazioni evento per id' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione evento presente !! `,
                number:  result.length,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

exports.getPrenotazionibydataconf = (req,res)=> {
    
    let dataconf = req.params.dataconf;
    let strsql = '';

    console.log('backend -----------------------------  getPrenotazinibydataconf ' + dataconf);
    
   
    strsql =  strSql + " where `dataconf` = '" + dataconf + "' ";  
    console.log(`strsql:  ${strsql} `);
      db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prenotaziones per dataconf - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xyz - lettura tutte le prenotazioni evento per dataconf' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni evento per la data selezionata `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni evento per dataconf',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione evento presente con la dataconf richiesta  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getbycognnometoken = (req,res)=> {
 
    let cognome = req.params.cognome;
    let nome = req.params.nome;
    let token = req.params.token;
   
    const strsql = "select `prenotaziones`.*  from  `prenotaziones` " + 
                   " where `prenotaziones`.`cognome` = '" + cognome + "' and `prenotaziones`.`nome` = '" + nome + "'  and  `prenotaziones`.`token` = '" + token + "'";
    
   // const strsql = strSql + " where `eventopostos`.`cognome` = '" + cognome + "' and `eventopostos`.`nome` = '" + nome + "'  and  `eventopostos`.`token` = '" + token + "'";

    console.log('getbycognnometoken - strsql: ' + strsql);
      
    db.query(strsql,(err,result)=> {
        if(err) {""
           res.status(500).send({
                message: `3ffrdsf errore il lettura all prenotaziones per cognome-nome-token     erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura prenotaziones per cognome, nome e token ' + result.length);  

            console.log(`rilevati ${result.length} posti `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result[0],
                idtipo: result[0].idtipo
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun eventoPosto presente --- 1`,
                rc: 'nf',
                data:null
            });                    
        }

    });
}




// ------------------------------   per messaggio prenotazione con prodotti   merda

async function send_gmmailfor_prenotazione_daconfermareProdotti(sendto,cognome,nome, dataev, persone, token, telefono, prodotti) {
//async function send_gmmailfor_prenotazione_evento(sendto,cognome, nome,datapren, codpren, token, telefono, importo, posti,iban,cognome1,nome1,descEvento, dataEvento,oraEvento, localita, indirizzo,tiporeg) {
    
    console.log('------------------------___________________________ send_gmmailfor_prenotazione_daconfermareProdotti -- inizio')
    
    let message;
     
     // vecchia definizione  2023/12/29
    //  const confURL = `http://localhost:4200/evento/prenotazioneeventoConferma?token=${token}`;

      let urlfrontend = configm.hostfe;
  
      console.log('-------------------------------->>>>> urlfrontend ' + urlfrontend);
      //   const confURL = `http://localhost:4200/evento/prenotazioneeventoConferma?token=${token}`;  originaria
  
     
      const confURL = `${urlfrontend}/prenotazioneConferma?token=${token}`;

      message = `<p>Gent. sig <strong>${cognome} ${nome}</strong></p>
                <br>
                
                <p>ti diamo conferma di aver registrato la tua richiesta di partecipazione alla serata  del  <strong>${dataev}</strong></p>
                <p>Se intendi confermare la tua partecipazione, ti chiediamo di darne conferma cliccando sul pulsante "Conferma" che trovi in fondo alla email.</p>
                <p>Le tue modalità di contatto, come da te indicate nella pagina di registrazione sono:</p>
                <p>- email: ${sendto}</p>
                <p>- cellulare: ${telefono}</p>
                <br>
                <p>i Prodotti che hai ordinato per la serata sono i seguenti:</p>
                <p> 
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col" style="width=200px">Prodotto</th>
                                <th scope="col" style="width=200px">Quantità</th>
                                <th scope="col" style="width=200px">Prezzo</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${prodotti}
                        </tbody>
                    </table>  
                </p>
                <br>
                <p>per garantire la massima sicurezza, ti preghiamo di inserire il codice qui sotto riportato</p>
                <br>
                <p>          Codice personale di Prenotazione evento &nbsp;&nbsp;&nbsp; <strong>${token}</strong></p>
                <br>
                <p>ti preghiamo di cliccare sul link sottostante per rendere operativa la prenotazione</p>
                <br>
                <p>Saremo felici di accoglierti con i tuoi ${persone} ospiti e di condividere con noi lo spirito di Sanfra in Festa</p>
                <br>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Staff Sanfra in Festa</p>
                <br>
                <p><a href="${confURL}"><button>Conferma Prenotazione</button></a></p>`;


//console.log('------------- messaggio --------------------------      messagio per email: ' + message)



     await sendEmail({
      to: sendto,
      subject: `Sanfra in Festa - Prenotazione serata: ${dataev}`,
      html: `<h4>Prenotazione serata del ${dataev}</h4>
             ${message}`
         });
             
}



exports.getbytoken = (req,res)=> {
    
    let token = req.params.token;
      
    const strsql = strSql + " where `prenotaziones`.`token` = '" + token + "'";

    console.log('backend - getbytoken - strsql --> ' + strsql);
  
   // let strsql = `select * from prenotaziones where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura prenotazione for token ' + token);

            res.status(500).send({
                message: `2 errore il lettura prenotazione for id ${token}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   prenotazione `)

            res.status(200).send({ 
                message:`situazione attuale per prenotazione token : .....  ${token}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per token: ${token} `);
            res.status(200).send({
                message: `nessun user pressente for token: ${token}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}
