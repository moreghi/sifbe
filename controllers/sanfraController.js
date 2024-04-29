const strSql = 'select `sanfras`.* ' +
                ' FROM `sanfras` ' 

const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * fromsanfras';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura allsanfras - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte associaoni ' + result.length);  

            console.log(`rilevati ${result.length} associazioni `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun socio pressente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo socio
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `sanfras`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * fromsanfras where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il letturasanfras for id ' + id);

            res.status(500).send({
                message: `2 errore il letturasanfras for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   associazione `)

            res.status(200).send({ 
                message:`situazione attuale per associazione id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun socio presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo socio   (post)

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo socio');  // visualizzo la struttura dei campi immessi dall'socio 
  
    
      // creo le variabili dai campi di input
      let id = req.body.id;
      let nomeassociazione = req.body.nomeassociazione;
      let annoTesseramento = req.body.annoTesseramento;
      let email = req.body.email;
      let indirizzo = req.body.indirizzo;
      let cellulare = req.body.cellulare;
      let codfisc = req.body.codfisc;
      let piva = req.body.piva;
      let iban = req.body.iban;
      let banca = req.body.banca;
      let ultimaTessera = req.body.ultimaTessera;
      let costoTessera = req.body.costoTessera;
      let key_utenti_operation = req.body.key_utenti_operation;
      
      let strsql =  `insert into sanfras
                  (id,nomeassociazione,annoTesseramento,email,indirizzo,cellulare,codfisc,piva,iban,banca,ultimaTessera,costoTessera,key_utenti_operation) 
                  valueS
                  (
                     ${id},UPPER('${nomeassociazione}'),${annoTesseramento},LOWER('${email}'),UPPER('${indirizzo}'),'${cellulare}',UPPER('${codfisc}'),'${piva}',UPPER('${iban}'),UPPER('${banca}'),${ultimaTessera},${costoTessera},${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova Associazione su tabellasanfras ');
              res.status(500).send({
                message: `errore in registrazione nuova associazione su tabellasanfras - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... associazione inserita regolarmente `);
          res.status(200).send({
            message: `associazione inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento socio   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica associazione id ${id}`);  // visualizzo la struttura dei campi immessi dall'socio 

    // definisco la strsql per lettura socio

    let strsql_Inqu = `select * from sanfras where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let nomeassociazione = req.body.nomeassociazione;
    let annoTesseramento = req.body.annoTesseramento;
    let email = req.body.email;
    let indirizzo = req.body.indirizzo;
    let cellulare = req.body.cellulare;
    let codfisc = req.body.codfisc;
    let piva = req.body.piva;
    let iban = req.body.iban;
    let banca = req.body.banca;
    let ultimaTessera = req.body.ultimaTessera;
    let costoTessera = req.body.costoTessera;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update sanfras set
                    nomeassociazione = UPPER('${nomeassociazione}'),
                    annoTesseramento = ${annoTesseramento},
                    email = '${email}',
                    indirizzo = UPPER('${indirizzo}'),
                    cellulare = '${cellulare}',
                    codfisc = UPPER('${codfisc}'),
                    piva = '${piva}',
                    iban = UPPER('${iban}'),
                    banca = UPPER('${banca}'),
                    ultimaTessera = ${ultimaTessera},
                    costoTessera = ${costoTessera},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura sanfras for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura sanfras for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento associazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto associazione ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornata associazionesocio id: ${id}`);
                    res.status(200).send({ 
                        message: `associazione aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente associazione id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna associazione presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento socio   // metodo 1  -- funziona

exports.updatesocioByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica socio id ${id}`);  // visualizzo la struttura dei campi immessi dall'socio 

  // definisco la strsql per lettura socio

    let strsql_Inqu = `select * from sanfras where id= ${id} `;
    
    // definisco 
   let socionew = {
            cognome: req.body.cognome,
            nome: req.body.nome,
            photo: req.body.photo,
            idStato: req.body.idStato,
            tipoacc: req.body.tipoacc,
            socioname: req.body.socioname,
            password: req.body.password,
            email: req.body.email,
            idRuolo: req.body.idRuolo,
            notesocio: req.body.notesocio,
            key_soci_operation: req.body.key_soci_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il letturasanfras for key $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il letturasanfras for key ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE sanfras SET ? WHERE id = ' + req.params.id, socionew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento socio id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto socio ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `socio aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente socio id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun socio pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione socio

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione associazione id ${id}`);  // visualizzo la struttura dei campi immessi dall'socio 

    // definisco la strsql per lettura socio

    let strsql_Inqu = `select * from sanfras where id= ${id} `;

    let strsql =  `delete from sanfras  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in letturasanfras for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione socio id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione associazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `associazione  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente associazione id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna associazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  



