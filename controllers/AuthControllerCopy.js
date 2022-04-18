// creo i metodi per la gestione dell'utente
// contiene i metodi per authcontroller alla data del 29/11/2021  (devo fare conferma forgotpassword)

const config = require("../config.json");
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("generic", salt);

const nodemailer = require('nodemailer');
const sendEmail = require('./../helpers/send-email');

// modulo per inoltro mail a utente
//const sendgm = require('../services/auth.service');

console.log(`authController_bkend hsh : ---------- ${hash}`);

// 24/11/2021   inseriti jwt per salvare jwt quando faccio login
const User = db.user;
const RegConf = db.regConf;
const ForgotPass = db.forgotPass;

const { pwdhashed } = '';

/*
module.exports = {
    login,
   // register
};

*/

//  nuova versione l

exports.login = (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "email inesistente" });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        res.status(200).send({
            id: user.id,
            username: user.username,
            cognome: user.cognome,
            user_ruolo: user.idruolo_day,
            idruoloweb: user.idruolo_day,
            email: user.email,
            accessToken: token
          });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };


/*  versione login in uso fino al 24/11/2021 
    
exports.login  = (req,res)=> {

//  let email = req.params.email;
  //  let password = req.params.password;
  
  let email = req.body.email;
  let password = req.body.password;

// in alternativa 
//   const {email, password} = req.body;

console.log(`server 3000 - login: parametri passati: ${email} --- password: ${password}`);

    
// controlli se i  campi email e password non sono vuoti
if(email == undefined || email == '' ||
    password == undefined || password == '') {
        res.status(401).json({
            massege:"email o password non valorizzati",
            status:res.status.Code,
            data:null
        })
    }


let strsql = `select * from users where email= '${email}' `;

console.log(`strsql creata: ${strsql}`);


const account =  db.query(strsql,(err,result) => {
    if(err) {

        console.log(err,'errore il login users for email ' + email);
    }
    

   
    console.log(`password da body da fare hash: ${req.body.password}`);

    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(` effettuato hash da body ----> ${hash}`);

    if(result.length>0) {
        console.log(`rilevati ${result.length}  ------------------------   utenti loggati `)
        console.log(`utente loggato-cognome: ${result[0].cognome}`);

        console.log(`utente loggato-password da mysql: ${result[0].password}`);
        console.log(`utente loggato-password hash da body: ${hash}`);

    

        const validPassword =  bcrypt.compare(hash, result.password);
        if (validPassword) {
      //  res.status(200).json({ message: "Valid password" });
                console.log(result);

          //      webToken.cognome = result[0].cognome;
          //      webToken.username = result[0].username;
         //       webToken.email = result[0].email;
         //       webToken.level = result[0].level;
        //        webToken.id = result[0].id;
         //       webToken.idruoloweb = result[0].idruoloweb;



        res.send({
            message: "Valid password - utente  Loggato con successo",
            data:result[0]  // non salvo il record ma il jwt

           // data:webToken
           })
        } else {
          
       // res.status(400).json({ error: "Invalid Password" });   // originale
        res.send({
            message: "Mail Inesistente",
            data:null 

           // data:webToken
           })
       } 

      }
    }


)}   

*/

exports.regconf =  (req,res)=> {
     //   vecchia maniera  - da rifare
    let token =  req.params.token;
    console.log(`backend ------ authController.regconf -  inizio - token passato:  ${token}`);
    
    let strsql = `select * from register_confirmeds where token= '${token}' `;
    
    console.log(`strsql creata: ${strsql}`);
    
    
    const account =  db.query(strsql,(err,result) => {
        if(err) {
              console.log(err,'errore lettura register_confirmeds for token ' + token);
        }
         
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------  conferme registrazione `)
            res.status(200).json({
                massege:"letto richiesta di registrazione",
                status:res.status.Code,
                data:result[0]
            })       
         } else {
            res.status(404).json({
                massege:"inesistente  richiesta di registrazione da mail",
                status:res.status.Code,
                data:null
                })       
            }
         
            });

         }

// funziona benissimo e invio mail
exports.confirmedregister  = (req,res)=> {

    console.log(`authController.confirmedregister nuova versione - utilizzo middleware -  inizio`);


    

      


     
    
    console.log(`server 3000 - confirmedregister: -- vado a creare register_confirmeds`);
    
    console.log(`email : ${req.body.email} --- password: ${req.body.password} --- username: ${req.body.username} --- cognome: ${req.body.cognome} --- nome: ${req.body.nome}`);   
  


    const tokenn = randomTokenString();

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
     
  // --- password dimenticata
  exports.forgotpassword = (req,res) => {
    

    console.log(`forgotpassword ------  email : ${req.body.email} ---  sono a inizio`);   
    // verifico che utente sia effettivo
    ForgotPass.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(forgot => {
        if (!forgot) {
          return res.status(404).send({ message: "email inesistente" });
        }
        res.status(200).send({
          message: `utente letto xxxx `,
          data: forgot
          });
        })
      .catch(err => {
          res.status(500).send({ message: err.message });
        });


  }

 


    
/*
     versione originaria fino al 25/11/2021
exports.confirmedregister  = (req,res)=> {

    console.log(`authController.confirmedregister vecchia versione - utilizzo middleware -  inizio`);




      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let username = req.body.username;
      let email = req.body.email;
      let password = req.body.password;
      let token = randomTokenString();


     
    
    console.log(`server 3000 - confirmedregister: parametri : ${email} --- password: ${password} --- username: ${username}`);
    
        
    // controlli se i  campi email e password non sono vuoti
    if(email == undefined || email == '' ||
        password == undefined || password == '') {
            res.status(401).json({
                massege:"email o password non valorizzati",
                status:res.status.Code,
                data:null
            })
        }
    
    
    let strsql = `select * from users where email= '${email}' `;
    
    console.log(`strsql creata: ${strsql}`);
    
    
    const account =  db.query(strsql,(err,result) => {
        if(err) {
              console.log(err,'errore il login users for email ' + email);
        }
         
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   utenti loggati `)
            console.log(`email già utilizzata - registrazione non possibile: ${result[0].cognome}`);
    
            res.status(400).json({
                massege:"utente già registrato con questa email",
                status:res.status.Code,
                data:null
            })       
         } else {
  
            let strsql =  `insert into register_confirmeds
            (email,cognome,nome,username,password,token) 
            valueS
            (
               '${email}','${cognome}','${nome}','${username}','${password}','${token}' 
            )`;

            console.log(`strsql per insert : ${strsql}`);


            db.query(strsql,(err,result) => {
            if(err) {
                      console.log(err,'errore in registrazione nuovo utente su tabella register_confirmeds ');
            }
            if(result) {
                console.log(result, `result ...... Utente inserito regolarmente in register_confirmeds `);

                send_gmmailfor_register(email,cognome,nome,token);

                res.send({
                    message: `Utente inserito regolarmente in register_confirmeds`,
                    data: result
                    });
            }
         
            });

         }
    
            
        })  
      
      
      
      
      }




*/

// per visualizzare i dai della richiesta di ripristino password
exports.forgotconf = (req,res)=> {

  let email =  req.params.email;
  console.log(`backend ------ authController.forgotconf -  inizio - email passato:  ${email}`);
  //      originale
/*
 
  
  let strsql = `select * from forgot_passwords where email= '${req.params.email}' `;
  
  console.log(`strsql creata: ${strsql}`);
  
  
  const account =  db.query(strsql,(err,result) => {
      if(err) {
            console.log(err,'errore lettura forgot_passwords for email ' + req.params.email);
      }
       
      if(result.length>0) {
          console.log(`rilevati ${result.length}  ------------------------  conferme registrazione `)
          res.status(200).json({
              massege:"letto richiesta di registrazione",
              status:res.status.Code,
              data:result[0]
          })       
       } else {
          res.status(404).json({
              massege:"inesistente  richiesta di ripristino password da mail",
              status:res.status.Code,
              data:null
              })       
          }
       
          });
*/


  //    sembra che non funzioni più
  // const test = 'ghisellini.moreno@gmail.com';
  ForgotPass.findOne({
    where: {
      email: req.params.email
    }
  })
  .then(forgotPass => {
    if (forgotPass) {
      res.status(200).send({
        message: `utente letto su forgot_passwords `,
        data: forgotPass
        });
      
    } else {
      return res.status(404).send({ message: "richiesta di Ripristino email inesistente !!!!" });
    }
    
    })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });



    


/*

  let strsql = `select * from register_confirmeds where token= '${token}' `;
  
  console.log(`strsql creata: ${strsql}`);
  
  
  const account =  db.query(strsql,(err,result) => {
      if(err) {
            console.log(err,'errore lettura register_confirmeds for token ' + token);
      }
       
      if(result.length>0) {
          console.log(`rilevati ${result.length}  ------------------------  conferme registrazione `)
          res.status(200).json({
              massege:"letto richiesta di registrazione",
              status:res.status.Code,
              data:result[0]
          })       
       } else {
          res.status(404).json({
              massege:"inesistente  richiesta di registrazione da mail",
              status:res.status.Code,
              data:null
              })       
          }
       
          });


          */
}








  // creazione nuvo users dopo conferma da mail ricevuta
  exports.createUserbyRegister = (req,res)=> {

    console.log(`authController.createUserbyRegister -  inizio`);
     
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let username = req.body.username;
      let email = req.body.email;
      let password = req.body.password;
      let token = randomTokenString();

      console.log(`password da body da fare hash: ${req.body.password}`);
      const hash = bcrypt.hashSync(req.body.password, salt);
      console.log(` effettuato hash da body ----> ${hash}`);
  
    console.log(`server 3000 - createUserbyRegister: parametri : ${email} --- password: ${password} --- username: ${username}`);
    
        
    // controlli se i  campi email e password non sono vuoti
    if(email == undefined || email == '' ||
        password == undefined || password == '') {
            res.status(401).json({
                massege:"email o password non valorizzati",
                status:res.status.Code,
                data:null
            })
        }
    
    
    let strsql = `select * from users where email= '${email}' `;
    
    console.log(`strsql creata: ${strsql}`);
    
    
    const account =  db.query(strsql,(err,result) => {
        if(err) {
              console.log(err,'errore il login users for email ' + email);
        }
         
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   utenti loggati `)
            console.log(`email già utilizzata - registrazione non possibile: ${result[0].cognome}`);
    
            res.status(400).json({
                massege:"utente già registrato con questa email",
                status:res.status.Code,
                data:null
            })       
         } else {
            insertUser(email,cognome,nome,username,hash,token);
            deleteConfRegister(email);
            return res.send({
                message: `Utente inserito regolarmente in users`,
                data: result
                });
             }
        });
      
    }

//  function varie


async function deleteConfRegister(email) {

    


    let strsql =  `delete from register_confirmeds WHERE email= '${email}' `;
    console.log(`strsql per delete : ${strsql}`);

    let rc = await db.query(strsql,(err,result) => {
    if(err) {
              console.log(err,`errore in cancellazione conferma registrazione nuovo utente per email ${email} `);
    }
    if(result) {
        
        console.log('evviva !!!! effettuata la cancellazione richiesta registrazione  su tabella register_confirmeds ');
        return result[0]
      }
    });

    
}
   
async function insertUser(email,cognome,nome,username,hash,token) {

     
    let strsql =  `insert into users
                    (email,cognome,nome,username,password,remember_token) 
                    valueS
                    (
                    '${email}','${cognome}','${nome}','${username}','${hash}','${token}' 
                    )`;

    console.log(`strsql per insert : ${strsql}`);
    let rc = await db.query(strsql,(err,result) => {
            if(err) {
                    console.log(err,'errore in registrazione nuovo utente su tabella users ');
            }
            if(result) {
                console.log('evviva !!!! effettuata la registrazione nuovo utente su tabella users ');
              
            }
        });

      
}


    function randomTokenString() {
        return crypto.randomBytes(40).toString('hex');
    }

  
 //  metodo creato da moreno per inoltro mail in fase di registrazione nuovo utente
 async function send_gmmailfor_register(sendto,cognome,nome, token) {
    let message;
 
        const confURL = `http://localhost:4200/signupConferme?token=${token}`;
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


/* 
      metodo passata su forgotpasswordcontroller
// ripristino password forzata  - richiede poi change password (da controllo login)
exports.confforgotpassword = (req,res) => {
  console.log(`authController.confforgotpassword -  inizio`);

  const hash = req.body.password //bcrypt.hashSync(req.body.password, salt);
 
 
  let strsql = `'UPDATE users SET password = ? WHERE email = ? ' , [${req.body.password}, ${req.body.email}] `;
    
  console.log(`strsql creata: ${strsql}`);
  
  
  const account =  db.query(strsql,(err,result) => {
      if(err) {
            console.log(err,'errore il login users for email ' + email);
      }
       
      if(result) {

        return res.status(200).send({
              massege:"passwordddddd aggiornata per la email selezionata",
              status:res.status.Code,
              data:result
          })       
       } 
      });

}

*/






 /*    metodo spostato in forgotPasswordController
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
*/

/*
const authController =  new AuthController();
export default authController;
*/