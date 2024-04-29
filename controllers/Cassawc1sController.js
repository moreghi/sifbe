const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


const strSql = "select `cassawc1s`.* from `cassawc1s` "; 

/*
pool.getConnection(function(error, conn) {
    if(error) {
        conn.release();
        res.status(500).send({
             message: `errore in rilascio connessione - error: ${error}`,
             rc: 'kc',
             success: false
         });
         return;
     }
})
*/


exports.getAll = (req,res)=> {
     let strsql = strSql + order;

     db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3xss errore il lettura all cassawc1s - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le manifestazioni ' + result.length);  

            console.log(`rilevate ${result.length} manifestazioni `)
            res.status(200).send({ 
                message:'Situazione attuale Manifestazioni',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user pressente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }
    });

}

// lettura singola giornata
exports.getbyid = (req,res)=> {
  
    const id = req.params.id;
    
    let strsql = strSql + ' where `cassawc1s`.`idCommanda` = ' + id;

   
    console.log('backend - giornata getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore il lettura cassawc1s for id ' + id);

            res.status(500).send({
                message: `2vvcv errore il lettura cassawc1s for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   manifestazioni `)

            res.status(200).send({ 
                message:`situazione attuale per giornata id: .....  ${id}`,
                number:  result.length,
                rc: 'ok',
                data:result[0]
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


// creazione nuovo utente   (post)

exports.createNew = (req,res)=> {
          
    const strsql1 ="SELECT * FROM `cassawc1s` WHERE idCommanda < 99999 ORDER BY idCommanda DESC;";
  
     // creo le variabili dai campi di input
  
     let idCommanda = req.body.idCommanda;
     let i100 = req.body.i100;
     let i100Valore = req.body.i100Valore;
     let i050 = req.body.i050;
     let i050Valore = req.body.i050Valore;
     let i020 = req.body.i020;
     let i020Valore = req.body.i020Valore;
     let i010 = req.body.i010;
     let i010Valore = req.body.i010Valore;
     let i005 = req.body.i005;
     let i005Valore = req.body.i005Valore;
     let icontante = req.body.icontante;

     let r100 = req.body.r100;
     let r100Valore = req.body.r100Valore;
     let r050 = req.body.r050;
     let r050Valore = req.body.r050Valore;
     let r020 = req.body.r020;
     let r020Valore = req.body.r020Valore;
     let r010 = req.body.r010;
     let r010Valore = req.body.r010Valore;
     let r005 = req.body.r005;
     let r005Valore = req.body.r005Valore;
     let rcontante = req.body.rcontante;
    
     let key_utenti_operation = req.body.key_utenti_operation;

     let strsql =  `insert into cassawc1s
     (
       idCommanda, i100, i100Valore, i050, i050Valore, i020, i020Valore, i010, i010Valore, i005, i005Valore, icontante,
       r100, r100Valore, r050, r050Valore, r020, r020Valore, r010, r010Valore, r005, r005Valore, rcontante, key_utenti_operation
       ) 
     valueS
     (
       ${idCommanda}, ${i100}, ${i100Valore}, ${i050}, ${i050Valore}, ${i020}, ${i020Valore}, ${i010}, ${i010Valore}, ${i005}, ${i005Valore}, ${icontante}, 
       ${r100}, ${r100Valore}, ${r050}, ${r050Valore}, ${r020}, ${r020Valore}, ${r010}, ${r010Valore}, ${r005}, ${r005Valore}, ${rcontante},  
       ${key_utenti_operation}
     )`;  
     

      console.log('insert Cassawc1s -------------- - strsql: ' + strsql);
     
     // console.log('nuovo eventoPosto ------ strsql: ' + strsql);          
     db.query(strsql,(err,result) => {
        if(err) {
           console.log(err,'errore in registrazione nuova cassawc1 ');
           res.status(500).send({
             message: `errore in registrazione nuova cassawc1 - errore: ${err}`,
             data:null
          });
          return;
        }
        db.query(strsql1,(err,result) => {
          if(err) {
                       console.log(err,'errore in lettura ultima cassawc1 ');
                       res.status(500).send({
                       message: `errore in lettura ultima cassawc1 - errore: ${err}`,
                       rc: 'kk',
                       data:null
            });
            return;
          }
          res.status(200).send({
               message: `cassawc1 inserita regolarmente`,
               rc: 'ok',
               data:result[0],
               lastnumber:result[0].idCommanda 
          });
      });
  });
}
 

  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,` <----------  updatebyId ----------  Modifica giornata id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from cassawc1s where idCommanda= ${id} `;

    // definisco le variabili per aggiornamento campi


    let i100 = req.body.i100;
    let i100Valore = req.body.i100Valore;
    let i050 = req.body.i050;
    let i050Valore = req.body.i050Valore;
    let i020 = req.body.i020;
    let i020Valore = req.body.i020Valore;
    let i010 = req.body.i010;
    let i010Valore = req.body.i010Valore;
    let i005 = req.body.i005;
    let i005Valore = req.body.i005Valore;
    let icontante = req.body.icontante;

    let r100 = req.body.r100;
    let r100Valore = req.body.r100Valore;
    let r050 = req.body.r050;
    let r050Valore = req.body.r050Valore;
    let r020 = req.body.r020;
    let r020Valore = req.body.r020Valore;
    let r010 = req.body.r010;
    let r010Valore = req.body.r010Valore;
    let r005 = req.body.r005;
    let r005Valore = req.body.r005Valore;
    let rcontante = req.body.rcontante;
    let totaleResto = req.body.totaleResto;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update cassawc1s set
                      
                        i100 = ${i100},
                        i100Valore = ${i100Valore},
                        i050 = ${i050},
                        i050Valore = ${i050Valore},
                        i020 = ${i020},
                        i020Valore = ${i020Valore}, 
                        i010 = ${i010},
                        i010Valore = ${i010Valore}, 
                        i005 = ${i005},
                        i005Valore = ${i005Valore},
                        icontante = ${icontante},    
                        r100 = ${r100},
                        r100Valore = ${r100Valore},
                        r050 = ${r050},
                        r050Valore = ${r050Valore},
                        r020 = ${r020},
                        r020Valore = ${r020Valore},  
                        r010 = ${r010},
                        r010Valore = ${r010Valore}, 
                        r005 = ${r005},
                        r005Valore =${r005Valore},
                        rcontante = ${rcontante}, 
                        totaleResto = ${totaleResto}, 
                        key_utenti_operation = ${key_utenti_operation}
                        where idCommanda = ${id}`;



                    console.log('bk - --------------  giornata ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura cassawc1s for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura cassawc1s for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento giornata id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto giornata ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato giornata id: ${id}`);
                    res.status(200).send({ 
                        message: `giornata aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente giornata id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna giornata presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento utente   // metodo 1  -- funziona   (da sistemare)  usata solo come esempio
// da sistremare nei campi
exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica giornata id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from cassawc1s where id= ${id} `;
    
    // definisco 
   let manifw = {
            descManif: req.body.descManif,
            anno: req.body.anno,
            numUtentiTot : req.body.numUtentiTot ,
            incassatoTot: req.body.incassatoTot,
            stato: req.body.stato,
            photo: req.body.photo,
            notegiornata: req.body.notegiornata,
            key_utenti_operation: req.body.key_utenti_operation
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura users for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE cassawc1s SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento mamifestazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto giornata ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `giornata aggiornata regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente giornata id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna giornata pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione giornata

exports.delete = (req,res)=> {  

    console.log('backend ----  manif.delete ' + JSON.stringify(req.params))
    let id = req.params.id;

    console.log(`cancellazione giornata id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from cassawc1s where idCommanda= ${id} `;

    let strsql =  `delete from cassawc1s  where idCommanda = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura cassawc1s for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazkione giornata id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione giornata -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `giornata  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente giornata id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna manifetsazione presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

