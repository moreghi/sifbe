const db = require('../db');

const strSql = 'select `prenotazioneprodworks`.*, `prodottos`.*  from  `prenotazioneprodworks ' +  
               ' from  prenotazioneprodworks  ' + 
               ' inner join prodottos ON prodottos.id = prenotazioneprodworks.idProdotto '; 
const order =  ' order by prodottos.tipologia, prodottos.tipologia, prodottos.deascrizione desc';

// ------   ok  nuova modalità di craere strsql  
exports.getAll = (req,res)=> {
 
    let strsql = strSql; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore in lettura all prenotazioniprodworks  - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le prenotazioniprodwork  ' + result.length);  

            console.log(`rilevate ${result.length} prenotazioniprodwork `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioniprodwork',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna prenotazioniprodwork presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazioniprodwork presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `prenotazioneprodworks`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from prenotazioneprods where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura prenotazioniprodwork for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura prenotazioniprodwork for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   prenotazioniprodwork `)

            res.status(200).send({ 
                message:`situazione attuale per prenotazioniprodwork  id: .....  ${id}`,
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

exports.createNew = (req,res)=> {
    
    const strsql1 ="SELECT * FROM `prenotazioneprodworks` WHERE id < 99999 ORDER BY id DESC;";
  
      // creo le variabili dai campi di input
 
    
      let idPrenotazione = req.body.idPrenotazione;
      let idProdotto = req.body.idProdotto;
          

      console.log(req.body,'-------------------   Creazione nuovo prenotazioniprodwork ' + JSON.stringify(req.body));  // visualizzo la struttura dei campi immessi dall'prenotazioniprod evento 
    
      let strsql =  `insert into prenotazioneprodworks
                  (idPrenotazione,idProdotto) 
                  valueS
                  (
                    ${idPrenotazione},${idProdotto}
                  )`;
      

      db.query(strsql,(err,result) => {
         if(err) {
            console.log(err,'errore in registrazione nuova prenotazioneprodworks  ');
            res.status(500).send({
              message: `errore in registrazione nuova prenotazioneprodworks  - errore: ${err}`,
              data:null
           });
           return;
         }
            
         db.query(strsql1,(err,result) => {
           if(err) {
                        console.log(err,'errore in lettura ultima prenotazioneprodworks ');
                        res.status(500).send({
                        message: `errore in lettura ultima prenotazioneprodworks - errore: ${err}`,
                        rc: 'kk',
                        data:null
             });
             return;
           }
           res.status(200).send({
                message: `prenotazioneprodworks inserita regolarmente`,
                rc: 'ok',
                data:result[0],
                lastnumber:result[0].id 
           });
       });
   });




/*
      let strsql =  `insert into prenotazioneprodworks
                  (idPrenotazione,idProdotto) 
                  valueS
                  (
                    ${idPrenotazione},${idProdotto}
                  )`;
      
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova prenotazioniprodwork su tabella prenotazioneprodworks ');
              res.status(500).send({
                message: `errore in registrazione nuova prenotazioniprodwork su tabella prenotazioneprodworks - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... prenotazioniprodwork inserita regolarmente `);
          res.status(200).send({
            message: `prenotazioniprodwork inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    */

  }

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica prenotazioniprodwork id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazioniprod evento 

    // definisco la strsql per lettura prenotazioniprod evento

    let strsql_Inqu = `select * from prenotazioneprodworks where id= ${id} `;

    // definisco le variabili per aggiornamento campi
   
    let idPrenotazione = req.body.idPrenotazione;
    let idProdotto = req.body.idProdotto;
    let qta = req.body.qta;

      let strsql =  `update prenotazioneprodworks set
                     idPrenotazione = ${idPrenotazione},
                     idProdotto = ${idProdotto},
                     qta = ${qta},
                        where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prenotazioneprodworks for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura prenotazioneprodswork for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento prenotazioniprodwork id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto prenotazioniprodwork ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato prenotazioniprodwork id: ${id}`);
                    res.status(200).send({ 
                        message: `prenotazioniprodwork aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente prenotazioniprodwork id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun prenotazioniprodwork presente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione prenotazioniprodwork id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazioniprod evento 

    // definisco la strsql per lettura prenotazioniprod evento

    let strsql_Inqu = `select * from prenotazioneprodworks where id= ${id} `;

    let strsql =  `delete from prenotazioneprodworks  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazioneprodworks for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione prenotazioniprodwork id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione prenotazioniprodwork -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `prenotazioniprodwork  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente prenotazioniprodwork id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun prenotazioniprodwork presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  
