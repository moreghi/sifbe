// creo i metodi per la gestione dell'utente
const config = require("../config.json");

const crypto = require("crypto");

const db = require('../db');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("generic", salt);

const nodemailer = require('nodemailer');
const sendEmail = require('./../helpers/send-email');

const User = db.user;
const ForgotPass = db.forgotPass;

exports.getAll = (req,res)=> {
 
    let strsql = 'select * from forgot_passwords';
    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura all forgot_passwords');
        }
        if(result.length>0) {
            console.log('lettura tutte richiesta reset password ' + result.length);  

            console.log(`rilevate ${result.length} richiesta reset password `)
            res.send({
                message:'Situazione attuale richiesta reset password',
                data:result
            });
        }else {
            console.log('nessun record presente ' + result.length); 
            res.send({
                message:'nessun record presente',
                data:null
            });
        }

    });
}

// lettura singolo utente
exports.getbyemail = (req,res)=> {
    console.log('forgotpasswordController' );

    console.log('getbyemail -  for email ' + req.params.email);

    let key = req.params.email;
  
    let strsql = `select * from forgot_passwords where email= '${key}' `;

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'errore il lettura forgot_passwords for email ' + key);
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   richiesta reset password `)
            res.send({
             messagexx:`rilevate ${result.length}  ------- get per email ${key} -------   richiesta reset password`,
                message:`situazione attuale per richiesta reset password by email: .....  ${key}`,
                data:result[0]
            });
        }else {
            console.log(`nessun record presente per email: ${key} `); 
            res.send({
                message: `nessun user pressente for email: ${key}`,
                data:null
            });
        }

    });  
}

// creazione nuovo utente   (post)

exports.create = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo utente');  // visualizzo la struttura dei campi immessi dall'utente 
  
      // creo le variabili dai campi di input
   
      let email = req.body.email;
      let username = req.body.username;
      let cognome = req.body.cognome;
      let nome = req.body.nome;    
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into forgot_passwords
                  (cognome,nome,username,email) 
                  valueS
                  (
                     '${cognome}','${nome}','${username}','${email}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore inserimento richiesta reset password su tabella forgot_passwords ');
          }
          console.log(result, `result ...... richiesta reset password inserita regolarmente `);
                  res.send({
                  message: `richiesta reset password inserita regolarmente `,
                  data: result
              });
             
             
      });
    
  }
  
  // aggiornamento utente   // metodo 2  -- funziona

 exports.update = (req,res)=> {  


    
        const result =  db.forgotPass.update(
          { cognome: req.body.cognome,
            nome:  req.body.nome,
            username:  req.body.username
         },
          { where: { email: req.params.email } }
        )

        .then((result)=>{
            console.log("the data was Updated");
            res.send({ 
                message: `richiesta reset password aggiornata regolarmente ...   ok per  email: ${req.params.email} --  `,
                rc: 'ok',
                data:result
            })
        })   
        .catch((err)=>{
            console.log('errore su update: ' , err)
        });









/*               originale

    let key = req.params.email;

    console.log(req.body,`Modifica richiesta reset password email ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from forgot_passwords where email= '${key}' `;

    // definisco le variabili per aggiornamento campi

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let username = req.body.username;
    let email = req.body.email;
   
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura forgot_passwords for key ' + 'key');
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento richiesta reset password per email: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `richiesta reset password aggiornata regolarmente ...   ok per  email: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente richiesta reset password email: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessuna richiesta reset password presente for email: ${key}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  
   
        */

}  

// aggiornamento utente   // metodo 1  -- funziona
/*    metodo non corretto
exports.updateUserByid1 = (req,res)=> {

    let key = req.params.id;

    console.log(req.body,`Modifica utente id ${key}`);  // visualizzo la struttura dei campi immessi dall'utente 

  // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from users where id= ${key} `;
    
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
            noteUtente: req.body.noteUtente,
            remember_token: req.body.remember_token,
            email_verified_at: req.body.email_verified_at,
            key_utenti_operation: req.body.key_utenti_operation,
       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'errore il lettura users for key ' + key);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE users SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento utente id: ${key}`);
                        req.flash('error', err);
                        return;
                    } 
                    res.send({ 
                        message: `Utente aggiornato regolarmente ...   ok per  id: ${key} --  `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente utente id: ${key} -- aggiornamento non possibile`);
                    res.send({
                        message: `nessun user pressente for id: ${key}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}
*/
// cancellazione utente

exports.delete = (req,res)=> {  

    let key = req.params.email;

    console.log(req.body,`cancellazione utente id ${req.params.email}`);  // visualizzo la struttura dei campi immessi dall'utente 


      var sql = `DELETE FROM forgot_passwords where email= '${req.params.email}'`;
      db.query(sql, function (err, result) {
        if (err) { 
            console.log(err,`----- errore in cancellazione richiesta reset password email: ${req.params.email}`);
            req.flash('error', err);
            return;
        } 
        console.log("Number of records deleted: " + result.affectedRows);
        res.send({ 
            message: `richiesta reset password  per email: ${req.params.email} cancellata regolarmente  `,
            rc: 'ok',
            data:null
        });  
      });


}  

// creazione nuovo utente   (post)

exports.forgotpwd = (req,res)=> {
   
    
    console.log(`forgotpassword ------  email : ${req.body.email} ---  sono a inizio`);   
    // verifico che utente sia effettivo
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "email inesistente" });
        }
        
         ForgotPass.create({
            username: user.username,
            cognome: user.cognome,
            nome: user.nome,
            email: req.body.email
           })
            .then(forgot => {
             console.log('creato record per ripristino password');
             send_gmmailfor_forgotPassword(req.body.email,user.cognome,user.nome);
             console.log('fatto invio email');
             res.send({
                 message: `effettuata la registrazione nuova richiesta reset password su tabella forgot_passwords - controlla mail`,
                 data: forgot
                 });
            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });
        })
      .catch(err => {
          res.status(500).send({ message: err.message });
        });
    
  }
 
  // metodo di test per reset password

  exports.resetpassword = (req,res) => {

    console.log(`forgotController.resetpassword ------  email : ${req.body.email} - ${req.body.password} -  sono a inizio`); 

    const hash = bcrypt.hashSync(req.body.password, salt);

    console.log(`resetuserpwd ------  email : ${req.body.email} - ${req.body.password} - hash: ${hash} sono a inizio`); 
    
    
        const result =  db.user.update(
        {
          password:  hash
       },
        { where: { email: req.body.email } }
      )

      .then((result)=>{
          console.log("reimpostata la password iniziale su users");

          var sql = `DELETE FROM forgot_passwords where email= '${req.body.email}'`;
          db.query(sql, function (err, result) {
            if (err) { 
                console.log(err,`----- errore in cancellazione richiesta reset password email: ${req.params.email}`);
                req.flash('error', err);
                return;
            } 
            console.log("Number of records deleted: " + result.affectedRows);
            res.send({ 
                message: `richiesta reset password eseguita regolarmente ...   ok per  email: ${req.body.email} --  `,
                rc: 'ok',
                data:null
            })
            });  
       })
      .catch((err)=>{
          console.log('errore su update password: ' , err)
      });

  
  }


 //  non funziona - togliere
  //  metodo creato da moreno per ripristinare la password  iniziale su users
    
  exports.resetpwduser = (req,res)=> {
   
    const hash = bcrypt.hashSync(req.body.password, salt);

    console.log(`resetuserpwd ------  email : ${req.body.email} - ${req.body.password} -  sono a inizio`); 
    
    const result =  db.user.update(
        {
          password:  hash
       },
        { where: { email: req.body.email } }
      )

      .then((result)=>{
          console.log("reimpostata la password iniziale su users");

          var sql = `DELETE FROM forgot_passwords where email= '${req.body.email}'`;
          db.query(sql, function (err, result) {
            if (err) { 
                console.log(err,`----- errore in cancellazione richiesta reset password email: ${req.params.email}`);
                req.flash('error', err);
                return;
            } 
            console.log("Number of records deleted: " + result.affectedRows);
            res.send({ 
                message: `richiesta reset password eseguita regolarmente ...   ok per  email: ${req.body.email} --  `,
                rc: 'ok',
                data:null
            })
            });  
       })
      .catch((err)=>{
          console.log('errore su update password: ' , err)
      });
      
  }





 //  metodo creato da moreno per inoltro mail in fase di ripristino Password
 async function send_gmmailfor_forgotPassword(sendto,cognome,nome) {
    let message;
  
        const confURL = `http://localhost:4200/forgotpasswordConferme?email=${sendto}`;
        message = `<p>Buongiorno sig ${cognome} ${nome}</p>
                    <p>abbiamo ricevuto la richiesta di ripristinare la sua passowrd</p>
                    <p>ti preghiamo di cliccare sul link sottostante per rendere operativo il ripristino</p>
                   <p><a href="${confURL}"><button>Conferma Ripristino</button></a></p>`;
    
                   await sendEmail({
                    to: sendto,
                    subject: 'Ripristina Password',
                    html: `<h4>Ripristina Password Utente</h4>
                           ${message}`
                });
    }
  

  