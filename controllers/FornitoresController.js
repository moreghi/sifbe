const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


const strSql = "select `fornitores`.*, `t_stato_fornitores`.`d_stato_fornitore`, `t_settores`.`d_settore` from `fornitores` " + 
                " inner join `t_stato_fornitores` ON `t_stato_fornitores`.`id` = `fornitores`.`stato` " +
                " inner join `t_settores` ON `t_settores`.`id` = `fornitores`.`settore` ";

const where = ' where `fornitores`.`id` > 0';
// ------  ok 
exports.getAll = (req,res)=> {
 
    let order = '';
    
    let strsql = strSql + where  + order; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all fornitori - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i fornitori ' + result.length);  

            console.log(`rilevati ${result.length} fornitori `)
            res.status(200).send({ 
                message:'Situazione attuale fornitori',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun fornitore presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo fornitore
// ------   ok  nuovo modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `fornitores`.`id` = ' + id;

    console.log('backend - fornitoreController ----------------------------------> getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from fornitores where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura fornitores for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura fornitores for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   fornitori `)

            res.status(200).send({ 
                message:`situazione attuale per fornitore id: .....  ${id}`,
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

// creazione nuovo fornitore   (post)    
// ok 
exports.createNew = (req,res)=> {
    
      console.log(req.body,'Creazione nuovo fornitore');  // visualizzo la struttura dei campi immessi dall'fornitore 
  
      // creo le variabili dai campi di input

      let ragsociale = req.body.ragsociale;
      let indirizzo = req.body.indirizzo;
      let cap = req.body.cap;
      let localita = req.body.localita;
      let stato = req.body.stato;
      let settore = req.body.settore;
      let telefono = req.body.telefono;
      let email = req.body.email;
      let notefornitore = req.body.notefornitore;
      let key_utenti_operation = req.body.key_utenti_operation;
 
   
      let strsql =  `insert into fornitores
                  (ragsociale,indirizzo,cap,localita,stato,settore,notefornitore,telefono,email,key_utenti_operation) 
                  valueS
                  (
                     '${ragsociale}','${indirizzo}','${cap}','${localita}',${stato},${settore},'${notefornitore}','${telefono}','${email}',${key_utenti_operation} 
                  )`;
      
       console.log('createNew -  strsql: ' + strsql);
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo fornitore su tabella fornitores ');
              res.status(500).send({
                message: `errore in registrazione nuovo fornitore su tabella fornitores - errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
          }
          console.log(result, `result ...... fornitore inserito regolarmente `);
          res.status(200).send({
            message: `fornitore inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento fornitore   
  // ok
  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica fornitore id ${id}`);  // visualizzo la struttura dei campi immessi dall'fornitore 

    // definisco la strsql per lettura fornitore

    let strsql_Inqu = `select * from fornitores where id= ${id} `;

    // definisco le variabili per aggiornamento campi


      let ragsociale = req.body.ragsociale;
      let indirizzo = req.body.indirizzo;
      let cap = req.body.cap;
      let localita = req.body.localita;
      let stato = req.body.stato;
      let settore = req.body.settore;
      let notefornitore = req.body.notefornitore;
      let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update fornitores set
                    ragsociale = '${ragsociale}',
                    indirizzo = '${indirizzo}',
                    cap = '${cap}',
                    localita = '${localita}',
                    stato = ${stato},
                    settore = ${settore},
                    notefornitore = '${notefornitore}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura fornitores for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura fornitores for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,` ----- errore in aggiornamento fornitore id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto fornitore ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(`----- aggiornato fornitore id: ${id}`);
                    res.status(200).send({ 
                        message: `fornitore aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente fornitore id: ${id} -- aggiornamento non possibile`);
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

    console.log(req.body,`Modifica fornitore id ${id}`);  // visualizzo la struttura dei campi immessi dall'fornitore 

  // definisco la strsql per lettura fornitore

    let strsql_Inqu = `select * from fornitores where id= ${id} `;
    
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
            notefornitore: req.body.notefornitore,
            id_fornitori_operation: req.body.id_fornitori_operation,
  
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura fornitores for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura fornitores for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE fornitores SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento fornitore id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto fornitore ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `fornitore aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente fornitore id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione fornitore   
// ok
exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione fornitore id ${id}`);  // visualizzo la struttura dei campi immessi dall'fornitore 

    // definisco la strsql per lettura fornitore

    let strsql_Inqu = `select * from fornitores where id= ${id} `;

    let strsql =  `delete from fornitores  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura fornitores for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione fornitore id: ${id}`);
                        res.status(500).send({ 
                            message: `${err} `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `fornitore  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente fornitore id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  



exports.getfornitoreLastId = (req,res)=> {

    const strSql = "select `fornitores`.*, `t_stato_fornitores`.`d_stato_fornitore`, `t_settores`.`d_settore` from `fornitores` " + 
                    " inner join `t_stato_fornitores` ON `t_stato_fornitores`.`id` = `fornitores`.`stato` " +
                    " inner join `t_settores` ON `t_settores`.`id` = `fornitores`.`settore` ";


    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getFornitoreLastId ');
    

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `fornitores`.`id` < ' + tappo + ' order by `fornitores`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT fornitores.*, t_ruolos.d_ruolo FROM fornitores INNER JOIN t_ruolos ON t_ruolos.id = fornitores.idRuolo WHERE fornitores.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all fornitores - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('abc - lettura ultimo id' + result.length);  

            console.log(`rilevati ${result.length} fornitori `)
            res.status(200).send({ 
                message:'Situazione attuale ultimo id',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna fornitore presente con lo stato richiesto  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}



exports.getfornitorebySettore = (req,res)=> {
    
    let settore = req.params.settore;
      
    const strsql = strSql + ' where `fornitores`.`settore` = ' + settore;

    console.log('backend - fornitoreController ----------------------------------> getbysettore - strsql --> ' + strsql);
  
   // let strsql = `select * from fornitores where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura fornitores for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura fornitores for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   fornitori `)

            res.status(200).send({ 
                message:`situazione attuale per fornitore settore: .....  ${settore}`,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per settore: ${settore} `);
            res.status(200).send({
                message: `nessun user pressente for settore: ${settore}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


