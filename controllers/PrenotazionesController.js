const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const nodemailer = require('nodemailer');
const sendEmail = require('./../helpers/send-email');

const strSql = "select `prenotaziones`.*, `t_stato_prenotaziones`.`d_stato_prenotazione`  from  `prenotaziones` " + 
               " inner join `t_stato_prenotaziones` ON `t_stato_prenotaziones`.`id` = `prenotaziones`.`idstato` " 

// ------   ok  nuova modalità di craere strsql  
exports.getAll = (req,res)=> {
 
    let strsql = strSql; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all prenotazioni - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le prenotazioni ' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni',
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

// lettura singolo prenotazione
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `prenotaziones`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from prenotaziones where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura prenotazione for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura prenotazione for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   prenotazioni `)

            res.status(200).send({ 
                message:`situazione attuale per prenotazione id: .....  ${id}`,
                rc: 'ok',
                data:result[0]
            });                    
        }else {
            console.log(`nessun record presente per id: ${id} `);
            res.status(200).send({
                message: `nessun user pressente for id: ${id}`,
                rc: 'nf',
                data:null
            });
        }

    });  
}

// creazione nuovo prenotazione   (post)    // ok

exports.createNew = (req,res)=> {
    
      console.log(req.body,'Creazione nuovo prenotazione');  // visualizzo la struttura dei campi immessi dall'prenotazione 
  
      // creo le variabili dai campi di input
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let telefono = req.body.telefono;
      let idgiornata = req.body.idgiornata;
      let datapren = req.body.datapren;
      let persone = req.body.persone;
      let email = req.body.email;
      
      let strsql =  `insert into prenotaziones
                  (cognome,nome,telefono,idgiornata,datapren,persone,email) 
                  valueS
                  (
                     '${cognome}','${nome}','${telefono}',${idgiornata},'${datapren}',${persone},'${email}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova prenotazione su tabella prenotaziones ');
              res.status(500).send({
                message: `errore in registrazione nuova prenotazione su tabella prenotaziones - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... prenotazione inserita regolarmente `);
          res.status(200).send({
            message: `prenotazione inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento prenotazione   // metodo 2  -- funziona  // ok

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica prenotazione id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazione 

    // definisco la strsql per lettura prenotazione

    let strsql_Inqu = `select * from prenotaziones where id= ${id} `;

    // definisco le variabili per aggiornamento campi

    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let telefono = req.body.telefono;
    let idgiornata = req.body.idgiornata;
    let datapren = req.body.datapren;
    let persone = req.body.persone;
    let email = req.body.email;
    let idstato = req.body.idstato;

   

    let strsql =  `update prenotaziones set
                    cognome = '${cognome}',
                    nome = '${nome}',
                    telefono = '${telefono}',
                    idgiornata = ${idgiornata},
                    datapren = '${datapren}',
                    persone = ${persone},
                    email = '${email}',
                    idstato = ${idstato}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prenotaziones for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura prenotaziones for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento prenotazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto prenotazione ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato prenotazione id: ${id}`);
                    res.status(200).send({ 
                        message: `prenotazione aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente prenotazione id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento prenotazione   // metodo 1  -- da sistemare

exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica prenotazione id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazione 

  // definisco la strsql per lettura prenotazione

    let strsql_Inqu = `select * from prenotaziones where id= ${id} `;
    
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
            noteprenotazione: req.body.noteprenotazione,
            id_prenotazioni_operation: req.body.id_prenotazioni_operation,
          




       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura prenotaziones for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura prenotaziones for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE prenotaziones SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento prenotazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto prenotazione ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `prenotazione aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente prenotazione id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione prenotazione   // ok

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione prenotazione id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazione 

    // definisco la strsql per lettura prenotazione

    let strsql_Inqu = `select * from prenotaziones where id= ${id} `;

    let strsql =  `delete from prenotaziones  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotaziones for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione prenotazione id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione prenotazione -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `prenotazione  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente prenotazione id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

exports.getPrenotazinidaEvadere = (req,res)=> {

    console.log('backend -----------------------------  getPrenotazinidaEvadere ' );
    
    let stato = 0;
    let strsql = '';
  
    strsql =  strSql + ' where `idstato` = ' + stato;  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prenotaziones da evadere - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutte le prenotazioni da evadere' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni da evadere',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione pressente !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

//  ok
exports.getPrenotazinidaEvaderebyday = (req,res)=> {

    console.log('backend -----------------------------  getPrenotazinidaEvaderebyday ' + req.params.idgiornata);
    
    let idgiornata = req.params.idgiornata;
    let stato = 0;
    let strsql = '';
  
    strsql =  strSql + ' where `idstato` = ' + stato + ' and `idgiornata` = ' + idgiornata;  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prenotaziones da evadere - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti gli prenotazioni da evadere' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni da evadere',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione pressente !! `,
                number:  result.length,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

// ok
exports.getPrenotazinibystato = (req,res)=> {

    
    console.log('backend -----------------------------  getPrenotazinibystato ' + req.params.stato);
  

    let stato = req.params.stato;
    let ruolo2 = req.params.ruolo2;
    let strsql = '';

    strsql =  strSql + ' where `idstato` >= ' + stato;  
    console.log(`strsql:  ${strsql} `);
  
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `55x errore il lettura all prenotaziones per stato - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('yyy - lettura tutte le  prenotazioni per stato' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni per stato',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user pressente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// ok  
exports.getPrenotazionibyemail = (req,res)=> {
    
    let email = req.params.email;
    let strsql = '';

    console.log('backend -----------------------------  getPrenotazinibyemail ' + req.params.email);
    
   
    strsql =  strSql + " where `email` = '" + email + "' ";  
    console.log(`strsql:  ${strsql} `);
      db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prenotaziones per email - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xyz - lettura tutte le prenotazioni per email' + result.length);  

            console.log(`rilevate ${result.length} prenotazioni `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioni per email',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazione presente con la email richiesta  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

exports.sendmailprenconfirmed = (req,res)=> {

    let email = req.params.email;
    console.log(`backend --  su prenotazioneController--- sendmailprenconfirmed - appena entrato`);
    
    console.log('parametri Passati Body : ' + JSON.stringify(req.body));   
    console.log('params : ' + JSON.stringify(req.params)); 

    try{
  
      let cognome = req.body.cognome;
      let nome = req.body.nome;
    //  let email = req.body.email;
      let persone = req.body.persone;
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
   
      send_gmmailfor_prenotazioneConfermata(email,cognome,nome,persone, data1);
   //   console.log(result, `result ...... email di confermadefinitiva prenotazione inviata regolarmente `);
      res.status(200).send({
      message: `email di conferma definitiva prenotazione inviata regolarmente`,
      rc: 'ok',
      });


    }catch(error){
        res.status(500).json({
            message: "Errore in invio mail dopo conferma definitiva Prenotazione ",
            PrenConfirm: [],
            error: error.message
        });
  }


}



//  metodo creato da moreno per inoltro mail dopo conferma prenotazione dell'utente
//  ----------------------------------------------------------------------------------------   funziona
async function send_gmmailfor_prenotazioneConfermata(sendto,cognome,nome, persone, data1) {

    console.log('send_gmmailfor_prenotazioneConfermata - email: ' + sendto);
    let message;
    
     
        message = `<p>Grazie <strong>${cognome} ${nome}</strong></p>
                    <br>
                    <p>per averci confermato la tua presenza alla serata del ${data1}.</p>
                    <br>
                    <p>ti abbiamo riservato ${persone} posti e ....  </p>
                    <p>ti aspettiamo per passare in allegria una bella serata</p>
                    <br>
                    <p>che solo Sanfra in festa sa rendere magica.</p>`;
        
                   await sendEmail({
                    to: sendto,
                    subject: 'sanfra in Festa - Conferma Prenotazione Pranzo',
                    html: `<h4>Prenotazione serata del ${data1}</h4>
                           ${message}`
                });
    }
