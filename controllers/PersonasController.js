// creo i metodi per la gestione dell'persona

/*
esempio di come creare strsql parametrica          https://dirask.com/posts/Node-js-MySQL-Inner-Join-jPErd1

connection.connect(error => {
    if (error) throw error;
    const query = `SELECT * 
                   FROM ??
                   JOIN ?? ON ??.?? = ??.??`;
    const values = [
        'personas',                 // SELECT *
        'departments',           // FROM `personas`
        'departments',           // JOIN `departments` 
        'id',                    // ON departments.id = personas.department_id
        'personas',
        'department_id',
    ];

    connection.query(query, values, (error, result) => {  // sends queries
        connection.end();                                 // closes connection
        if (error) throw error;
        console.log(result);
    });
});


*/

/*    quando sistemate le relazioni su .findOne  (hidran/Matteo)

const strSql = 'select `personas`.`id`, `cognome`, `nome`, `idStato`, `tipoacc`, `username`, `password`, `email`, `idRuolo`, `idRuolo_Day`, `idruoloweb`, `notepersona`, `photo`, `eseguitaAbilitazione`, `remember_token`, `email_verified_at`, `personas`.`id_persone_operation`, `personas`.`created_at`, `personas`.`updated_at`, `d_ruolo`, `d_ruolo_day`, `d_Stato_persona`, `d_ruolo_web`' +
                ' FROM `personas` ' + 
                ' JOIN `t_ruolos` ON `t_ruolos`.`id` = `personas`.`idRuolo` ' +
                ' JOIN `t_ruolo_days` ON `t_ruolo_days`.`id` = `personas`.`idRuolo_Day` ' + 
                ' JOIN `t_ruolo_webs` ON `t_ruolo_webs`.`id` = `personas`.`idruoloweb` ' +
                ' JOIN `t_stato_personas` ON `t_stato_personas`.`id` = `personas`.`idStato` '


*/

const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `personas`.*, `t_titolos`.`d_titolo`, `t_stato_personas`.`d_stato_persona`, `t_ruolos`.`d_ruolo`, `t_ruolodays`.`d_ruolo_day`, `userlevels`.`UserLevelName` from `personas` " + 
               " inner join `t_titolos` ON `t_titolos`.`id` = `personas`.`titolo` " +
               " inner join `t_stato_personas` ON `t_stato_personas`.`id` = `personas`.`idStato` " +
               " inner join `t_ruolos` ON `t_ruolos`.`id` = `personas`.`idRuolo` " +
               " inner join `t_ruolodays` ON `t_ruolodays`.`id` = `personas`.`idRuolo_Day` " +
               " inner join `userlevels` ON `userlevels`.`id` = `personas`.`userLevel` "



// ------   ok  nuova modalità di craere strsql  
exports.getAll = (req,res)=> {
 
    let strsql = strSql; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all persone - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le persone ' + result.length);  

            console.log(`rilevate ${result.length} persone `)
            res.status(200).send({ 
                message:'Situazione attuale persone',
                number:  result.length,
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

// lettura singolo persona
// ------   ok  nuova modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `personas`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from personas where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura personas for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura personas for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   persone `)

            res.status(200).send({ 
                message:`situazione attuale per persona id: .....  ${id}`,
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

// creazione nuovo persona   (post)    // ok

exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo persona');  // visualizzo la struttura dei campi immessi dall'persona 
  
      // creo le variabili dai campi di input
      let cognome = req.body.cognome;
      let nome = req.body.nome;
      let photo = '0.jpg';
      let titolo = req.body.titolo;
      let idStato = req.body.idStato;
      let email = req.body.email;
      let idRuolo = req.body.idRuolo;
      let idRuolo_Day = req.body.idRuolo_Day;
      let userLevel = req.body.userLevel;
      let inServizio = req.body.inServizio;
      let utilizzatoCommanda = req.body.utilizzatoCommanda;
      let noteUtente = req.body. noteUtente;
      let key_utenti_operation = req.body.key_utenti_operation;
  
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into personas
                  (cognome,nome,photo,titolo,idStato,email,idRuolo,idRuolo_Day,userLevel,inServizio,utilizzatoCommanda,noteUtente,key_utenti_operation) 
                  valueS
                  (
                     '${cognome}','${nome}','${photo}','${titolo}','${idStato}','${email}','${idRuolo}','${idRuolo_Day}','${userLevel}','${inServizio}','${utilizzatoCommanda}','${noteUtente}','${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova persona su tabella personas ');
              res.status(500).send({
                message: `errore in registrazione nuova persona su tabella personas - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... persona inserita regolarmente `);
          res.status(200).send({
            message: `persona inserita regolarmente`,
            data:result
        });
     });
    
  }
  
  // aggiornamento persona   // metodo 2  -- funziona  // ok

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica persona id ${id}`);  // visualizzo la struttura dei campi immessi dall'persona 

    // definisco la strsql per lettura persona

    let strsql_Inqu = `select * from personas where id= ${id} `;

    // definisco le variabili per aggiornamento campi


    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let photo = req.body.photo;
    let titolo = req.body.titolo;
    let idStato = req.body.idStato;
    let email = req.body.email;
    let idRuolo = req.body.idRuolo;
    let idRuolo_Day = req.body.idRuolo_Day;
    let userLevel = req.body.userLevel;
    let inServizio = req.body.inServizio;
    let utilizzatoCommanda = req.body.utilizzatoCommanda;
    let noteUtente = req.body. noteUtente;
    let key_utenti_operation = req.body.key_utenti_operation;


    let strsql =  `update personas set
                    cognome = '${cognome}',
                    nome = '${nome}',
                    photo = '${photo}',
                    titolo = '${titolo}',
                    idStato = '${idStato}',
                    email = '${email}',
                    idRuolo = '${idRuolo}',
                    idRuolo_Day = '${idRuolo_Day}',
                    userLevel = '${userLevel}',
                    inServizio = '${inServizio}',
                    utilizzatoCommanda = '${utilizzatoCommanda}',
                    noteUtente = '${noteUtente}',
                    key_utenti_operation = '${key_utenti_operation}'
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura personas for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura personas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento persona id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto persona ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato persona id: ${id}`);
                    res.status(200).send({ 
                        message: `persona aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente persona id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

// aggiornamento persona   // metodo 1  -- da sistemare

exports.updateByid1 = (req,res)=> {

    let id = req.params.id;

    console.log(req.body,`Modifica persona id ${id}`);  // visualizzo la struttura dei campi immessi dall'persona 

  // definisco la strsql per lettura persona

    let strsql_Inqu = `select * from personas where id= ${id} `;
    
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
            notepersona: req.body.notepersona,
            id_persone_operation: req.body.id_persone_operation,
          




       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura personas for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura personas for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE personas SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento persona id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto persona ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `persona aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente persona id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione persona   // ok

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione persona id ${id}`);  // visualizzo la struttura dei campi immessi dall'persona 

    // definisco la strsql per lettura persona

    let strsql_Inqu = `select * from personas where id= ${id} `;

    let strsql =  `delete from personas  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura personas for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione persona id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione persona -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `persona  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente persona id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  
// ok
exports.getpersoneforRuolo = (req,res)=> {
 
    console.log('backend -----------------------------  getPersonasforRolo ' + req.params.ruolo);
    
    let ruolo = req.params.ruolo;
    let strsql = '';

    switch (ruolo)  {
        case 'D':
     //       strsql = 'SELECT personas.*, t_ruolos.d_ruolo FROM personas INNER JOIN t_ruolos ON t_ruolos.id = personas.idRuolo WHERE personas.idRuolo > 0 and personas.idRuolo < 99';
            strsql =  strSql + ' where `idRuolo` > 0 and `idRuolo` < 99';  
            break;
        case 'S':
      //      strsql = 'SELECT personas.*, t_ruolos.d_ruolo FROM personas INNER JOIN t_ruolos ON t_ruolos.id = personas.idRuolo WHERE personas.idRuolo = 99';
            strsql =  strSql + ' where `idRuolo` = 99';
            break;
        case 'N':
     //       strsql = 'SELECT personas.*, t_ruolos.d_ruolo FROM personas INNER JOIN t_ruolos ON t_ruolos.id = personas.idRuolo WHERE personas.idRuolo = 0';
            strsql =  strSql + ' where `idRuolo` = 0';
          break;
       }

   // let strsql = 'SELECT personas.*, t_ruolos.d_ruolo FROM personas INNER JOIN t_ruolos ON t_ruolos.id = personas.idRuolo WHERE personas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all personas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti gli persone con ruolo' + result.length);  

            console.log(`rilevate ${result.length} persone `)
            res.status(200).send({ 
                message:'Situazione attuale persone con ruolo',
                number:  result.length,
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

//  ok
exports.getpersoneforRuolo1 = (req,res)=> {

    console.log('backend -----------------------------  getAllpersonasbyruolo1 ' + req.params.ruolo);
    
    let ruolo = req.params.ruolo;
    let strsql = '';

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `idRuolo_Day` = ' + ruolo;  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT personas.*, t_ruolos.d_ruolo FROM personas INNER JOIN t_ruolos ON t_ruolos.id = personas.idRuolo WHERE personas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all personas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti gli persone con ruolo' + result.length);  

            console.log(`rilevate ${result.length} persone `)
            res.status(200).send({ 
                message:'Situazione attuale persone con il ruolo selezionato',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna persona pressente !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });

}


// ok
exports.getpersoneforRuolo2 = (req,res)=> {

    
    console.log('backend -----------------------------  getAllpersonasbyruolo2 --- 1 ---' + req.params.ruolo1);
    console.log('backend -----------------------------  getAllpersonasbyruolo2 --- 2 ---' + req.params.ruolo2);

    let ruolo1 = req.params.ruolo1;
    let ruolo2 = req.params.ruolo2;
    let strsql = '';

    strsql =  strSql + ' where `idRuolo_Day` >= ' + ruolo1 + ' and `idRuolo_Day` <= ' + ruolo2;  
    console.log(`strsql:  ${strsql} `);
  
   // let strsql = 'SELECT personas.*, t_ruolos.d_ruolo FROM personas INNER JOIN t_ruolos ON t_ruolos.id = personas.idRuolo WHERE personas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `55x errore il lettura all personas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('yyy - lettura tutti gli persone con ruolo' + result.length);  

            console.log(`rilevate ${result.length} persone `)
            res.status(200).send({ 
                message:'Situazione attuale persone con ruolo',
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
exports.getpersoneActive = (req,res)=> {

    console.log('backend -----------------------------  getpersoneActive' );

    let inServizio ='S';
    let utilCommanda = 'N';
    let strsql = '';

    strsql =  strSql + " where `inServizio` = '" + inServizio + "' and `utilizzatoCommanda` = '" + utilCommanda + "' ";  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `66x errore il lettura all personas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('zzz - lettura tutti gli persone con ruolo' + result.length);  

            console.log(`rilevate ${result.length} persone `)
            res.status(200).send({ 
                message:'Situazione attuale persone attive',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna persona attiva pressente `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}

// ok
exports.getpersoneforTitolo = (req,res)=> {
    
    let titolo = req.params.titolo;
    let strsql = '';

    console.log('backend -----------------------------  getpersoneforTitolo ' + req.params.titolo);
    
    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `titolo` = ' + titolo;  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT personas.*, t_ruolos.d_ruolo FROM personas INNER JOIN t_ruolos ON t_ruolos.id = personas.idRuolo WHERE personas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all personas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xyz - lettura tutti le persone con titolo' + result.length);  

            console.log(`rilevate ${result.length} persone `)
            res.status(200).send({ 
                message:'Situazione attuale persone con titolo',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna persona presente con il titolo richiesto  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

// ok
exports.getpersoneforStato = (req,res)=> {
  
    let stato = req.params.stato;
    let strsql = '';

    console.log('backend -----------------------------  getpersoneforStato ' + req.params.stato);
    

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `idStato` = ' + stato;  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT personas.*, t_ruolos.d_ruolo FROM personas INNER JOIN t_ruolos ON t_ruolos.id = personas.idRuolo WHERE personas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all personas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('abc - lettura tutti le persone con stato' + result.length);  

            console.log(`rilevate ${result.length} persone `)
            res.status(200).send({ 
                message:'Situazione attuale persone con stato',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna persona presente con lo stato richiesto  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// ok
exports.getpersoneforLivello = (req,res)=> {

    console.log('backend -----------------------------  getpersoneforLivello ' + req.params.livello);
    
    let livello = req.params.livello;
    let strsql = '';

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `userlevel` = ' + livello;  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT personas.*, t_ruolos.d_ruolo FROM personas INNER JOIN t_ruolos ON t_ruolos.id = personas.idRuolo WHERE personas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3xx errore il lettura all personas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('qaz - lettura tutti gli persone con livell' + result.length);  

            console.log(`rilevate ${result.length} persone `)
            res.status(200).send({ 
                message:'Situazione attuale persone con livello',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna persona presente con il livello richiesto !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

// ok
exports.getpersonefLastId = (req,res)=> {

    const strSql = "select `personas`.* from `personas` " + 
               " inner join `t_titolos` ON `t_titolos`.`id` = `personas`.`titolo` " +
               " inner join `t_stato_personas` ON `t_stato_personas`.`id` = `personas`.`idStato` " +
               " inner join `t_ruolos` ON `t_ruolos`.`id` = `personas`.`idRuolo` " +
               " inner join `t_ruolodays` ON `t_ruolodays`.`id` = `personas`.`idRuolo_Day` " +
               " inner join `userlevels` ON `userlevels`.`id` = `personas`.`userLevel` "

    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getpersonefLastId ');
    

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `personas`.`id` < ' + tappo + ' order by `personas`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT personas.*, t_ruolos.d_ruolo FROM personas INNER JOIN t_ruolos ON t_ruolos.id = personas.idRuolo WHERE personas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all personas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('abc - lettura ultimo id' + result.length);  

            console.log(`rilevate ${result.length} persone `)
            res.status(200).send({ 
                message:'Situazione attuale ultimo id',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna persona presente con lo stato richiesto  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}
// ok
exports.azzeraRuoloPersona = (req,res)=> {

    console.log('backend ----------------------------- azzeraRuoloPersona ');

  
    const ruoloReset = 0;
    const fieldreset = 'N';
   
    let idRuolo_Day = ruoloReset;
    let inServizio = fieldreset;
    let utilizzatoCommanda = fieldreset;
  
    let strsql =  `update personas set
                    idRuolo_Day = '${idRuolo_Day}',
                    inServizio = '${inServizio}',
                    utilizzatoCommanda = '${utilizzatoCommanda}'`;
    
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore update all personas for reset ');
            res.status(500).send({
                message: `4 errore update all personas for reset - errore: ${err}`,
                data:null
            });
            return;
        }
         console.log(err,`----- resettato flag per persone attive`);
         res.status(200).send({ 
              message: `resettato flag per persone attive   `,
              rc: 'ok',
              data:result
          });  
        });
}



exports.getpersoneinServizio = (req,res)=> {

    const inServizio = 'S';
  
    let strsql = '';

    console.log('backend ----------------------------- getpersoneinServizio ');
    

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + " where `personas`.`inServizio` = '" + inServizio + "' order by `personas`.`cognome` asc";  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT personas.*, t_ruolos.d_ruolo FROM personas INNER JOIN t_ruolos ON t_ruolos.id = personas.idRuolo WHERE personas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `9824x errore il lettura all personas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('abcxx - lettura ultimo id' + result.length);  

            console.log(`rilevate ${result.length} persone `)
            res.status(200).send({ 
                message:'Situazione attuale persone in serivzio',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna persona in servizio  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}

exports.getpersoneutCommanda = (req,res)=> {

    const utCommanda = 'S';
    
    let strsql = '';

    console.log('backend ----------------------------- getpersoneutCommanda ');
    

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + " where `personas`.`utilizzatoCommanda` = '" + utCommanda + "' order by `personas`.`cognome` asc";  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT personas.*, t_ruolos.d_ruolo FROM personas INNER JOIN t_ruolos ON t_ruolos.id = personas.idRuolo WHERE personas.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `9824x errore il lettura all personas - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('abcxx - lettura ultimo id' + result.length);  

            console.log(`rilevate ${result.length} persone `)
            res.status(200).send({ 
                message:'Situazione attuale persone con utilizzo commanda',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna persona con utilizzo Commanda  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}
