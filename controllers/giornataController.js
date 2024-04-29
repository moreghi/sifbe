const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const order =  ' order by giornatas.id desc';

const strSql = "select `giornatas`.*,`t_stato_cassas`.`d_stato_cassa` , `t_stato_utentis`.`d_stato_utenti`, `t_stato_magazzinos`.`d_stato_magazzino`, `t_stato_giornatas`.`d_stato_giornata`, `t_operation_cassas`.`d_operation_cassa` from `giornatas` " + 
               " inner join `t_operation_cassas` ON `t_operation_cassas`.`id` = `giornatas`.`operationCassa` " +
               " inner join `t_stato_giornatas` ON `t_stato_giornatas`.`id` = `giornatas`.`stato` " +
               " inner join `t_stato_magazzinos` ON `t_stato_magazzinos`.`id` = `giornatas`.`statoMagazzino` " +
               " inner join `t_stato_utentis` ON `t_stato_utentis`.`id` = `giornatas`.`statoUtenti` " +
               " inner join `t_stato_cassas` ON `t_stato_cassas`.`id` = `giornatas`.`statoCassa` "






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
                message: `3xss errore il lettura all giornatas - erro: ${err}`,
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
    
    let strsql = strSql + ' where `giornatas`.`id` = ' + id;

   
    console.log('backend - giornata getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore il lettura giornatas for id ' + id);

            res.status(500).send({
                message: `2vvcv errore il lettura giornatas for id ${id}- errore: ${err}`,
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

// lettura per stato  -- ok 
exports.getbystato = (req,res)=> {
    
    let stato = req.params.stato;
  
     where =  ' `giornatas`.`stato` = ' + stato;

     let strsql = strSql +  where + order;

     console.log('backend - getbystato - strsql --> ' + strsql); 
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'3 errore il lettura giornatas for stato' + stato);

            res.status(500).send({
                message: `3 errore il lettura giornatas for stato ${stato}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   manifestazioni `)

            res.status(200).send({ 
                message:`situazione attuale per giornata stato: .....  ${stato}`,
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log(`nessun record presente per stato: ${stato} `);
            res.status(200).send({
                message: `nessuna giornata presente per la selezione impostata`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo utente   (post)

exports.createNew = (req,res)=> {
      
     console.log('backend --- giornata--create ----  appena entrata')



    const strsql1 ="SELECT * FROM `giornatas` WHERE id < 99999 ORDER BY id DESC;";
  
     // creo le variabili dai campi di input
     let dtGiornata = req.body.dtGiornata;
     let dtGiornata1 = req.body.dtGiornata1;
     let idManifestazione = req.body.idManifestazione;
     let idlistino = req.body.idlistino;
     let stato = req.body.stato;
     let statoMagazzino = req.body.statoMagazzino;
     let statoCassa = req.body.statoCassa;
     let statoUtenti = req.body.statoUtenti;
     let tipocassa = req.body.tipocassa;  // S=Cassa sintetica  D=dettagliata
     let operationCassa = req.body.operationCassa;

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

     let a100 = req.body.a100;
     let a100Valore = req.body.a100Valore;
     let a050 = req.body.a050;
     let a050Valore = req.body.a050Valore;
     let a020 = req.body.a020;
     let a020Valore = req.body.a020Valore;
     let a010 = req.body.a010;
     let a010Valore = req.body.a010Valore;
     let a005 = req.body.a005;
     let a005Valore = req.body.a005Valore;
     let acontante = req.body.acontante;

     let f100 = req.body.f100;
     let f100Valore = req.body.f100Valore;
     let f050 = req.body.f050;
     let f050Valore = req.body.f050Valore;
     let f020 = req.body.f020;
     let f020Valore = req.body.f020Valore;
     let f010 = req.body.f010;
     let f010Valore = req.body.f010Valore;
     let f005 = req.body.f005;
     let f005Valore = req.body.f005Valore;
        
     let fcontante = req.body.fcontante;

     let cassaInizio = req.body.cassaInizio;
     let cassaAttuale = req.body.cassaAttuale;
     let cassaFinale = req.body.cassaFinale;
     let numTavoli = req.body.numTavoli;
     let numUtenti = req.body.numUtenti;
     let numCommande = req.body.numCommande;
     let impCommande = req.body.impCommande;
     let impCoperti = req.body.impCoperti; 
     let note = req.body.note;
     let key_utenti_operation = req.body.key_utenti_operation;

     let strsql =  `insert into giornatas
     (
       dtGiornata, dtGiornata1, idManifestazione, stato, statoMagazzino, statoCassa, statoUtenti, operationCassa, i100, i100Valore, i050, i050Valore, i020, i020Valore, i010, i010Valore, i005, i005Valore, icontante, a100, a100Valore,
       a050, a050Valore, a020, a020Valore, a010, a010Valore, a005, a005Valore, acontante, f100, f100Valore, f050, f050Valore, f020, f020Valore, f010, f010Valore, f005, f005Valore, fcontante,
       cassaInizio, cassaAttuale, cassaFinale, numTavoli, numUtenti, numCommande, impCommande, impCoperti, note, key_utenti_operation,idlistino,tipocassa
       ) 
     valueS
     (
       '${dtGiornata}', '${dtGiornata1}', ${idManifestazione}, ${stato},  ${statoMagazzino}, ${statoCassa}, ${statoUtenti}, '${operationCassa}', ${i100}, ${i100Valore}, ${i050}, ${i050Valore}, ${i020}, ${i020Valore}, ${i010},
       ${i010Valore}, ${i005}, ${i005Valore}, ${icontante}, ${a100}, ${a100Valore}, ${a050}, ${a050Valore}, ${a020}, ${a020Valore}, ${a010}, ${a010Valore}, ${a005}, ${a005Valore}, ${acontante},  
    ${f100}, ${f100Valore}, ${f050}, ${f050Valore}, ${f020}, ${f020Valore}, ${f010}, ${f010Valore}, ${f005}, ${f005Valore}, ${fcontante},  ${cassaInizio}, ${cassaAttuale}, ${cassaFinale},  
     ${numTavoli}, ${numUtenti}, ${numCommande}, ${impCommande}, ${impCoperti}, '${note}', ${key_utenti_operation}, ${idlistino}, UPPER('${tipocassa}')
     )`;  
     

      console.log('insert - strsql: ' + strsql);
     
     // console.log('nuovo eventoPosto ------ strsql: ' + strsql);          
     db.query(strsql,(err,result) => {
        if(err) {
           console.log(err,'errore in registrazione nuova giornata ');
           res.status(500).send({
             message: `errore in registrazione nuova giornata - errore: ${err}`,
             data:null
          });
          return;
        }
        db.query(strsql1,(err,result) => {
          if(err) {
                       console.log(err,'errore in lettura ultima giornata ');
                       res.status(500).send({
                       message: `errore in lettura ultima giortnata - errore: ${err}`,
                       rc: 'kk',
                       data:null
            });
            return;
          }
          res.status(200).send({
               message: `Giornata inserita regolarmente`,
               rc: 'ok',
               data:result[0],
               lastnumber:result[0].id 
          });
      });
  });
}
 

  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,` <----------  updatebyId ----------  Modifica giornata id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from giornatas where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let dtGiornata = req.body.dtGiornata;
    let idManifestazione = req.body.idManifestazione;
    let idlistino = req.body.idlistino;
    let stato = req.body.stato;
    let statoMagazzino = req.body.statoMagazzino;
    let statoCassa = req.body.statoCassa;
    let statoUtenti = req.body.statoUtenti;
    let tipocassa = req.body.tipocassa;  // S=Cassa sintetica  D=dettagliata
    let operationCassa = req.body.operationCassa;

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

    let a100 = req.body.a100;
    let a100Valore = req.body.a100Valore;
    let a050 = req.body.a050;
    let a050Valore = req.body.a050Valore;
    let a020 = req.body.a020;
    let a020Valore = req.body.a020Valore;
    let a010 = req.body.a010;
    let a010Valore = req.body.a010Valore;
    let a005 = req.body.a005;
    let a005Valore = req.body.a005Valore;
    let acontante = req.body.acontante;

    let f100 = req.body.f100;
    let f100Valore = req.body.f100Valore;
    let f050 = req.body.f050;
    let f050Valore = req.body.f050Valore;
    let f020 = req.body.f020;
    let f020Valore = req.body.f020Valore;
    let f010 = req.body.f010;
    let f010Valore = req.body.f010Valore;
    let f005 = req.body.f005;
    let f005Valore = req.body.f005Valore;
       
    let fcontante = req.body.fcontante;

    let cassaInizio = req.body.cassaInizio;
    let cassaAttuale = req.body.cassaAttuale;
    let cassaFinale = req.body.cassaFinale;
    let numTavoli = req.body.numTavoli;
    let numUtenti = req.body.numUtenti;
    let numCommande = req.body.numCommande;
    let impCommande = req.body.impCommande;
    let impCoperti = req.body.impCoperti; 
    let note = req.body.note;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update giornatas set
                        dtGiornata =  '${dtGiornata}',
                        idManifestazione = ${idManifestazione},
                        idlistino = ${idlistino},
                        tipocassa = UPPER('${tipocassa}'),
                        stato = ${stato},
                        statoMagazzino = ${statoMagazzino},
                        statoCassa = ${statoCassa}, 
                        statoUtenti = ${statoUtenti},
                        operationCassa = '${operationCassa}',
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
                        a100 = ${a100},
                        a100Valore = ${a100Valore},
                        a050 = ${a050},
                        a050Valore = ${a050Valore},
                        a020 = ${a020},
                        a020Valore = ${a020Valore},  
                        a010 = ${a010},
                        a010Valore = ${a010Valore}, 
                        a005 = ${a005},
                        a005Valore =${a005Valore},
                        acontante = ${acontante},  
                        f100 = ${f100},
                        f100Valore =${f100Valore},
                        f050 = ${f050},
                        f050Valore = ${f050Valore},
                        f020 =${f020},
                        f020Valore = ${f020Valore},  
                        f010 = ${f010},
                        f010Valore = ${f010Valore}, 
                        f005 = ${f005},
                        f005Valore = ${f005Valore},
                        fcontante =  ${fcontante},  
                        cassaInizio = ${cassaInizio},  
                        cassaAttuale = ${cassaAttuale},  
                        cassaFinale =  ${cassaFinale},  
                        numTavoli = ${numTavoli},   
                        numUtenti = ${numUtenti},  
                        numCommande = ${numCommande}, 
                        impCommande =${impCommande}, 
                        impCoperti = ${impCoperti},     
                        note = '${note}',   
                        key_utenti_operation = ${key_utenti_operation}
                        where id = ${id}`;



                    console.log('bk - --------------  giornata ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura giornatas for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura giornatas for id ${id} - errore: ${err}`,
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

    let strsql_Inqu = `select * from giornatas where id= ${id} `;
    
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
                  db.query('UPDATE giornatas SET ? WHERE id = ' + req.params.id, manifw,(err,result) => {    
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

    let strsql_Inqu = `select * from giornatas where id= ${id} `;

    let strsql =  `delete from giornatas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura giornatas for id ${id} - errore: ${err}`,
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


// lettura singola giornata
exports.getActive = (req,res)=> {
    
    const stato = req.params.stato;
    
   //' let strsql = strSql + ' where `giornatas`.`stato` = ' + stato;    buttare

      
   let strsql = 'SELECT COUNT(*) as numero FROM `giornatas`';

   strsql = strsql + ' where `giornatas`.`stato` = ' + stato;

    console.log('backend - getActive - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'3 errore il lettura giornatas attiva');

            res.status(500).send({
                message: `3 errore il lettura giornatas attiva --  errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ----------   manifestazioni attive  ${result[0].numero}`);

            res.status(200).send({ 
                message:`situazione attuale giornata attiva`,
                number:  result.length,
                rc: 'ok',
                data:result[0],
                numero:result[0].numero
            });                    
        }else {
            console.log(`nessuna giornata attiva presente `);
            res.status(200).send({
                message: `nessuna giornata attiva presente`,
                number:  result.length,
                rc: 'nf',
                data:result,
                numero: 0
            });
        }

    });  
}

//
//
//
//   console.log('backend - giornata -- strsql: ' + strsql);
// con utilizzo ConnectionPool
//
//
//


// ok
exports.getGiornateByManif = (req,res)=> {
 
    let id = req.params.id;
    
    let order = ' order by giornatas.dtGiornata1';
    let strsql = strSql + ' where `giornatas`.`idManifestazione` = ' + id + ' ' + order;

    console.log('backend - Giornates - getGiornateByManif ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all giornates per Manifestazione - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura giornate per Manifestazione  id ' + result.length);  

            console.log(`rilevate ${result.length} giornate `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale giornate',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna giornata presente per la manifestazione selezionata `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}


// ------------------------ 
// ok
exports.getGiornateManifbyStato = (req,res)=> {
 
    let id = req.params.id;
    let tipoRic = req.params.tipo;
    let stato = 0;

    stato = 0;
    switch (tipoRic) {
      case 'T':
          break;
     case 'A':
         stato = 2;
         break;
     case 'C':
         stato = 3;
         break;
     case 'E':
         stato = 4;
         break;
     case 'N':
          stato = 1;
          break;
     default:
         tipoRic = 'T';
         break;
     }

    let strsql = '';

     if(stato === 1) {
        strsql = strSql + ' where `giornatas`.`idManifestazione` = ' + id + ' and `giornatas`.`stato` < 2 ';  
     } else {
        strsql = strSql + ' where `giornatas`.`idManifestazione` = ' + id + ' and `giornatas`.`stato` = ' + stato;
     }
    

    console.log('backend - Giornates - getGiornateByManifIdbyStato ' + strsql + ' tiporic: ' + tipoRic);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all giornates per Manifestazione - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura giornata per Manifestazione  id  e stato' + result.length);  

            console.log(`rilevate ${result.length} giornate `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale giornate per lo stato selezionato',
                number:  result.length,
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

// ok
exports.getGiornataactive = (req,res)=> {
 
 
    let stato = 2;    // gioto attivo 
    let oggix = new Date();
    let dd = oggix.getDate().toString();
    if(dd.length === 1) {
       dd = '0' + dd;
    }
    let mm = oggix.getMonth() + 1;
    mm = mm.toString();
    if(mm.length === 1) {
        mm = '0' + mm;
    }

    console.log('giornataAttiva: gg ' + dd + ' mm: ' + mm); 

    let yyyy = oggix.getFullYear();
    let oggiStart = yyyy + "-" + mm + "-" + dd + ' 00:00:00';
    let oggiEnd = yyyy + "-" + mm + "-" + dd + ' 23:59:59';

    let strsql = strSql + " where `giornatas`.`stato` = " + stato + " and `giornatas`.`dtGiornata` between '" + oggiStart + "' and '" + oggiEnd + "' ";

    console.log('backend - Giornates ------------------------->>>>>> getGiornataActive ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all giornates attive - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura giornata attiva  id  e stato' + result.length);  

            console.log(`rilevate ${result.length} giornate `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale giornata attiva',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna giornata attiva `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}

// ok
exports.getLastGiornataByManifId = (req,res)=> {

    let id = req.params.id;

    let strsql = strSql + " where `giornatas`.`idManifestazione` = " + id +  " order by `giornatas`.`id` DESC ";

    console.log('backend - Giornates - getLastGiornataByManif ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura ultima giornata della Manifestazione - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura ultima giornata  della Manifestazione' + result.length);  

            console.log(`rilevate ${result.length} giornate `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale ultima giornata della Manifestazione',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna giornata per la manifestazione `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}

// ok
exports.getGiornateByManifId = (req,res)=> {

    let id = req.params.id;

    let strsql = strSql + " where `giornatas`.`idManifestazione` = " + id +  " order by `giornatas`.`id` DESC ";

    console.log('backend - Giornates - getLastGiornataByManif ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura ultima giornata della Manifestazione - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura giornate  della Manifestazione' + result.length);  

            console.log(`rilevate ${result.length} giornate `)
            res.status(200).send({ 
                rc: 'ok',
                message:'numero giornate della Manifestazione',
                number:  result.length,
                data:result.length
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna giornata per la manifestazione `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}  

// ok
exports.getforChart = (req,res)=> {  // da finire
 
    let arr_utenti = [];
    let arr_commande = [];
    let arr_netto = [];
    let arr_impCommande = [];
    let arr_impCoperto = [];
    let arr_day = [];
   
    let id = req.params.id;

    console.log('backend - getforChart params: ' + JSON.stringify(req.params))

    let strsql = "select `giornatas`.*, DATE_FORMAT(dtGiornata,'%d/%m/%Y') AS niceDate from `giornatas` " +
                 " where `giornatas`.`idManifestazione` = " + id +  " order by `giornatas`.`dtGiornata` asc ";
  
    console.log('backend  ------------------------ getforChart -- strsql: ' + strsql)
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all prodotti - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte i prodotti ' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)

            for (var i= 0; i < result.length; i++){
                arr_utenti.push(result[i].numUtenti);
                arr_commande.push(result[i].numCommande);
                arr_netto.push(result[i].cassaFinale - result[i].cassaInizio);
                arr_impCommande.push(result[i].impCommande);
                arr_impCoperto.push(result[i].impCoperti);
                arr_day.push(result[i].niceDate);
             }
             console.log('finito estrazione in array: ' + JSON.stringify(arr_commande));
             res.status(200).send({ 
                message:'Situazione attuale Giornate',
                number:  result.length,
                utenti: arr_utenti,
                commande: arr_commande,
                netto: arr_netto,
                impCommande: arr_impCommande,
                impCoperto: arr_impCoperto,
                day: arr_day,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun prodotto presente `,
                rc: 'nf',
                data:null
            });                    
        }
    });

}

// verifico se presenti giornate con stati 0 - 1 - 2
exports.getGiornateByStato = (req,res)=> {
 
    let stato = req.params.stato;
    let stato1 = 2;   // faccio lettura di giornate in prenotazione (1) e attive (2)
    let order = '';   

    where =  ' where `giornatas`.`stato` = ' + stato + ' or `giornatas`.`stato` = ' + stato1;
    order =  ' order by   `giornatas`.`dtGiornata1`';



    let strsql = '';
    strsql = strSql + where + order;
    console.log('backend - Giornates - getGiornateByManifIdbyStato ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all giornates per Manifestazione - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura giornate per stato ' + stato + ' -- ' + result.length);  

            console.log(`rilevate ${result.length} giornate `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale giornate per lo stato selezionato',
                number:  result.length,
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


exports.getbyggmmaaaa = (req,res)=> {
  
    const ggmmaaaa = req.params.ggmmaaaa;
    
    let strsql = strSql + " where `giornatas`.`dtGiornata1` = '" + ggmmaaaa + "' ";

   
    console.log('backend - giornata getbyggmmaaaa - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2fgtyh errore il lettura giornatas for ggmmaaaa ' + ggmmaaaa);

            res.status(500).send({
                message: `2vvcv errore il lettura giornatas for id ${ggmmaaaa}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   manifestazioni `)

            res.status(200).send({ 
                message:`situazione attuale per giornata ggmmaaaa .....  ${ggmmaaaa}`,
                number:  result.length,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per ggmmaaaa: ${ggmmaaaa} `);
            res.status(200).send({
                message: `nessun user pressente for ggmmaaaa: ${ggmmaaaa}`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}
