const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


const strSql = "select `prodottos`.*, `t_categoria_prodottos`.`d_categoria`,`t_tipologias`.`d_tipologia`, `t_competenza_prodottos`.`d_Competenza`, `t_stato_prodottos`.`d_stato_prodotto` from `prodottos` " + 
               " inner join `t_tipologias` ON `t_tipologias`.`id` = `prodottos`.`tipologia` " +
               " inner join `t_stato_prodottos` ON `t_stato_prodottos`.`id` = `prodottos`.`stato` " +
               " inner join `t_categoria_prodottos` ON `t_categoria_prodottos`.`id` = `prodottos`.`categoria` " +
               " inner join `t_competenza_prodottos` ON `t_competenza_prodottos`.`id` = `prodottos`.`competenza` " 

const order = " order by `prodottos`.`tipologia`  asc, `prodottos`.`competenza` asc, `prodottos`.`categoria` asc  ";

// ------  ok 
exports.getAll = (req,res)=> {
 
    let strsql = strSql  + order; 
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
            res.status(200).send({ 
                message:'Situazione attuale prodotti',
                number:  result.length,
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

// lettura singolo prodotto
// ------   ok  nuovo modalità di craere strsql  
exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `prodottos`.`id` = ' + id;

    console.log('backend - prodottoController ----------------------------------> getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from prodottos where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura prodottos for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura prodottos for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevati ${result.length}  ------------------------   prodotti `)

            res.status(200).send({ 
                message:`situazione attuale per prodotto id: .....  ${id}`,
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

// creazione nuovo prodotto   (post)    
// ok 
exports.createNew = (req,res)=> {
    
    //  console.log(req.body,'Creazione nuovo prodotto');  // visualizzo la struttura dei campi immessi dall'prodotto 
  
      // creo le variabili dai campi di input
      let descrizione = req.body.descrizione;
      let tipologia = req.body.tipologia;
      let categoria = req.body.categoria;
      let competenza = req.body.competenza;
      let disponibile = req.body.disponibile;
      let scorta_minima = req.body.scorta_minima;
      let prezzo = req.body.prezzo;
      let photo = req.body.photo;
      let key_utenti_operation = req.body.key_utenti_operation;
 
  /*
      Attenzione:
          trovare modalità di controllo se record già inserito
          - per id con Incremento automatico fare select su un campo unico
          - per id inserito manualmente fare una select con where = id e abilitare insert se non trovato
  
  
  
  */
  
      let strsql =  `insert into prodottos
                  (descrizione,tipologia,categoria,competenza,disponibile,scorta_minima,prezzo,photo,key_utenti_operation) 
                  valueS
                  (
                     '${descrizione}',${tipologia},${categoria},${competenza},${disponibile},${scorta_minima},${prezzo},'${photo}',${key_utenti_operation}' 
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo prodotto su tabella prodottos ');
              res.status(500).send({
                message: `errore in registrazione nuovo prodotto su tabella prodottos - errore: ${err}`,
                rc: 'ko',
                data:null
            });
            return;
          }
          console.log(result, `result ...... prodotto inserito regolarmente `);
          res.status(200).send({
            message: `prodotto inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  // aggiornamento prodotto   
  // ok
  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica prodotto id ${id}`);  // visualizzo la struttura dei campi immessi dall'prodotto 

    // definisco la strsql per lettura prodotto

    let strsql_Inqu = `select * from prodottos where id= ${id} `;

    // definisco le variabili per aggiornamento campi


    let descrizione = req.body.descrizione;
    let tipologia = req.body.tipologia;
    let aMenu = req.body.aMenu;
    let categoria = req.body.categoria;
    let competenza = req.body.competenza;
    let disponibile_Day = req.body.disponibile_Day;
    let prezzo_day = req.body.prezzo_day;
    let disponibile = req.body.disponibile;
    let scorta_minima = req.body.scorta_minima;
    let prezzo = req.body.prezzo;
    let photo = req.body.photo;
    let qta_vendute = req.body.qta_vendute;
    let residuo = req.body.residuo;
    let selectedDay = req.body.selectedDay;
    let key_utenti_operation = req.body.key_utenti_operation;

    let strsql =  `update prodottos set
                    descrizione = '${descrizione}',
                    aMenu = '${aMenu}',
                    tipologia = ${tipologia},
                    categoria = ${categoria},
                    competenza = ${competenza},
                    disponibile = ${disponibile},
                    scorta_minima = ${scorta_minima},
                    prezzo = ${prezzo},
                    disponibile_Day = ${disponibile_Day},
                    prezzo_day = ${prezzo_day},
                    qta_vendute = ${qta_vendute},
                    residuo = ${residuo},
                    photo = '${photo}',
                    selectedDay = '${selectedDay}',
                    key_utenti_operation = ${key_utenti_operation}
                    where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prodottos for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura prodottos for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,` ----- errore in aggiornamento prodotto id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto prodotto ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(`----- aggiornato prodotto id: ${id}`);
                    res.status(200).send({ 
                        message: `prodotto aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente prodotto id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
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

    console.log(req.body,`Modifica prodotto id ${id}`);  // visualizzo la struttura dei campi immessi dall'prodotto 

  // definisco la strsql per lettura prodotto

    let strsql_Inqu = `select * from prodottos where id= ${id} `;
    
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
            noteprodotto: req.body.noteprodotto,
            id_prodotti_operation: req.body.id_prodotti_operation,
          




       }

 db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({ 
                message: `5 errore il lettura prodottos for id $${err} --  `,
                rc: 'ko',
                data:null
            });  
            return;



            console.log(err,'5 errore il lettura prodottos for id ' + id);
            return;
        }
        if(result.length>0) {
                  db.query('UPDATE prodottos SET ? WHERE id = ' + req.params.id, usernew,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento prodotto id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto prodotto ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    }
                    res.status(200).send({ 
                        message: `prodotto aggiornato regolarmente ...   ok per  id: ${id} -- `,
                        rc: 'ok',
                        data:result
                    }); 
                  });  
                }  
                else {
                    console.log(`----- inesistente prodotto id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    }); 
                   return;
                }
            });  

}

// cancellazione prodotto   
// ok
exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione prodotto id ${id}`);  // visualizzo la struttura dei campi immessi dall'prodotto 

    // definisco la strsql per lettura prodotto

    let strsql_Inqu = `select * from prodottos where id= ${id} `;

    let strsql =  `delete from prodottos  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prodottos for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione prodotto id: ${id}`);
                        res.status(500).send({ 
                            message: `${err} `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `prodotto  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente prodotto id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  

// OK
exports.getProdottiforMenu = (req,res)=> {
 
    console.log('backend -----------------------------  getprodottosforMenu ' + req.params.menu);
    
    let menu = req.params.menu;
    let strsql = '';

    strsql =  strSql + " where `prodottos`.`aMenu` = '" + menu + "' "  + order; 

    console.log('getProdottiforMenu - strsql: ' + strsql);

   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura  prodottos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti  prodotti con selezione menu -- N.ro ' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti con selezione menu: ' + menu,
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun prodotto presente `,
                rc: 'nf',
                number:  0,
                data:null
            });                    
        }

    });
}

exports.getProdottimenuforCompetenza = (req,res)=> {
 
    console.log('backend -----------------------------  getprodottosforMenu ' + req.params.menu);
    
    let menu = req.params.menu;
    let comp = req.params.comp;
    let strsql = '';

    strsql =  strSql + " where `prodottos`.`aMenu` = '" + menu + "' and `prodottos`.`competenza` = " + comp  + order; 

    console.log('getProdottimenuforCompetenza - strsql: ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura  prodottos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti  prodotti con selezione menu per competenza -- N.ro ' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti per competenza e con selezione menu: ' + menu,
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun prodotto presente `,
                rc: 'nf',
                number:  0,
                data:null
            });                    
        }

    });
}




// ok
exports.getProdottiforTipologia = (req,res)=> {

    let tipo = req.params.tipo;
    let strsql = '';

    console.log('backend -----------------------------  getProdottiforTipologia ' + req.params.tipo);
    
    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `prodottos`.`tipologia` = ' + tipo +  order;;  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prodottos  per tipologia - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti i prodotti per tipologia ' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti per tipologia ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prodotto pressente !! `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });

}

// recuper prodotti per tipologia con qta a zero
exports.getProdottiforTipologia1= (req,res)=> {
     
    let tipo = req.params.tipo;
    let notSelectedDay = 'N';
    let strsql = '';

    console.log('backend -----------------------------  getProdottiforTipologia1 ' + req.params.tipo);
   
    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + " where `prodottos`.`tipologia` = " + tipo  + " and `prodottos`.`selectedDay` =  '" + notSelectedDay + "' " +  order;;  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prodottos  per tipologia - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti i prodotti per tipologia ' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti per tipologia ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prodotto pressente !! `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });

}
// ok
exports.getProdottiforCategoria = (req,res)=> {

    let categ = req.params.categ;
    let strsql = '';
    
    console.log('backend -----------------------------  getProdottiforCategoria ' + req.params.categ);
    
  
    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `prodottos`.`categoria` = ' + categ +  order;;  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prodottos  per categoria - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xxx - lettura tutti i prodotti per categoria ' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti per categoria ',
                rc: 'ok',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prodotto presente !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}
// ok
exports.getProdottiforCompetenza = (req,res)=> {
    
    let comp = req.params.comp;
    let strsql = '';

    console.log('backend -----------------------------  getprodottiforTitolo ' + req.params.titolo);
    
    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `prodottos`.`competenza` = ' + comp +  order;;  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3x errore il lettura all prodottos per competenza - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('xyz - lettura tutti le prodotti per competenza' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti per competenza',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prodotto presente per la competenza richiesta  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });

}

// ok
exports.getProdottiforStato = (req,res)=> {
  
    let stato = req.params.stato;
    let strsql = '';

    console.log('backend -----------------------------  getprodottiforStato ' + req.params.stato);
    

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
   
    strsql =  strSql + ' where `prodottos`.`stato` = ' + stato +  order;;   
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all prodottos  for stato- erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('abc - lettura tutti le prodotti con stato' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti con stato',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prodotto presente con lo stato richiesto  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getprodottiActive = (req,res)=> {

    console.log('backend -----------------------------  getprodottiActive' );

    let inServizio ='S';
    let utilCommanda = 'N';
    let strsql = '';

    strsql =  strSql + " where `inServizio` = '" + inServizio + "' and `utilizzatoCommanda` = '" + utilCommanda + "' ";  
    console.log(`strsql:  ${strsql} `);
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `66x errore il lettura all prodottos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('zzz - lettura tutti gli prodotti con ruolo' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti attive',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prodotto attiva pressente `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}

exports.getprodottiforLivello = (req,res)=> {

    console.log('backend -----------------------------  getprodottiforLivello ' + req.params.livello);
    
    let livello = req.params.livello;
    let strsql = '';

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `userlevel` = ' + livello;  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3xx errore il lettura all prodottos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('qaz - lettura tutti gli prodotti con livell' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale prodotti con livello',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prodotto presente con il livello richiesto !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getProdottoLastId = (req,res)=> {

    const strSql = "select `prodottos`.* from `prodottos` " + 
                    " inner join `t_tipologias` ON `t_tipologias`.`id` = `prodottos`.`tipologia` " +
                    " inner join `t_stato_prodottos` ON `t_stato_prodottos`.`id` = `prodottos`.`stato` " +
                    " inner join `t_categoria_prodottos` ON `t_categoria_prodottos`.`id` = `prodottos`.`categoria` " +
                    " inner join `t_competenza_prodottos` ON `t_competenza_prodottos`.`id` = `prodottos`.`competenza` " 


    let tappo = 9999;
    let strsql = '';

    console.log('backend ----------------------------- getProdottoLastId ');
    

    // strsql =  strSql + ' where `idRuolo_Day` > 0 and `idRuolo_Day` < ' + ruolo;     come da laravel -- controllare
    strsql =  strSql + ' where `prodottos`.`id` < ' + tappo + ' order by `prodottos`.`id` desc';  
    console.log(`strsql:  ${strsql} `);
   // let strsql = 'SELECT prodottos.*, t_ruolos.d_ruolo FROM prodottos INNER JOIN t_ruolos ON t_ruolos.id = prodottos.idRuolo WHERE prodottos.idRuolo > 0 ';
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `553x errore il lettura all prodottos - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('abc - lettura ultimo id' + result.length);  

            console.log(`rilevati ${result.length} prodotti `)
            res.status(200).send({ 
                message:'Situazione attuale ultimo id',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prodotto presente con lo stato richiesto  !! `,
                rc: 'nf',
                data:null
            });                    
        }

    });


}

// ok
exports.resettaamenu = (req,res)=> {

    console.log('backend ----------------------------- resettaamenu ');
    
    const fieldreset = '*';
     
    let strsql =  `update prodottos set
                    aMenu = '${fieldreset}'`;
    
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore update all aMenu prodottos for reset ');
            res.status(500).send({
                message: `4 errore update all aMenu for reset - errore: ${err}`,
                data:null
            });
            return;
        }
         console.log(err,`----- resettato flag aMenu per prodotti`);
         res.status(200).send({ 
              message: `resettato flag aMenu per prodotti   `,
              rc: 'ok',
              data:result
          });  
        });
}


exports.resettaselectedDay = (req,res)=> {

    console.log('backend ----------------------------- resettaselectedDay ');
    
    const fieldreset = 'N';
     
    let strsql =  `update prodottos set
                    selectedDay = '${fieldreset}'`;
    
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore update all selectedDay prodottos for reset ');
            res.status(500).send({
                message: `4 errore update all selectedDay for reset - errore: ${err}`,
                data:null
            });
            return;
        }
         console.log(err,`----- resettato flag selectedDay per prodotti`);
         res.status(200).send({ 
              message: `resettato flag selectedDay per prodotti   `,
              rc: 'ok',
              data:result
          });  
        });
}
