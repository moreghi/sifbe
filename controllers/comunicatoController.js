const strSql = 'select `comunicatos`.* , `t_stato_comunicatos`.`d_stato_comunicato` ' +  
                ' FROM `comunicatos` ' + 
                ' inner join `t_stato_comunicatos` ON `t_stato_comunicatos`.`id` = `comunicatos`.`stato` ';



const db = require('../db');

// moreno per gestire nome del url di frontend per invio email
const configm = require("../configmoreno.json");

// ------   ok   
exports.getAll = (req,res)=> {
 
    let strsql = strSql; // 'select * from comunicatos';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all comunicatos - erro: ${err}`,
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
    
    const strsql = strSql + ' where `comunicatos`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from comunicatos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura comunicatos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura comunicatos for id ${id}- errore: ${err}`,
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
      const strsql1 ="SELECT * FROM `comunicatos` WHERE id < 99999 ORDER BY id DESC;";

      
      let titolo = req.body.titolo;
      let anno = req.body.anno;
      let stato = req.body.stato;
      let dataComunic = req.body.dataComunic;
      let folder = req.body.folder;
      let key_utenti_operation = req.body.key_utenti_operation;
    

      console.log('backend ------------ Comunicazione ---------------------- Creazione nuova Comunicazione ' + JSON.stringify(req.body));


      let strsql =  `insert into comunicatos
                  (titolo,anno,stato,dataComunic,folder,key_utenti_operation) 
                  valueS
                  (
                    UPPER('${titolo}'),${anno},${stato},'${dataComunic}','${folder}',${key_utenti_operation} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova comunicazione su tabella comunicatos ');
              res.status(500).send({
                message: `errore in registrazione nuova comunicazione su tabella comunicatos - errore: ${err}`,
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
                message: `errore in lettura ultima comunicazione emessa su tabella comunicatos - errore: ${err}`,
                rc: 'kk',
                data:null
              });
              return;
            }
            console.log('riletto ultima comunicazione inserita: ' + JSON.stringify(result[0]));
            res.status(200).send({
                message: `comunicazione inserita regolarmente`,
                rc: 'ok',
                data:result[0]
            });
        });
    });
       
    
  }
  
  // aggiornamento evento   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica evento id ${id}`);  // visualizzo la struttura dei campi immessi dall'evento 

    // definisco la strsql per lettura evento

    let strsql_Inqu = `select * from comunicatos where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let titolo = req.body.titolo;
    let anno = req.body.anno;
    let stato = req.body.stato;
    let dataComunic = req.body.dataComunic;
    let folder = req.body.folder;
    let ndett = req.body.ndett;
    let key_utenti_operation = req.body.key_utenti_operation;
    
    let strsql =  `update comunicatos set
    titolo = UPPER('${titolo}'),
                    anno = ${anno},
                    stato = ${stato},
                    dataComunic = '${dataComunic}',
                    folder = '${folder}',
                    ndett = ${ndett},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('--------------- comunicato --------------------------------- update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura comunicatos for key ' + id);
            res.status(500).send({
                message: `4 errore il lettura comunicatos for key ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento comunicato id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto comunicato ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato comunicato id: ${id}`);
                    res.status(200).send({ 
                        message: `comunicato aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente comunicato id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun  comunicato presente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`cancellazione comunicato id ${id}`);  // visualizzo la struttura dei campi immessi dall'evento 

    // definisco la strsql per lettura evento

    let strsql_Inqu = `select * from comunicatos where id= ${id} `;

    let strsql =  `delete from comunicatos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura comunicatos for key ${id} - errore: ${err}`,
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


exports.getbyStato = (req,res)=> {
    
    let stato = req.params.stato;
    
    const strsql = strSql + ' where `comunicatos`.`stato` = ' + stato;

    console.log('backend - getbyStato - strsql --> ' + strsql);
  
   // let strsql = `select * from comunicatos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura comunicatos for stato ' + stato);

            res.status(500).send({
                message: `2 errore il lettura All comunicatos for stato ${stato}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  --------------------- Comunicati `)

            res.status(200).send({ 
                message:`situazione attuale comunicazioni per stato .....  ${stato}`,
                rc: 'ok',
                number:result.length,
                data:result
              });                    
        }else {
            console.log(`nessun record presente per stato: ${stato} `);
            res.status(200).send({
                message: `nessun evento presente for stato: ${stato}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


exports.getbydatain = (req,res)=> {
    
    let datain = req.params.datain;
    
    const strsql = strSql + ' where `comunicatos`.`dataStart` >= ' + datain;

    console.log('backend - getbydatain - strsql --> ' + strsql);
  
   // let strsql = `select * from comunicatos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura comunicatos for dataStart ' + datain);

            res.status(500).send({
                message: `2 errore il lettura All comunicatos for datastart ${datain}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  -------------------Comunicazioni `)

            res.status(200).send({ 
                message:`situazione attuale comunicazioni per dataStart .....  ${datain}`,
                rc: 'ok',
                number:result.length,
                data:result
              });                    
        }else {
            console.log(`nessun record presente per dataStart .....  ${datain} `);
            res.status(200).send({
                message: `nessun evento presente for sdataStart .....  ${datain}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// ------   ok   
exports.createFolder = (req,res)=> {
 
    let fs = require('fs');
    let dir = 'resources/static/assets/uploads/comunicazioni';    //name of the directory/folder

    let folder = "d" + req.params.folder;
    let path = dir + "/" + folder

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


}


exports.getcountbyAnno = (req,res)=> {
    
    let anno = req.params.anno;
    
    const strsql =  ' SELECT COUNT(id) AS numComm FROM `comunicatos`  where `comunicatos`.`anno` = ' + anno;

    console.log('backend - getcountbyAnno - strsql --> ' + strsql);
  
   // let strsql = `select * from comunicatos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura comunicatos for anno ' + anno);

            res.status(500).send({
                message: `2 errore il lettura All comunicatos for anno ${anno}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  -------------------Comunicazioni `)

            res.status(200).send({ 
                message:`conteggio comunicazioni per anno .....  ${anno}`,
                rc: 'ok',
                number:result[0].numComm
              });                    
        }else {
            console.log(`nessun record presente per anno .....  ${anno} `);
            res.status(200).send({
                message: `nessun evento presente for anno .....  ${anno}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


