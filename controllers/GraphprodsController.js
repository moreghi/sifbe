const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `graphprods`.* from `graphprods` ";

const order = " ";

// lettura glkobale
exports.getAll = (req,res)=> {
 
    let strsql = strSql  + order; 
    console.log('backend Graphprod-----   getAll --- appena entrata ------   strsql:' + strsql);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all graphprods - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le graphprods ' + result.length);  

            console.log(`rilevati ${result.length} graphprods `)
            res.status(200).send({ 
                message:'Situazione attuale graphprods',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna graphprod presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo graphprod
exports.getidGraph = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `graphprods`.`id` = ' + id;

    console.log('backend - getidGraph - strsql --> ' + strsql);
  
   // let strsql = `select * from graphprods where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura graphprods for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura graphprods for id ${id}- errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   graphprods `)

            res.status(200).send({ 
                message:`situazione attuale per graphprod id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessuna record presente per id: ${id} `);
            res.status(200).send({
                message: `nessuna user pressente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo graphprod   (post)    
exports.createNew = (req,res)=> {
      
      // creo le variabili dai campi di input
      console.log(`backend createNew .... inizio -------- id: ${JSON.stringify(req.body)} `);

      let id = req.body.id;
      let descrizione = req.body.descrizione;
      let ntot = req.body.ntot;
      let ndacuc = req.body.ndacuc;
      let ndacons = req.body.ndacons;
      let nevasi = req.body.nevasi;
    
      
      let strsql =  `insert into graphprods
                  (id,descrizione,ntot,ndacuc,ndacons,nevasi) 
                  valueS
                  (
                     ${id},'${descrizione}',${ntot}, ${ndacuc},${ndacons},${nevasi}
                  )`;
                  console.log(`backend createNew .... strsql -------- id: ${req.body.id}  ------ strsql --- strsql ------- ${strsql}`);
                 
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova graphprod su tabella graphprods ');
              res.status(500).JSON.send({
                message: `errore in registrazione nuova graphprod su tabella graphprods - errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
          }
          console.log(result, `result ............................................... graphprod inserita regolarmente `);
          res.status(200).send({
            message: `graphprod inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
   

  }
  
  // aggiornamento graphprod   
  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica graphprod id ${id}`);  // visualizzo la struttura dei campi immessi dall'graphprod 

    // definisco la strsql per lettura graphprod

    let strsql_Inqu = `select * from graphprods where id= ${id} `;

    // definisco le variabili per aggiornamento campi
 
    let descrizione = req.body.descrizione;
    let ntot = req.body.ntot;
    let ndacuc = req.body.ndacuc;
    let ndacons = req.body.ndacons;
    let nevasi = req.body.nevasi;
  
    let strsql =  `update graphprods set
                    descrizione = '${descrizione}',
                    ntot = ${ntot},
                    ndacuc = ${ndacuc},
                    ndacons = ${ndacons},
                    nevasi = ${nevasi},
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura graphprods for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura graphprods for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,` ----- errore in aggiornamento graphprod id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto graphprod ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato graphprod id: ${id}`);
                    res.status(200).send({ 
                        message: `graphprod aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente graphprod id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// cancellazione graphprod   
exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione graphprod id ${id}`);  // visualizzo la struttura dei campi immessi dall'graphprod 

    // definisco la strsql per lettura graphprod

    let strsql_Inqu = `select * from graphprods where id= ${id} `;

    let strsql =  `delete from graphprods  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura graphprods for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione graphprod id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione graphprod -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `graphprod  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente graphprod id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

// cancellazione Globale
exports.deleteAll = (req,res)=> {
    
    let strsql = '';

    console.log('backend -----------------------------  deleteAll ');
      
    strsql =  ' delete from `graphprods` ';  
    console.log(`strsql:  ${strsql} `);
  
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore cancellazione tutte graphprods - erro: ${err}`,
                data:null
            });
            return;
        }
       
        console.log('cancellato tutta la tabella graphprods '); 
        res.status(200).send({ 
                message: `cancellate tutte le graphprods  !! `,
                rc: 'ok',
                data:null
            });                    
        });

}

