const db = require('../db');

const strSql = "select `prenotazioneworks`.*  from  `prenotazioneworks` "

// ------   ok  nuova modalità di craere strsql  
exports.getAll = (req,res)=> {
 
    let strsql = strSql; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all prenotazioniwork  - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le prenotazioniwork  ' + result.length);  

            console.log(`rilevate ${result.length} prenotazioniwork evento `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioniwork evento',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna prenotazionework presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazionework presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `prenotazioneworks`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from prenotazioneworks where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura prenotazionework evento for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura prenotazionework evento for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   prenotazioniwork evento `)

            res.status(200).send({ 
                message:`situazione attuale per prenotazionework evento id: .....  ${id}`,
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

exports.createNew = (req,res)=> {
    
    const strsql1 ="SELECT * FROM `prenotazioneworks` WHERE id < 99999 ORDER BY id DESC;";

      console.log(req.body,'Creazione nuovo prenotazionework ');  // visualizzo la struttura dei campi immessi dall'prenotazionework evento 
  
      // creo le variabili dai campi di input
 
    
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let telefono = req.body.telefono;
      let idgiornata = req.body.idgiornata;
      let datapren = req.body.datapren;
      let persone = req.body.persone;
      let email = req.body.email;
 
      let strsql =  `insert into prenotazioneworks 
                     (cognome,nome,telefono,idgiornata,datapren,persone,email) 
                     valueS 
                     ( 
                     UCASE('${cognome}'),UCASE('${nome}'),'${telefono}',${idgiornata},'${datapren}',${persone},'${email}'
                     )`;
      
                     db.query(strsql,(err,result) => {
                        if(err) {
                           console.log(err,'errore in registrazione nuova prenotazionework  ');
                           res.status(500).send({
                             message: `errore in registrazione nuova prenotazionework  - errore: ${err}`,
                             data:null
                          });
                          return;
                        }
                           
                        db.query(strsql1,(err,result) => {
                          if(err) {
                                       console.log(err,'errore in lettura ultima prenotazionework ');
                                       res.status(500).send({
                                       message: `errore in lettura ultima prenotazionework - errore: ${err}`,
                                       rc: 'kk',
                                       data:null
                            });
                            return;
                          }
                          res.status(200).send({
                               message: `prenotazionework inserita regolarmente`,
                               rc: 'ok',
                               data:result[0],
                               lastnumber:result[0].id 
                          });
                      });
                  });

/*

      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova prenotazionework evento su tabella prenotazioneworks ');
              res.status(500).send({prenotazionework
                message: `errore in registrazione nuova prenotazionework evento su tabella prenotazioneworks - errore: ${err}`,
                data:null
            });
            return;
          }

          db.query(strsql1,(err,result) => {
            if(err) {
                         console.log(err,'errore in lettura ultima prenotazionework ');
                         res.status(500).send({
                         message: `errore in lettura ultima prenotazionework - errore: ${err}`,
                         rc: 'kk',
                         data:null
              });
              return;
            }

          console.log(result, `result ...... prenotazionework  inserita regolarmente `);
          res.status(200).send({
            message: `prenotazionework  inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });


     */
    
  }

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica prenotazionework evento id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazionework evento 

    // definisco la strsql per lettura prenotazionework evento

    let strsql_Inqu = `select * from prenotazioneworks where id= ${id} `;

    // definisco le variabili per aggiornamento campi
   
    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let telefono = req.body.telefono;
    let idgiornata = req.body.idgiornata;
    let datapren = req.body.datapren;
    let persone = req.body.persone;
    let email = req.body.email;

      let strsql =  `update prenotazioneworks set
                    cognome = UCASE('${cognome}'),
                    nome = UCASE('${nome}'),
                    telefono = '${telefono}',
                    idgiornata = ${idgiornata},
                    datapren = '${datapren}',
                    persone = ${persone},
                    email = '${email}'                 
                       where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prenotazioneworks for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura prenotazioneworks for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento prenotazionework evento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto prenotazionework evento ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato prenotazionework evento id: ${id}`);
                    res.status(200).send({ 
                        message: `prenotazionework evento aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente prenotazionework evento id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione prenotazionework evento id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazionework evento 

    // definisco la strsql per lettura prenotazionework evento

    let strsql_Inqu = `select * from prenotazioneworks where id= ${id} `;

    let strsql =  `delete from prenotazioneworks  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazioneworks for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione prenotazionework evento id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione prenotazionework evento -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `prenotazionework evento  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente prenotazionework evento id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getlast = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `prenotazioneworks`.`id` < ' + id + ' ORDER BY id DESC;';

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from prenotazioneworks where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura prenotazionework for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura prenotazionework for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  --------  ultimo insedrito -------------   prenotazioniwork `)

            res.status(200).send({ 
                message:`situazione attuale per prenotazionework id: .....  ${id}`,
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
