const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `commandaws`.*, `t_stato_commandas`.`d_stato_commanda`   from `commandaws` " + 
               " inner join `t_stato_commandas` ON `t_stato_commandas`.`id` = `commandaws`.`stato` ";
              

               // in attesa di capire come ordinare

// const order = " order by `commandaws`.`statoBevande`  asc, `commandaws`.`statoCucina` asc, `commandaws`.`statoContabile` asc  ";
const order = " ";

// ------  ok 
exports.getAll = (req,res)=> {
 
    let strsql = strSql  + order; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all commandew - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le commandew ' + result.length);  

            console.log(`rilevati ${result.length} commandew `)
            res.status(200).send({ 
                message:'Situazione attuale commandew',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna commandaw presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// lettura singolo commanda
// ------   ok  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `commandaws`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from commandaws where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura commandaws for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura commandaws for id ${id}- errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   commandew `)

            res.status(200).send({ 
                message:`situazione attuale per commanda id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessuna record presente per id: ${id} `);
            res.status(200).send({
                message: `nessuna commandaw presente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo commanda   (post)    
// ok 
exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo commanda');  // visualizzo la struttura dei campi immessi dall'commanda 
  
      // creo le variabili dai campi di input
     
      let id = req.body.id;
      let stato = req.body.stato;
      let idSanfra = req.body.idSanfra;
      let idprenotazione = req.body.idprenotazione;
      let idpersona = req.body.idpersona;
      let anagrafica_cliente = req.body.anagrafica_cliente;
      let buonoPasto = req.body.buonoPasto;
      let numTavolo = req.body.numTavolo;
      let numPersone = req.body.numPersone;
      let idGiornata = req.body.idGiornata;
      let importoCoperto = req.body.importoCoperto;
      let noteCommanda = req.body.noteCommanda;
     
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  */
  


      let strsql =  `insert into commandaws
                  (id,stato,idGiornata,idSanfra,idprenotazione,idpersona,anagrafica_cliente,buonoPasto,numTavolo,numPersone,importoCoperto,noteCommanda) 
                  valueS
                  (
                     ${id},${stato},${idGiornata},${idSanfra},${idprenotazione},${idpersona},'${anagrafica_cliente}',${buonoPasto},${numTavolo},${numPersone},${importoCoperto},'${noteCommanda}'
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova commandaw su tabella commandaws ');
              res.status(500).send({
                message: `errore in registrazione nuova commandaw su tabella commandaws - errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
          }
          console.log(result, `result ...... commandaw inserita regolarmente `);
          res.status(200).send({
            message: `commandaw inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento commanda   
  // ok
  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica commandaw id ${id}`);  // visualizzo la struttura dei campi immessi dall'commanda 

    // definisco la strsql per lettura commanda

    let strsql_Inqu = `select * from commandaws where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idprenotazione = req.body.idprenotazione;
    let idpersona = req.body.idpersona;
    let anagrafica_cliente = req.body.anagrafica_cliente;
    let numTavolo = req.body.numTavolo;
    let numPersone = req.body.numPersone;
    let stato = req.body.stato;
    let numProdotti = req.body.numProdotti;
    let importoProdotti = req.body.importoProdotti;
    let importoCoperto = req.body.importoCoperto;
    let importodaPagare = req.body.importodaPagare;
    let importoPagato = req.body.importoPagato;
    let resto = req.body.resto;
    let sbilancio = req.body.sbilancio;
    let stampaEseguita = req.body.stampaEseguita;
    let noteCommanda = req.body.noteCommanda;
    let buonoPasto = req.body.buonoPasto;
         
    let strsql =  `update commandaws set
                    idprenotazione = ${idprenotazione},
                    idpersona = ${idpersona},
                    anagrafica_cliente = '${anagrafica_cliente}',
                    numTavolo = ${numTavolo},
                    numPersone = ${numPersone},
                    stato = ${stato},
                    numProdotti = ${numProdotti},
                    importoProdotti = ${importoProdotti},
                    importoCoperto = ${importoCoperto},
                    importodaPagare = ${importodaPagare},
                    importoPagato = ${importoPagato},  
                    resto = ${resto},
                    sbilancio = ${sbilancio},
                    stampaEseguita = '${stampaEseguita}',
                    noteCommanda = '${noteCommanda}',
                    buonoPasto = ${buonoPasto}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura commandaws for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura commandaws for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,` ----- errore in aggiornamento commanda id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto commanda ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato commanda id: ${id}`);
                    res.status(200).send({ 
                        message: `commanda aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente commanda id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna user pressente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica commanda id ${id}`);  // visualizzo la struttura dei campi immessi dall'commanda 

  // definisco la strsql per lettura commanda

    let strsql_Inqu = `select * from commandaws where id= ${id} `;
    
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
            notecommanda: req.body.notecommanda,
            id_commandew_operation: req.body.id_commandew_operation,
          




       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura commandaws for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura commandaws for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE commandaws SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento commanda id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto commanda ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `commanda aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente commanda id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione commanda   
// ok
exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione commanda id ${id}`);  // visualizzo la struttura dei campi immessi dall'commanda 

    // definisco la strsql per lettura commanda

    let strsql_Inqu = `select * from commandaws where id= ${id} `;

    let strsql =  `delete from commandaws  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura commandaws for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione commandaw id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione commandaw -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `commandaw  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente commandaw id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna commandaw pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  




