const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);



const saltRounds = 10;
const crypto = require("crypto");
const hash = bcrypt.hashSync("generic", salt);
const nodemailer = require('nodemailer');
const sendEmail = require('./../helpers/send-email');

// moreno per gestire nome del url di frontend per invio email
const configm = require("../configmoreno.json");


const strSql = "select `register_confirmeds`.*  from  `register_confirmeds` " 

// ------   ok  nuova modalità di craere strsql  
exports.getAll = (req,res)=> {
 
    let strsql = strSql; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all conferme registrazioni - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le conferme registrazioni ' + result.length);  

            console.log(`rilevate ${result.length} conferme registrazioni `)
            res.status(200).send({ 
                message:'Situazione attuale conferme registrazioni',
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

// lettura singolo socio
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
    
    const strsql = strSql + ' where register_confirmeds.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
 
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore in lettura conferme registrazioni for id ' + id);

            res.status(500).send({
                message: `2 errore in lettura conferme registrazioni for id ${id}- errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   soci `)

            res.status(200).send({ 
                message:`situazione attuale per conferme registrazioni id: .....  ${id}`,
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

// lettura singolo conferma registrazione
// ------   ok  nuova modalità di craere strsql  
exports.getbytoken = (req,res)=> {
    
    let token = req.params.token;
      
    const strsql = strSql + " where `register_confirmeds`.`token` = '" + token + "' ";

    console.log('backend - getbytoken - strsql --> ' + strsql);
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura conferma registrazione for token ' + token);

            res.status(500).send({
                message: `2 errore il lettura conferma registrazione for token ${token}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   conferme registrazioni `)

            res.status(200).send({ 
                message:`situazione attuale per conferma registrazione token: .....  ${token}`,
                rc: 'ok',
                number: result.length,
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per token: ${token} `);
            res.status(200).send({
                message: `nessun user pressente for token: ${token}`,
                rc: 'nf',
                number: 0,
                data:null
            });
        }

    });  
}

// creazione nuovo conferma registrazione   (post)    // ok

exports.createNew = (req,res)=> {
    
      // creo le variabili dai campi di input
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let email = req.body.email;
      let token = req.body.token;
      let username = req.body.username;
      let password = req.body.password;

           
      let strsql =  `insert into register_confirmeds
                  (cognome,nome,email,token,password,username) 
                  valueS
                  (
                    UPPER('${cognome}'),UPPER('${nome}'),LOWER('${email}'),'${token}','${password}',UPPER('${username}') 
                  )`;
          
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova conferma registrazione evento su tabella register_confirmeds ');
              res.status(500).send({
                message: `errore in registrazione nuova conferma registrazione su tabella register_confirmeds - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... conferma registrazione inserita regolarmente `);
          res.status(200).send({
            message: `conferma registrazione inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,` <----------  updatebyId ----------  Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from register_confirmeds where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let email = req.body.email;
    let token = req.body.token;
    let username = req.body.username;
    let password = req.body.password;

    let strsql =  `update register_confirmeds set
                    cognome = UPPER('${cognome}'),
                    nome = UPPER('${nome}'),
                    email = LOWER('${email}'),
                    password = '${password}',
                    username = '${username}',
                    token = '${token}',
                    where id =  id`;

                    console.log('bk - --------------  register_confirmeds ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura register_confirmeds for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura register_confirmeds for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento register_confirmeds id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto register_confirmeds ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato register_confirmeds id: ${id}`);
                    res.status(200).send({ 
                        message: `register_confirmeds aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente register_confirmeds id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna register_confirmeds presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

exports.deletebyid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione conferma registrazione id ${id}`);  // visualizzo la struttura dei campi immessi dall'conferma registrazione 

    // definisco la strsql per lettura conferma registrazione

    let strsql_Inqu = "select * from register_confirmeds where id= " + id;

    let strsql =  `delete from register_confirmeds  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura register_confirmeds for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione conferma registrazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione conferma registrazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `conferma registrazione  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente conferma registrazione id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getbytoken = (req,res)=> {
    
    let token = req.params.token;
      
    const strsql = strSql + " where `register_confirmeds`.`token` = '" + token + "' ";

    console.log('backend - getbytoken - strsql --> ' + strsql);
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura conferma registrazione for token ' + token);

            res.status(500).send({
                message: `2 errore il lettura conferma registrazione for token ${token}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------- token -----------------   conferme registrazioni `)
            console.log(`letto conferma registrazione da token ${result[0].cognome} -- ${result[0].nome} --  ${result[0].username} --  ${result[0].password}`);
            res.status(200).send({ 
                message:`situazione attuale per conferma registrazione token: .....  ${token}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per token: ${token} `);
            res.status(200).send({
                message: `nessuna conferma registrazione presente for token: ${token}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

exports.destroyToken = (req,res)=> {  

    let token = req.params.token;

    console.log(req.body,`cancellazione conferma registrazione token ${token}`);  // visualizzo la struttura dei campi immessi dall'conferma registrazione 

    // definisco la strsql per lettura conferma registrazione

    let strsql_Inqu = "select * from register_confirmeds where token= '" + token + "' ";

    let strsql =  `delete from register_confirmeds  where token = '${token}'`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura register_confirmeds for token ${token} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione conferma registrazione token: ${token}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione conferma registrazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `conferma registrazione utente con token: ${token} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente conferma registrazione token: ${token} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for token: ${token}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  



// conferma richiesta di registrazione e invio mail
//  ----------------------------------------------------------------------------------------   funziona
exports.confirmedregister  = (req,res)=> {

    console.log(`RegisterConfirmedController.confirmedregister nuova versione - utilizzo middleware -  inizio`);
   
    
    console.log(`-------->  server 3001 - confirmedregister: -- vado a creare register_confirmeds`);
    
    console.log(`email : ${req.body.email} --- password: ${req.body.password} --- username: ${req.body.username} --- cognome: ${req.body.cognome} --- nome: ${req.body.nome}`);   
  

      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let email = req.body.email;
      let token = randomTokenString();
      let username = req.body.username;
      let password = req.body.password;
    
   
    console.log(`                             creato token : ${token} `);   

    let strsql =  `insert into register_confirmeds
                  (cognome,nome,email,token,password,username) 
                  valueS
                  (
                    UPPER('${cognome}'),UPPER('${nome}'),LOWER('${email}'),'${token}',LOWER('${password}'),UPPER('${username}') 
                  )`;
          
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo utente su tabella register_confirmeds ');
              res.status(500).send({
                message: `errore in registrazione nuovo utente su tabella register_confirmeds - errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
          }  else {
            console.log(`result ...... conferma registrazione inserita regolarmente ---- ${token} `);
    //  eliminare             send_gmmailfor_register(req.body.email,req.body.cognome,req.body.nome,token);
                 res.status(200).send({
                   message: `conferma registrazione inserita regolarmente`,
                   rc: 'ok',
                   tokennewuser: token,
                   data:result
               });

          }
     
     });
  
  }


//  metodo creato da moreno per inoltro mail in fase di registrazione nuovo utente
//  ----------------------------------------------------------------------------------------   funziona
async function send_gmmailfor_register(sendto,cognome,nome, token) {

    console.log(` send_gmmailfor_register  ---  appena entrato -- token : ${token} ----- sendto: ${sendto}`);   

    let message;
    let urlfrontend = configm.hostfe;
       // originale const confURL = `http://localhost:4200/signupConferme?token=${token}`;  2023/12/29

       const confURL = `${urlfrontend}/signupConferme?token=${token}`;



        message = `<p>Buongiorno sig ${cognome} ${nome}</p>
                    <p>abbiamo ricevuto la richiesta di nuova registrazione utente</p>
                    <p>ti preghiamo di cliccare sul link sottostante per rendere operativa la registrazione</p>
                   <p><a href="${confURL}"><button>Conferma Registrazione</button></a></p>`;
    
                   await sendEmail({
                    to: sendto,
                    subject: 'Sign-up Conferma Registrazione nuovo Utente',
                    html: `<h4>Registrazione nuovo utente - Moreno</h4>
                           ${message}`
                });
    }


    exports.sendmailregconfirmed = (req,res)=> {

        
        console.log(`backend --  sendmailregconfirmed ------------------------------ appena entrato`);
        
        console.log('parametri Passati Body : ' + JSON.stringify(req.body)); 
        
        let cognome = req.body.cognome;
        let nome = req.body.nome;
        let email = req.body.email;
        let token = req.body.token;
    

/*
        let email = req.params.email;
        let token = req.params.token;  //randomTokenString();
        let cognome = req.params.cognome;
        let nome = req.params.nome;
        

        */

      //  console.log('params : ' + JSON.stringify(req.params)); 
    
        try{
      
        
    
        send_gmmailfor_register(email,cognome,nome,token);
       //   console.log(result, `result ...... email di confermadefinitiva prenotazione evento inviata regolarmente `);
          res.status(200).send({
          message: `email di conferma registrazione utente inviata regolarmente .......`,
          rc: 'ok',
          token: token
          });
    
    
        }catch(error){
            res.status(500).json({
                message: "Errore in invio mail dopo registrazione utente ",
                PrenConfirm: [],
                rc: 'ko',
                error: error.message
            });
      }
    
    
    }
    

exports.testemail = (req,res)=> {

    console.log('backend --  testemail ------------- appena entrato '  + JSON.stringify(req.body)); 

    let token = req.body.token;

    res.status(200).send({
        message: `testemail ....... ricevuto e passat il token`,
        rc: 'ok',
        token: token
        });



}




function randomTokenString() {
    return crypto.randomBytes(80).toString('hex');
}


function randomcodprenString() {
  return crypto.randomBytes(5).toString('hex');
}







/*
// da correggere per conferma registrazione  ---  da eliminare
exports.confirmedregistrazionelogistica  = (req,res)=> {

    console.log(`backend --  su registrazioneConfirmedController--- confirmedregistrazionelogistica - appena entrato`);

    console.log('parametri Passati : ' + JSON.stringify(req.body));   
   
    // il codice pren è uguale per tutti le registrazioni di gruppo ed è passata nel body
    //const codprenx =  randomcodprenString();
    //const token = randomTokenString();

    let descrevento = '';

     let cognome = req.body.cognome;
     let nome = req.body.nome;
     let email = req.body.email;
     let telefono = req.body.telefono;
     let idevento = req.body.idevento;
     let idlogistica = req.body.idlogistica;
     let idsettore = req.body.idsettore;
     let idfila = req.body.idfila;
     let idposto = req.body.idposto;
     let idtipobiglietto = req.body.idtipobiglietto;
     let data1 = req.body.datapren; 
    //  la data arriva gia nel formato dd/mm/aaaa
     let persone = req.body.persone;
     let codpren = req.body.codpren;
     let token = req.body.token;
    
   //  console.log(`   lunghezza di token criptato                 ${token.length} bytes of random data: ${token.toString('base64')}`);

    try{
    

      let strsql =  `insert into register_confirmeds
                (cognome,nome,email,telefono,idevento,idlogistica,idsettore,idfila,idposto,idtipobiglietto,datapren,persone,codpren,token) 
                valueS
                (
                  '${cognome}','${nome}','${email}','${telefono}',${idevento},${idlogistica},${idsettore},${idfila},${idposto},${idtipobiglietto},'${data1}',${persone},'${codpren}','${token}' 
                )`;

        console.log('--- strsql pronta per fare insert:  ' + strsql );        

      db.query(strsql,(err,result) => {
          if(err) { 
            console.log(err,'errore in registrazione conferma Prenotazione evento su tabella register_confirmeds ');
            res.status(500).send({
            message: `errore in registrazione conferma Prenotazione evento su tabella register_confirmeds - errore: ${err}`,
            data:null
            });
            return;
          }
       
          console.log(result, `result ...... conferma Prenotazione evento inserita regolarmente `);
          res.status(200).send({
          message: `registrazione evento inserito regolarmente`,
          rc: 'ok',
          data:result
          });
      });
    }catch(error){
        res.status(500).json({
            message: "Errore in registrazione richiesta conferma Prenotazione evento",
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
 
   




} 

*/

/*



// da eliminare e sostituire con quello per conferma registrazione
exports.confirmedregistrazione  = (req,res)=> {

    console.log(`backend --  su registrazioneConfirmedController--- registrazioneController.confirmedregistrazione - appena entrato`);

    console.log('parametri Passati : ' + JSON.stringify(req.body));   
   
    const codprenx =  randomcodprenString();
    const token = randomTokenString();

    let descrevento = '';

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let email = req.body.email;
    let telefono = req.body.telefono;
    let idevento = req.body.idevento;
    let idtipobiglietto = req.body.idtipobiglietto;
    let data1 = req.body.datapren; 
    //  la data arriva gia nel formato dd/mm/aaaa
    /*
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
    */  

/*

     let persone = req.body.persone;
     let codpreny = codprenx.substring(0, 5);
     let codpren = codpreny;
 
     console.log(`   lunghezza di token criptato                 ${token.length} bytes of random data: ${token.toString('base64')}`);
 
     // leggo l'evento 
     const id = req.body.idevento;
     
     let strsql1 =  ' select `eventos`.*  from  `eventos` where `eventos`.`id` = ' + id;
 
    
     console.log('backend - confirmedregistrazione - lettura evento strsql --> ' + strsql1);
   
    // let strsql = `select * from users where id= ${id} `;    originale
 
     db.query(strsql1,(err,result)=> {
         if(err) {
             console.log(err,'2 errore il lettura eventos for id ' + id);
 
             res.status(500).send({
                 message: `2 errore il lettura eventos for id ${id}- errore: ${err}`,
                 data:null
             });
             return;
         }
         
         if(result.length>0) {
             console.log(`rilevate ${result.length}  ------------------------   evento `)
             descrevento = result[0].descrizione;
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
 
 
     /*
 
       let strsql =  `insert into register_confirmeds
                 (cognome,nome,email,telefono,datapren,persone,codpren,token,idevento,idtipobiglietto) 
                 valueS
                 (
                   '${cognome}','${nome}','${email}','${telefono}','${data1}',${persone},'${codpren}','${token}',${idevento},${idtipobiglietto} 
                 )`;
 
         console.log('--- strsql pronta per fare insert:  ' + strsql );        
 
       db.query(strsql,(err,result) => {
           if(err) { 
             console.log(err,'errore in registrazione conferma Prenotazione evento su tabella register_confirmeds ');
             res.status(500).send({
             message: `errore in registrazione conferma Prenotazione evento su tabella register_confirmeds - errore: ${err}`,
             data:null
             });
             return;
           }
           send_gmmailfor_registrazione_eventonormal(req.body.email,req.body.cognome,req.body.nome,token,codpren,descrevento,data1);
           console.log(result, `result ...... conferma Prenotazione evento inserita regolarmente `);
           res.status(200).send({
           message: `registrazione evento inserito regolarmente`,
           rc: 'ok',
           data:result
           });
       });
     }catch(error){
         res.status(500).json({
             message: "Errore in registrazione richiesta conferma Prenotazione evento",
             PrenConfirm: [],
             error: error.message
         });
   }
 */
 
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
  
   
 
 
 
 } 
  */
 




 