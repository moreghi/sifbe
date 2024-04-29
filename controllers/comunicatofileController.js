const strSql = 'select `comunicatofiles`.* ' +
               ' FROM `comunicatofiles` ';

const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from comunicatofiles';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all comunicatofiles - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli eventi ' + result.length);  

            console.log(`rilevati ${result.length} eventi `)
            res.status(200).send({ 
                message:'Situazione attuale ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun evento presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo evento
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `comunicatofiles`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from comunicatofiles where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura comunicatofiles for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura comunicatofiles for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   evento `)

            res.status(200).send({ 
                message:`situazione attuale per evento id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun evento presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo evento   (post)

exports.createNew = (req,res)=> {
    
      console.log(req.body,'..........................................   Creazione nuovo file comunicato');  // visualizzo la struttura dei campi immessi dall'evento 
  
      // creo le variabili dai campi di input
      const strsql1 ="SELECT * FROM `comunicatofiles` WHERE id < 99999 ORDER BY id DESC;";

      let idComm = req.body.idComm;
      let folder = req.body.folder;
      let namefile = req.body.namefile;
      let estensione = req.body.estensione;
      let tipo = req.body.tipo; 
      let key_utenti_operation = req.body.key_utenti_operation;
    
      console.log('backend ------------ Comunicazionefile ---------------------- Creazione nuova Comunicazionefile ' + JSON.stringify(req.body));

      let strsql =  `insert into comunicatofiles
                  (idComm,folder,namefile,estensione,tipo,key_utenti_operation) 
                  valueS
                  (
                    ${idComm},LOWER('${folder}'),'${namefile}','${estensione}',UPPER('${tipo}'),${key_utenti_operation} 
                  )`;
          
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova comunicazione file su tabella comunicatofiles ');
              res.status(500).send({
                message: `errore in registrazione nuova comunicazione file su tabella comunicatofiles - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... comunicazione file inserita regolarmente `);
          db.query(strsql1,(err,result) => {
            if(err) {
              console.log(err,'errore in lettura ultima comunicazione file emessa su tabella comunicatofiles ');
              res.status(500).send({
                message: `errore in lettura ultima comunicazione file emessa su tabella comunicatofiles - errore: ${err}`,
                rc: 'kk',
                data:null
              });
              return;
            }
            res.status(200).send({
                message: `comunicazione inserita regolarmente`,
                rc: 'ok',
                data:result
            });
        });
    });
       
    
  }
  
  // aggiornamento evento   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica comunicaatofile id ${id}`);  // visualizzo la struttura dei campi immessi dall'evento 

    // definisco la strsql per lettura evento

    let strsql_Inqu = `select * from comunicatofiles where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idComm = req.body.idComm;
    let folder = req.body.folder;
    let namefile = req.body.namefile;
    let estensione = req.body.estensione;
    let tipo = req.body.tipo; 
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update comunicatofiles set
                    idComm = ${idComm},
                    namefile = '${namefile}',
                    tipo = UPPER('${tipo}'),
                    estensione = '${estensione}',
                    folder = LOWER('${folder}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('--------------- comunicatofile --------------------------------- update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura comunicatofiles for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura comunicatofiles for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento comunicatofile id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto comunicatofile ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato comunicato id: ${id}`);
                    res.status(200).send({ 
                        message: `comunicatofile aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente comunicatofile id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun  comunicatofile presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// cancellazione evento

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione comunicatofile id ${id}`);  // visualizzo la struttura dei campi immessi dall'evento 

    // definisco la strsql per lettura evento

    let strsql_Inqu = `select * from comunicatofiles where id= ${id} `;

    let strsql =  `delete from comunicatofiles  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura comunicatofiles for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione comunicato id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione comunicato -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `comunicato  id: ${id} cancellato regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente comunicato id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun comunicato presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getAllbyId = (req,res)=> {
    
    let idComm = req.params.idComm;
    
    const strsql = strSql + ' where `comunicatofiles`.`idComm` = ' + idComm;

    console.log('backend - getAllbyId - strsql --> ' + strsql);
  
   // let strsql = `select * from comunicatofiles where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura comunicatofiles for idComm ' + idComm);

            res.status(500).send({
                message: `2 errore il lettura All comunicatofiles for idComm ${idComm}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  --------------------- Comunicatifile `)

            res.status(200).send({ 
                message:`situazione attuale comunicazioni file per idComm .....  ${idComm}`,
                rc: 'ok',
                number:result.length,
                data:result
              });                    
        }else {
            console.log(`nessun record presente per idComm: ${idComm} `);
            res.status(200).send({
                message: `nessun evento presente for idComm: ${idComm}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getbyfolder = (req,res)=> {
    
    let folder = req.params.folder;
    
    const strsql = strSql + " where `comunicatofiles`.`folder` = '" + folder + "'";

    console.log('backend - getbyfolder - strsql --> ' + strsql);
  
   // let strsql = `select * from comunicatofiles where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura comunicatofiles for folder ' + folder);

            res.status(500).send({
                message: `2 errore il lettura All comunicatofiles for folder ${folder}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  -------------------Comunicazionidett `)

            res.status(200).send({ 
                message:`situazione attuale comunicazionidett per folder .....  ${folder}`,
                rc: 'ok',
                number:result.length,
                data:result
              });                    
        }else {
            console.log(`nessun record presente per foldert .....  ${folder} `);
            res.status(200).send({
                message: `nessun evento presente for folder .....  ${folder}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.getcountbyidComm = (req,res)=> {
    
    let idComm = req.params.idComm;
    
    const strsql =  ' SELECT COUNT(id) AS numComm FROM `comunicatofiles`  where `comunicatofiles`.`idComm` = ' + idComm;

    console.log('backend - getcountbyidComm - strsql --> ' + strsql);
  
   // let strsql = `select * from comunicatos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura comunicatofiles for idComm ' + idComm);

            res.status(500).send({
                message: `2 errore il lettura All comunicatofiles for idComm ${idComm}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  -------------------Comunicazioni `)

            res.status(200).send({ 
                message:`conteggio comunicazioni per idComm .....  ${idComm}`,
                rc: 'ok',
                number:result[0].numComm
              });                    
        }else {
            console.log(`nessun record presente per idComm .....  ${idComm} `);
            res.status(200).send({
                message: `nessun evento presente for idComm .....  ${idComm}`,
                rc: 'nf',
                number:0
            });
        }

    });  
}

