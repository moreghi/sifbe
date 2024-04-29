const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);



const saltRounds = 10;
const crypto = require("crypto");
const hash = bcrypt.hashSync("generic", salt);
const nodemailer = require('nodemailer');
const sendEmail = require('./../helpers/send-email');




const strSql = "select `prenotazione_confirmeds`.*  from  `prenotazione_confirmeds` " 

// ------   ok  nuova modalità di craere strsql   ok 
exports.getAll = (req,res)=> {
 
    let strsql = strSql; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all conferme prenotazioni - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le conferme prenotazioni ' + result.length);  

            console.log(`rilevate ${result.length} conferme prenotazioni `)
            res.status(200).send({ 
                message:'Situazione attuale conferme prenotazioni',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}
 // ---------------------------------------------- ok
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where `prenotazione_confirmeds`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * fromsanfras where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura prenotazione_confirmeds for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura prenotazione_confirmeds for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevata ${result.length}  ------------------------   associazione `)

            res.status(200).send({ 
                message:`situazione attuale per prenotazione_confirmeds id: .....  ${id}`,
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


// lettura singolo conferma prenotazione
// ------   ok  nuova modalità di craere strsql  
exports.getbyemail = (req,res)=> {
    
    let email = req.params.email;
      
    const strsql = strSql + " where `prenotazione_confirmeds`.`email` = '" + email + "' ";

    console.log('backend - getbyemail - strsql --> ' + strsql);
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura conferma prenotazione for email ' + email);

            res.status(500).send({
                message: `2 errore il lettura conferma prenotazione for email ${email}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   conferme prenotazioni `)

            res.status(200).send({ 
                message:`situazione attuale per conferma prenotazione email: .....  ${email}`,
                rc: 'ok',
                number: result.length,
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per email: ${email} `);
            res.status(200).send({
                message: `nessun user pressente for email: ${email}`,
                rc: 'nf',
                number: 0,
                data:null
            });
        }

    });  
}

// creazione nuovo conferma prenotazione   (post)    // ok  ok

exports.createNew = (req,res)=> {
    
      // creo le variabili dai campi di input
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let telefono = req.body.telefono;
      let datapren = req.body.datapren;
      let persone = req.body.persone;
      let email = req.body.email;
      let token = req.body.token;
      let idgiornata = req.body.idgiornata; 

      let strsql =  `insert into prenotazione_confirmeds
                  (cognome,nome,telefono,datapren,persone,email,token,idgiornata) 
                  valueS
                  (
                     '${cognome}','${nome}','${telefono}','${datapren}',${persone},'${email}','${token}',${idgiornata} 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova conferma prenotazione su tabella prenotazione_confirmeds ');
              res.status(500).send({
                message: `errore in registrazione nuova conferma prenotazione su tabella prenotazione_confirmeds - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... conferma prenotazione inserita regolarmente `);
          res.status(200).send({
            message: `conferma prenotazione inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento conferma prenotazione   // metodo 2  -- funziona  // ok

  exports.updateByemail = (req,res)=> {  

    let email = req.params.emailid;

    console.log(req.body,`Modifica conferma prenotazione email ${email}`);  // visualizzo la struttura dei campi immessi dall'conferma prenotazione 

    // definisco la strsql per lettura conferma prenotazione

    let strsql_Inqu = "select * from prenotazione_confirmeds where email= '" + email + "' ";

    // definisco le variabili per aggiornamento campi

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let telefono = req.body.telefono;
    let datapren = req.body.datapren;
    let persone = req.body.persone;
    let token = req.body.token;
    let idgiornata = req.body.idgiornata;
       
    let strsql =  `update prenotazione_confirmeds set
                    cognome = UPPER('${cognome}'),
                    nome = UPPER('${nome}'),
                    telefono = '${telefono}',
                    datapren = '${datapren}',
                    persone = ${persone},
                    token = '${token}',
                    email = LOWER('${email}'),
                    idgiornata = ${idgiornata}
                        where email = '${codpren}'`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prenotazione_confirmeds for email ' + email);
            res.status(500).send({
                message: `4 errore il lettura prenotazione_confirmeds for email ${email} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento conferma prenotazione email: ${email}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto conferma prenotazione ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato conferma prenotazione email: ${email}`);
                    res.status(200).send({ 
                        message: `conferma prenotazione aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente conferma prenotazione email: ${email} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna conferma prenotazione presente for email: ${email}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

exports.updateByid = (req,res)=> {  

    let id = req.params.id;

      // definisco la strsql per lettura socio

    let strsql_Inqu = `select * from prenotazione_confirmeds where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let telefono = req.body.telefono;
    let datapren = req.body.datapren;
    let persone = req.body.persone;
    let token = req.body.token;
    let email = req.body.email;
    let idgiornata = req.body.idgiornata;
       
    let strsql =  `update prenotazione_confirmeds set
                    cognome = UPPER('${cognome}'),
                    nome = UPPER('${nome}'),
                    telefono = '${telefono}',
                    datapren = '${datapren}',
                    persone = ${persone},
                    token = '${token}',
                    email = LOWER('${email}'),
                    idgiornata = ${idgiornata}
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


// cancellazione conferma prenotazione   // ok

exports.delete = (req,res)=> {  

    let email = req.params.email;

    console.log(req.body,`cancellazione conferma prenotazione email ${email}`);  // visualizzo la struttura dei campi immessi dall'conferma prenotazione 

    // definisco la strsql per lettura conferma prenotazione

    let strsql_Inqu = "select * from prenotazione_confirmeds where email= '" + email + "' ";

    let strsql =  `delete from prenotazione_confirmeds  where email = ${email}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazione_confirmeds for email ${email} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione conferma prenotazione email: ${email}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione conferma prenotazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `conferma prenotazione  email: ${email} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente conferma prenotazione email: ${email} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for email: ${email}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getbytoken = (req,res)=> {
    
    let token = req.params.token;
      
    const strsql = strSql + " where `prenotazione_confirmeds`.`token` = '" + token + "' ";

    console.log('backend - getbytoken - strsql --> ' + strsql);
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura conferma prenotazione for token ' + token);

            res.status(500).send({
                message: `2 errore il lettura conferma prenotazione for token ${token}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------- token -----------------   conferme prenotazioni `)

            res.status(200).send({ 
                message:`situazione attuale per conferma prenotazione token: .....  ${token}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per token: ${token} `);
            res.status(200).send({
                message: `nessuna conferma prenotazione presente for token: ${token}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}


exports.destroyToken = (req,res)=> {  

    let token = req.params.token;

    console.log(req.body,`cancellazione conferma prenotazione token ${token}`);  // visualizzo la struttura dei campi immessi dall'conferma prenotazione 

    // definisco la strsql per lettura conferma prenotazione

    let strsql_Inqu = "select * from prenotazione_confirmeds where token= '" + token + "' ";

    let strsql =  `delete from prenotazione_confirmeds  where token = '${token}'`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazione_confirmeds for token ${token} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione conferma prenotazione token: ${token}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione conferma prenotazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `conferma prenotazione  token: ${token} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente conferma prenotazione token: ${token} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for token: ${token}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.confirmedprenotazione  = (req,res)=> {

    console.log(`backend --  su prenotazioneConfirmedController--- prenotazioneController.confirmedprenotazione - appena entrato`);

    console.log('parametri Passati : ' + JSON.stringify(req.body));   
   

    const codprenx =  randomcodprenString();
    const token = randomTokenString();

    console.log(
      `   lunghezza di token criptato                 ${token.length} bytes of random data: ${token.toString('base64')}`);

    

    try{
        // Building Customer object from upoading request's body

        /* prima versione

        let confirmPrenot = {};
        confirmPrenot.cognome = req.body.cognome
        confirmPrenot.nome = req.body.nome
        confirmPrenot.email = req.body.email
        confirmPrenot.telefono = req.body.telefono
        confirmPrenot.datapren = req.body.datapren
        confirmPrenot.persone = req.body.persone
        confirmPrenot.codpren = codpren
        confirmPrenot.token = token

        console.log('confirmPrenot  -----  pronto per inserimento  : ' + JSON.stringify(confirmPrenot));   


       

             // Save to MySQL database
        PrenConfirm.create(confirmPrenot).then(result => {    
            // send uploading message to client
            console.log('creato record per conferma registrazione');
          //  send_gmmailfor_register(req.body.email,req.body.cognome,req.body.nome,tokenn);
            res.status(200).json({
                message: "richiesta di conferma Prenotazione per cliente " + confirmPrenot.cognome + " completata con successo",
                PrenConfirm: [result],
                error: ""
            });
        });

      */

// seconda versione

      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let email = req.body.email;
      let telefono = req.body.telefono;
      let idgiornata = req.body.idgiornata;
      let datapren = req.body.datapren.toString("yyyy-MM-dd HH:mm:ss");

      let dataprennew =  datapren.substring(0, 10);
      // per editare nella mail
      let gg = dataprennew.substr(8,2);
     
      let mm =  dataprennew.substr(5,2);
      let yyyy =  dataprennew.substr(0,4); 

      console.log('data normalizzata: dataprennew ' + dataprennew );
      console.log('data normalizzata: gg ' + gg );
      console.log('data normalizzata: mm ' + mm );
      console.log('data normalizzata: yyyy ' + yyyy );
      

      let data1 = gg + '/' + mm + '/' + yyyy; 
     // let data1 = req.body.datapren.toString("dd/MM/yyyy");

console.log('-----------------------------  data trattata: ' + dataprennew + '  data originaria: ' + datapren + ' data1: ' + data1);
      let persone = req.body.persone;
      let codpreny = codprenx.substring(0, 5);
      let codpren = codpreny;
    

      let strsql =  `insert into prenotazione_confirmeds
                (cognome,nome,email,telefono,datapren,persone,codpren,token,idgiornata) 
                valueS
                (
                  '${cognome}','${nome}','${email}','${telefono}','${dataprennew}',${persone},'${codpren}','${token}',${idgiornata} 
                )`;

        console.log('--- strsql pronta per fare insert:  ' + strsql );        

      db.query(strsql,(err,result) => {
          if(err) { 
            console.log(err,'errore in registrazione conferma Prenotazione su tabella prenotazione_confirmeds ');
            res.status(500).send({
            message: `errore in registrazione conferma Prenotazione su tabella prenotazione_confirmeds - errore: ${err}`,
            data:null
            });
            return;
          }
          send_gmmailfor_prenotazione(req.body.email,req.body.cognome,req.body.nome,token, dataprennew,codpren);
          console.log(result, `result ...... conferma Prenotazione inserita regolarmente `);
          res.status(200).send({
          message: `persona inserita regolarmente`,
          data:result
          });
      });
    }catch(error){
        res.status(500).json({
            message: "Errore in registrazione richiesta conferma Prenotazione ",
            PrenConfirm: [],
            error: error.message
        });
  }


/*    metodo originario


// Save User to Database
RegConf.create({
username: req.body.username,
cognome: req.body.cognome,
nome: req.body.nome,
email: req.body.email,
password: req.body.password,
token: tokenn
})
.then(regConf => {
 console.log('creato record per conferma registrazione');
 send_gmmailfor_register(req.body.email,req.body.cognome,req.body.nome,tokenn);

 res.send({
     message: `Utente inserito regolarmente in register_confirmeds - controlla mail`,
     data: regConf
     });
})
.catch(err => {
  res.status(500).send({ message: err.message });
});
 
   */




} 



//  metodo creato da moreno per inoltro mail in fase di registrazione nuovo utente
//  ----------------------------------------------------------------------------------------   funziona
async function send_gmmailfor_prenotazione(sendto,cognome,nome, token, data1, codpren) {
    let message;
    
        const confURL = `http://localhost:4200/prenotazioneConferma?token=${token}`;
        message = `<p>Buongiorno sig <strong>${cognome} ${nome}</strong></p>
                    <br>
                    <p>abbiamo ricevuto la richiesta per la partecipazione alla serata del ${data1}.</p>
                    <br>
                    <p>ti ringraziamo per condividere con noi lo spirito del Sanfra in Festa.</p>
                    <br>
                    <p>per garantire la massima sicurezza, ti preghiamo di inserire il codice qui sotto riportato</p>
                    <br>
                    <p>          Codice personale di Prenotazione &nbsp;&nbsp;&nbsp; <strong>${codpren}</strong></p>
                    <br>
                    <p>Saremo felice di accoglierti e di condividere con noi lo stare assieme</p>
                    <p>ti preghiamo di cliccare sul link sottostante per rendere operativa la prenotazione</p>
                    <br>
                    <br>

                    <p>Nella maschera di conferma prenotazione, troverà visibile anche un nuovo campo</p>
                    <p>'Password' con il quale potrà essere generato un utente con le sue credenziali personali</p>
                    <p>che le potrà consentire di effettuare delle eventuali modifiche alla prenotazione.</p>
                    <br>
                    <p>Informazioni più dettagliate sono visibili alla voce 'Info' del menu Home.</p>
                    <br>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp Sanfra in festa</p>
                    <br>
                   <p><a href="${confURL}"><button>Conferma Prenotazione</button></a></p>`;
    
                   await sendEmail({
                    to: sendto,
                    subject: 'sanfra in Festa - Conferma Prenotazione Pranzo',
                    html: `<h4>Prenotazione serata del ${data1}</h4>
                           ${message}`
                });
    }
    

    exports.prenotazioneConfermata  = (req,res)=> {

      
    } 


    





function randomTokenString() {
    return crypto.randomBytes(80).toString('hex');
}


function randomcodprenString() {
  return crypto.randomBytes(5).toString('hex');
}



//  router.post('/confirmed', prenotaziones.confirmedprenotazione);    da controllare cosa fa
