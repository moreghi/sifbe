const strSql = 'select `comunicatodetts`.* ' +
               ' FROM `comunicatodetts` ';

const db = require('../db');

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from comunicatodetts';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all comunicatodetts - erro: ${err}`,
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
    
    const strsql = strSql + ' where `comunicatodetts`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from comunicatodetts where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura comunicatodetts for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura comunicatodetts for id ${id}- errore: ${err}`,
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
    
      console.log(req.body,'..........................................   Creazione nuovo evento');  // visualizzo la struttura dei campi immessi dall'evento 
  
      // creo le variabili dai campi di input
      const strsql1 ="SELECT * FROM `comunicatodetts` WHERE id < 99999 ORDER BY id DESC;";

      
      let desccomun = req.body.desccomun;
      let testo = req.body.testo;
      let folder = req.body.folder;
      let key_utenti_operation = req.body.key_utenti_operation;
    
      console.log('backend ------------ Comunicazionedett ---------------------- Creazione nuova Comunicazionedett ' + JSON.stringify(req.body));

      let strsql =  `insert into comunicatodetts
                  (desccomun,testo,folder,key_utenti_operation) 
                  valueS
                  (
                    UPPER('${desccomun}'),LOWER('${testo}'),LOWER('${folder}'),${key_utenti_operation} 
                  )`;
          
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova comunicazione su tabella comunicatodetts ');
              res.status(500).send({
                message: `errore in registrazione nuova comunicazione su tabella comunicatodetts - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... comunicazione inserita regolarmente `);
          db.query(strsql1,(err,result) => {
            if(err) {
              console.log(err,'errore in lettura ultima comunicazione emessa su tabella cominatos ');
              res.status(500).send({
                message: `errore in lettura ultima comunicazione emessa su tabella comunicatodetts - errore: ${err}`,
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

    console.log(req.body,`Modifica evento id ${id}`);  // visualizzo la struttura dei campi immessi dall'evento 

    // definisco la strsql per lettura evento

    let strsql_Inqu = `select * from comunicatodetts where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let desccomun = req.body.desccomun;
    let testo = req.body.testo;
    let folder = req.body.folder;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update comunicatodetts set
                    desccomun = UPPER('${desccomun}'),
                    testo = LOWER('${testo}'),
                    folder = LOWER('${folder}'),
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('--------------- comunicatodett --------------------------------- update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura comunicatodetts for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura comunicatodetts for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento comunicatodett id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto comunicatodett ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato comunicato id: ${id}`);
                    res.status(200).send({ 
                        message: `comunicatodett aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente comunicatodett id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun  comunicatodett presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`cancellazione comunicatodett id ${id}`);  // visualizzo la struttura dei campi immessi dall'evento 

    // definisco la strsql per lettura evento

    let strsql_Inqu = `select * from comunicatodetts where id= ${id} `;

    let strsql =  `delete from comunicatodetts  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura comunicatodetts for key ${id} - errore: ${err}`,
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
    
    const strsql = strSql + ' where `comunicatodetts`.`idComm` = ' + idComm;

    console.log('backend - getAllbyId - strsql --> ' + strsql);
  
   // let strsql = `select * from comunicatodetts where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura comunicatodetts for idComm ' + stato);

            res.status(500).send({
                message: `2 errore il lettura All comunicatodetts for idComm ${idComm}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  --------------------- Comunicatidett `)

            res.status(200).send({ 
                message:`situazione attuale comunicazioni  Dett per idComm .....  ${idComm}`,
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
    
    const strsql = strSql + " where `comunicatodetts`.`folder` = '" + folder + "'";

    console.log('backend - getbyfolder - strsql --> ' + strsql);
  
   // let strsql = `select * from comunicatodetts where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura comunicatodetts for folder ' + folder);

            res.status(500).send({
                message: `2 errore il lettura All comunicatodetts for folder ${folder}- errore: ${err}`,
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


exports.createFolder = (req,res)=> {
 
    let fs = require('fs');
    let dir = 'resources/static/assets/uploads/comunicazioni';    //name of the directory/folder

    let folder = req.params.folder;
    let folderd = req.params.folderd;
    let path = dir + "/" + folder + "/" + folderd;

if (!fs.existsSync(path)){    //check if folder already exists
    fs.mkdirSync(path);    //creating folder
    res.status(200).send({ 
        message:`cartella ${folder} inesistente -- creata correttamente`,
        rc: 'ok',
        path: path
    });                   
}  else {
    res.status(200).send({ 
        message:'cartella comunicazioni esistente -- creazione non possibile',
        rc: 'ok',
        path: path
    });                   
  }

}

exports.getcountbyidComm = (req,res)=> {
    
    let idComm = req.params.idComm;
    
    const strsql =  ' SELECT COUNT(id) AS numComm FROM `comunicatodetts`  where `comunicatodetts`.`idComm` = ' + idComm;

    console.log('backend - getcountbyidComm - strsql --> ' + strsql);
  
   // let strsql = `select * from comunicatos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura comunicatodetts for idComm ' + idComm);

            res.status(500).send({
                message: `2 errore il lettura All comunicatodetts for idComm ${idComm}- errore: ${err}`,
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

exports.movetofolder = (req,res)=> {
 
    const mime = require('mime-types');
 
    let fs = require('fs');
    let dir = 'resources/static/assets/uploads/comunicazioni';    //name of the directory/folder
    

    let foldercom = req.params.foldercom;
    let folderdett = req.params.folderdett;
    let filename = req.params.filename;

    let filetomove = dir + "/" + foldercom + "/" + folderdett + "/" + filename;
    let filefrommove = dir + "/" + filename; 

    const filePath = filename;  //'files\e6222886fdc2dc2b847284232e03ba74.jpg';
    const mimeType = mime.lookup(filePath);
    const ext = mimeType.substring(6);
    console.log('Estensione è: ' + mimeType + ' ext: ' + ext); 

if (fs.existsSync(filefrommove)){    //check if il file esiste in folder
        fs.rename(filefrommove, filetomove, function (err) {
        if (err) return console.error(err)
        console.log("success!")
        res.status(200).send({ 
            message:`file spostato correttamente`,
            rc: 'ok',
            from: filefrommove,
            to: filetomove,
            ext: ext
       })    //creating folder
    
    });                   
}  else {
    res.status(200).send({ 
        message:'file ' + filefrommove + ' inesistente -- move non possibile',
        rc: 'ko',
        from: filefrommove,
        to: filetomove
    });                   
  }

}



/*

    let folder = req.params.folder;
    let pathcomm = "resources/static/assets/uploads/comunicazioni/"
    let path = configm.hostbecomm + pathcomm + folder;
    
    

    res.status(200).send({ 
        message:'Situazione attuale ',
        rc: 'ok',
        path: path
    });                   
*/





