const db = require('../db');

const strSql = 'select `prenotazioneprods`.*, `prodottos`.*  from  `prenotazioneprods ' +  
               ' from  prenotazioneprods  ' + 
               ' inner join prodottos ON prodottos.id = prenotazioneprods.idProdotto '; 
const order =  ' order by prodottos.tipologia, prodottos.tipologia, prodottos.deascrizione desc';

// ------   ok  nuova modalità di craere strsql  
exports.getAll = (req,res)=> {
 
    let strsql = strSql; 
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all prenotazioniprod  - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutte le prenotazioniprod  ' + result.length);  

            console.log(`rilevate ${result.length} prenotazioniprod  `)
            res.status(200).send({ 
                message:'Situazione attuale prenotazioniprod ',
                number:  result.length,
                rc: 'ok',
                data:result
            });                    
        }else {
            console.log('nessuna prenotazioniprod presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna prenotazioniprod presente `,
                rc: 'nf',
                data:null
            });                    
        }

    });
}

exports.getbyid = (req,res)=> {
    
    let id = req.params.id;
      
    const strsql = strSql + ' where `prenotazioneprods`.`id` = ' + id;

    console.log('backend - getbyid - strsql --> ' + strsql);
  
   // let strsql = `select * from prenotazioneprods where id= ${id} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'2 errore il lettura prenotazioniprod  for id ' + id);

            res.status(500).send({
                message: `2 errore il lettura prenotazioniprod  for id ${id}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------------------   prenotazioniprod  `)

            res.status(200).send({ 
                message:`situazione attuale per prenotazioniprod  id: .....  ${id}`,
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
    
      console.log(req.body,'Creazione nuovo prenotazioniprod ');  // visualizzo la struttura dei campi immessi dall'prenotazioniprod  
  
      // creo le variabili dai campi di input
 
    
      let idprenot = req.body.idprenot;
      let idProdotto = req.body.idProdotto;
      let qta = req.body.qta;
      let descrizione = req.body.descrizione;
      let tipologia = req.body.tipologia;
      let categoria = req.body.categoria;
      let competenza  = req.body.competenza;
      let prezzo = req.body.prezzo;
      let photo = req.body.photo;
         
      let strsql =  `insert into prenotazioneprods
                  (idprenot,idProdotto,qta,descrizione,tipologia,categoria,competenza,prezzo,photo) 
                  valueS
                  (
                    ${idprenot},${idProdotto},${qta},UPPER('${descrizione}'),${tipologia},${categoria},${competenza},${prezzo},'${photo}'
                  )`;
      console.log('pronto per fare insert di prenotazioneprod ' + strsql)
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuova prenotazioniprod  su tabella prenotazioneprods ');
              res.status(500).send({
                message: `errore in registrazione nuova prenotazioniprod  su tabella prenotazioneprods - errore: ${err}`,
                data:null
            });
            return;
          }
          console.log(result, `result ...... prenotazioniprod  inserita regolarmente `);
          res.status(200).send({
            message: `prenotazioniprod  inserita regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }

  exports.updateByid = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`Modifica prenotazioniprod  id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazioniprod  

    // definisco la strsql per lettura prenotazioniprod 

    let strsql_Inqu = `select * from prenotazioneprods where id= ${id} `;

    // definisco le variabili per aggiornamento campi
   
      let idprenot = req.body.idprenot;
      let idProdotto = req.body.idProdotto;
      let qta = req.body.qta;
      let descrizione = req.body.descrizione;
      let tipologia = req.body.tipologia;
      let categoria = req.body.categoria;
      let competenza  = req.body.competenza;
      let prezzo = req.body.prezzo;
      let photo = req.body.photo;

      let strsql =  `update prenotazioneprods set
                     idprenot = ${idprenot},
                     idProdotto = ${idProdotto},
                     qta = ${qta},
                     descrizione = UPPER('${descrizione}')
                     tipologia = ${tipologia},
                     categoria = ${categoria},
                     competenza = ${competenza},
                     prezzo = ${prezzo},
                     photo = '${photo}'
                        where id = ${id}`;

    // verifico prima l'esistenza del record
    console.log('------------------------------------------------ update: ' + strsql);

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            console.log(err,'4 errore il lettura prenotazioneprods for id ' + id);
            res.status(500).send({
                message: `4 errore il lettura prenotazioneprods for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in aggiornamento prenotazioniprod  id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in aggiornamnto prenotazioniprod  ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    console.log(err,`----- aggiornato prenotazioniprod  id: ${id}`);
                    res.status(200).send({ 
                        message: `prenotazioniprod  aggiornato regolarmente   `,
                        rc: 'ok',
                        data:result
                    });  
                  });  
                }  
                else {
                    console.log(`----- inesistente prenotazioniprod  id: ${id} -- aggiornamento non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- aggiornamento non possibile`,
                        rc: 'nf',
                        data:null
                    });
                    return;
                }
            });  

}  

exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione prenotazioniprod  id ${id}`);  // visualizzo la struttura dei campi immessi dall'prenotazioniprod  

    // definisco la strsql per lettura prenotazioniprod 

    let strsql_Inqu = `select * from prenotazioneprods where id= ${id} `;

    let strsql =  `delete from prenotazioneprods  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura prenotazioneprods for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione prenotazioniprod  id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione prenotazioniprod  -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `prenotazioniprod   id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente prenotazioniprod  id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessun user pressente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  
