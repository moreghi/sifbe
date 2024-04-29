const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = 'select `users`.* ' +  
               ' from `users`  '; 
              
const order =  ' order by `users`.`id` asc';


// lettura singola Locandina
exports.getbyemail = (req,res)=> {
    
    const email = req.params.email;
    
    let strsql = strSql + " where `users`.`email` = '" + email + "' ";

   
    console.log('backend_forgotpwdController - Users getbyemail - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2gh errore il lettura users for email ' + email);

            res.status(500).send({
                message: `2gh errore il lettura users for email ${email}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ----------- email `)

            res.status(200).send({ 
                message:`situazione attuale per user con email: .....  ${email}`,
                number:  result.length,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per email: ${email} `);
            res.status(200).send({
                message: `users -- getbyemail --- nessun user presente for email: ${email}`,
                number:  result.length,
                rc: 'nf',
                data:null
            });
        }

    });  
}

  // aggiornamento utente   // metodo 2  -- funziona

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,` <----------  updatebyId ----------  Modifica utente id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from users where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let idManif = req.body.idManif;
    let idEvento = req.body.idEvento;
    let photo = req.body.photo;
    let stato = req.body.stato;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update users set
                    idManif = ${idManif},
                    idEvento = ${idEvento},
                    photo = '${photo}',
                    stato = ${stato},
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;


                    console.log('bk - --------------  Locandina ---------------- update: ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4se errore il lettura users for id ' + id);
            res.status(500).send({
                message: `4se errore il lettura users for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                console.log('sto per fare update: ' + strsql);
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento Locandina id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto Locandina ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato Locandina id: ${id}`);
                    res.status(200).send({ 
                        message: `Locandina aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente Locandina id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessuna Locandina presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

exports.forgotpwd = (req,res)=> {  

    let email = req.body.email;

    console.log(req.body,` <----------  forgotpwd ----------  invio email di richiesta reset password ${email}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = "select * from users where `users`.`email`= '" + email + "' ";
    console.log('bk - --------------  invio email per reset password ----------------  ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4se errore il lettura users for id ' + id);
            res.status(500).send({
                message: `4se errore il lettura users for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                    // INVIO EMAIL
                 
                    res.status(200).send({ 
                        message: `richiesta reset password aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  
                }  
      });  
}  

exports.confresetuserpwd = (req,res)=> {  

    let email = req.body.email;

    console.log(req.body,` <----------  confresetuserpwd ----------  conferma ricezione  email di richiesta reset password ${email}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // da fare tutto
/*
    let strsql_Inqu = "select * from users where `users`.`email`= '" + email + "' ";
    console.log('bk - --------------  invio email per reset password ----------------  ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4se errore il lettura users for id ' + id);
            res.status(500).send({
                message: `4se errore il lettura users for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                    // INVIO EMAIL
                    console.log(err,`----- aggiornato Locandina id: ${id}`);
                    res.status(200).send({ 
                        message: `Locandina aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  
                }  
      });  

      */
} 

exports.resetpassword = (req,res)=> {  

    let email = req.body.email;
    let newpwd = req.body.newpwd;

    console.log(req.body,` <----------  resetpassword ----------  effettuare reset password  email di richiesta reset password ${email}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // da fare tutto

// bisogna cryptare la password come in register



/*
    let strsql_Inqu = "select * from users where `users`.`email`= '" + email + "' ";
    console.log('bk - --------------  invio email per reset password ----------------  ' + strsql);
                    
    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4se errore il lettura users for id ' + id);
            res.status(500).send({
                message: `4se errore il lettura users for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {

                    // INVIO EMAIL
                    console.log(err,`----- aggiornato Locandina id: ${id}`);
                    res.status(200).send({ 
                        message: `Locandina aggiornata regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  
                }  
      });  

      */
} 

