const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const strSql = "select `msgpopups`.* from `msgpopups` " 

exports.getAll = (req,res)=> {
     
    let strsql = strSql;

    console.log('backend - msgpopups - getall ' + strsql);

    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura all msgpopups - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura tutti i messaggi popups ' + result.length);  

            console.log(`rilevati ${result.length} messaggi `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale messaggi',
                number:  result.length,
                data:result
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessun user presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}


exports.getbyid = (req,res)=> {
 
    let id = req.params.id;
     
    let strsql = strSql + ' where `msgpopups`.`id` = ' + id;

    console.log('backend - Msgpopups - getbyId ' + strsql);
   
    db.query(strsql,(err,result)=> {
        if(err) {
           res.status(500).send({
                message: `3 errore il lettura messaggio popups  - erro: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
            console.log('lettura messaggio popups  by id ' + result.length);  

            console.log(`rilevati ${result.length}  `)
            res.status(200).send({ 
                rc: 'ok',
                message:'Situazione attuale messaggio popups ',
                number:  result.length,
                data:result[0]
            });                    
        }else {
            console.log('nessun record presente ' + result.length); 

            res.status(200).send({ 
                message: `nessuna  presente `,
                rc: 'nf',
                number:  result.length,
                data:null
            });                    
        }

    });
}


exports.delete = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione messaggio popups  id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from msgpopups where id= ${id} `;

    let strsql =  `delete from msgpopups  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `errore in lettura msgpopups for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione  id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione  -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente  id: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna  presente for id: ${id}  -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  
// ok
exports.updateByid = (req,res)=> { 


   // console.log('backend - updateByid - appena entrato: ' + req.params);

    let id = req.params.id;
  
    let strsql_Inqu = `select * from msgpopups where id= ${id}  `;

    console.log(req.body,`Modifica messaggio popups  id ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

   let strsql = '';

    console.log('backend - updatebyid -------- strsql ----------- ' + strsql_Inqu );

   // definisco le variabili per aggiornamento campi
 
   let header = req.body.header;
   let cls = req.body.cls;
   let txt01 = req.body.txt01;
   let txt02 = req.body.txt02;
   let txt03 = req.body.txt03;
   
  

   // verifico prima l'esistenza del record
   console.log('------------------------------------------------ update: ' + strsql);

    db.query(strsql_Inqu,(err,result)=> {  
       if(err) {
           console.log(err,'4 errore il lettura msgpopups  ' + id);
           res.status(500).send({
               message: `4 errore il lettura msgpopups for id ${id} - errore: ${err}`,
               data:null
           });
           return;
       }
       if(result.length>0) {
               let id = result[0].id;
               strsql =  `update msgpopups set
                            header = '${header}',
                            cls = '${cls}',
                            txt01 = '${txt01}',
                            txt02 = '${txt02}',
                            txt03 = '${txt03}',
                            where id = ${id}`;
               db.query(strsql,(err,result) => {    
                   if(err) { 
                       console.log(err,`----- errore in aggiornamento  msgpopup ${id} `);
                       res.status(500).send({ 
                           message: `errore in aggiornamnto msgpopups ${err} --  `,
                           rc: 'ko',
                           data:null
                       });  
                       return;
                   } 
                   console.log(err,`----- aggiornato msgpopups id ${id} `);
                   res.status(200).send({ 
                       message: `messaggio popups aggiornata regolarmente   `,
                       rc: 'ok',
                       data:result
                   });  
                 });  
               }  
               else {
                   console.log(`----- inesistente messaggio popups id ${id} -- aggiornamento non possibile`);
                   res.status(200).send({ 
                       message: `nessun messaggio presente  -- aggiornamento non possibile`,
                       rc: 'nf',
                       data:null
                   });
                   return;
               }
           });  


              } 
     
// ok
exports.createNew = (req,res)=> {
       

    console.log('backend ----------------------------------------------------- - createnew ' + JSON.stringify(req.body));


     // creo le variabili dai campi di input
    let id = req.body.id;
    let header = req.body.header;
    let cls = req.body.cls;
    let txt01 = req.body.txt01;
    let txt02 = req.body.txt02;
    let txt03 = req.body.txt03;
     
 
      let strsql =  `insert into msgpopups
                  (
                    id,header,idGiornata, cls, txt01, txt02, txt03
                  ) 
                  valueS
                  (
                    ${id},'${header}','${cls}', '${txt01}', '${txt02}','${txt03}'
                   )`;
    
                  console.log('backend - ----------- messaggio popups  - create: ' + strsql);
    
      db.query(strsql,(err,result) => {
          if(err) {
              console.log(err,'errore in registrazione nuovo messaggio popups  su tabella msgpopups ');
              res.status(500).send({
                message: `errore in registrazione nuova messaggio popups  su tabella msgpopups - errore: ${err}`,
                rc: 'kk',
                data:null
            });
            return;
          }
          console.log(result, `result ...... messaggio popups  inserito regolarmente `);
          res.status(200).send({
            message: `messaggio popups  inserito regolarmente`,
            rc: 'ok',
            data:result
        });
     });
    
  }
  
  exports.deletebyGiornata = (req,res)=> {  

    let id = req.params.id;

    console.log(req.body,`cancellazione   messaggio ${id}`);  // visualizzo la struttura dei campi immessi dall'utente 

    // definisco la strsql per lettura utente

    let strsql_Inqu = `select * from msgpopups where id= ${id} `;

    let strsql =  `delete from msgpopups  where id = ${id}`;
                    

    // verifico prima l'esistenza del record

     db.query(strsql_Inqu,(err,result)=> {  
        if(err) {
            res.status(500).send({
                message: `deleteAll_Step01 errore in lettura msgpopups for id ${id} - errore: ${err}`,
                data:null
            });
            return;
        }
        if(result.length>0) {
                db.query(strsql,(err,result) => {    
                    if(err) { 
                        console.log(err,`----- errore in cancellazione  id: ${id}`);
                        res.status(500).send({ 
                            message: `errore in cancellazione  per id -- ${err} --  `,
                            rc: 'ko',
                            data:null
                        });  
                        return;
                    } 
                    res.status(200).send({ 
                        message: `  id: ${id} cancellata regolarmente  `,
                        rc: 'ok',
                        data:null
                    }); 
                 });  
                }  
                else {
                    console.log(`----- inesistente  messaggio: ${id} -- cancellazione non possibile`);
                    res.status(200).send({ 
                        message: `nessuna messaggio presente   -- cancellazione non possibile  `,
                        rc: 'nf',
                        data:null
                    });                     
                    return;
                }
            });  

}  
  
