

const db = require('../db');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);





exports.getfuncbyProfilo = (req,res)=> {
    
    let funcUser = '';

    let level = req.params.level;
    let route = req.params.route;
  
    const strsql = "SELECT * " + 
                    "FROM `abilfunctions` " +
                    "JOIN `modulis` ON `modulis`.`id` = `abilfunctions`.`idmodulo` " +
                    "where `abilfunctions`.`idlevel` = " + level + " and `modulis`.`route` =  '" + route + "' ";

 //   SELECT * FROM `abilfunctions` JOIN `modulis` ON `modulis`.`id` = `abilfunctions`.`idmodulo` WHERE `abilfunctions`.`idlevel` = -1 and `modulis`.`route` = 'manif' 



    console.log('backend - getfuncbyProfilo - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${key} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'getfuncbyProfilo - errore il lettura abilfunctions for level ' + level + ' e route ' + route);

            res.status(500).send({
                message: `getfuncbyProfilo - errore il lettura abilfunctions for level ${level} e route ${route}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------     abilitazioni ----->  ${JSON.stringify(result)}` )
            console.log(`normalizzata ----->  ${JSON.stringify(result[0])}` )

            if(result[0].enabledNull === 'N' && result[0].enabledInqu === 'N'  && result[0].enabledEdit === 'N') {
                console.log(`test tutti i campi `);
                res.status(200).send({
                    rc: 'ko',
                    message: `Visualizzazione non abilitata da Amministratore`,
                    number:  result.length,
                    funcUser: 'Da Valorizzare',
                    data:'Da Valorizzare'
                });
                return;
            }
            if(result[0].enabledNull === 'Y') {
                console.log(`test Null `);
                res.status(200).send({
                    rc: 'ko',
                    message: `Visualizzazione non abilitata da Amministratore`,
                    number:  result.length,
                    funcUser: 'Null',
                    data:'Null'
                });
                return;
            }   
            if(result[0].enabledNull === 'N' && result[0].enabledInqu === 'Y') {
                console.log(`test Inqu `);
                funcUser = 'Inqu';
            }
            if(result[0].enabledNull === 'N' && result[0].enabledEdit === 'Y') {
                console.log(`test Edit `);
                funcUser = 'Edit';
                if(level == -1) {
                    funcUser = 'Edits';
                }
            }
            res.status(200).send({ 
                rc: 'ok',
                message:`situazione attuale abilitazioni per profilo selezionato`,
                number:  result.length,
                data:funcUser
            });                    
        }else {
            console.log(`nessun record presente per id: ${level} -- ${route} `);
            res.status(200).send({
                rc: 'ko',
                message: `nessuna abilitazione presente per il profilo selezionato !!!`,
                number:  result.length,
                func:null
            });
        }

    }); 
    
}

// vecchio modulo di lettura per elenco - manca rc
exports.getfuncbyProfiloOld = (req,res)=> {
    

    let funcUser = '';

    let level = req.params.level;
    let modulo = req.params.modulo;
  
    const strsql = "SELECT * " + 
                    "FROM `abilfunctions` " +
                    "JOIN `modulis` ON `modulis`.`id` = `abilfunctions`.`idmodulo` " +
                    "where `abilfunctions`.`idlevel` = " + level + " and `modulis`.`modulo` =  '" + modulo + "' ";

 //   SELECT * FROM `abilfunctions` JOIN `modulis` ON `modulis`.`id` = `abilfunctions`.`idmodulo` WHERE `abilfunctions`.`idlevel` = -1 and `modulis`.`route` = 'manif' 



    console.log('backend - getfuncbyProfilo - strsql --> ' + strsql);
  
   // let strsql = `select * from users where id= ${key} `;    originale

    db.query(strsql,(err,result)=> {
        if(err) {
            console.log(err,'getfuncbyProfilo - errore il lettura abilfunctions for level ' + level + ' e rotta ' + rotta);

            res.status(500).send({
                message: `getfuncbyProfilo - errore il lettura abilfunctions for level ${level} e rotta ${rotta}- errore: ${err}`,
                data:null
            });
            return;
        }
        
        if(result.length>0) {
            console.log(`rilevate ${result.length}  ------------     abilitazioni ----->  ${JSON.stringify(result)}` )
            console.log(`normalizzata ----->  ${JSON.stringify(result[0])}` )

            if(result[0].enabledNull === 'N' && result[0].enabledInqu === 'N'  && result[0].enabledEdit === 'N') {
                console.log(`test tutti i campi `);
                funcUser = 'Da Valorizzare';
            }

            if(result[0].enabledNull === 'N' && result[0].enabledInqu === 'Y') {
                console.log(`test Inqu `);
                funcUser = 'Inqu';
            }
            if(result[0].enabledNull === 'N' && result[0].enabledEdit === 'Y') {
                console.log(`test Edit `);
                funcUser = 'Edit';
                if(level == -1) {
                    funcUser = 'Edits';
                }
            }
            if(result[0].enabledNull === 'Y') {
                console.log(`test Null `);
                funcUser = 'Null';
            }
            res.status(200).send({ 
                message:`situazione attuale abilitazioni per profilo selezionato`,
                number:  result.length,
                data:funcUser
            });                    
        }else {
            console.log(`nessun record presente per id: ${level} -- ${rotta} `);
            res.status(200).send({
                message: `nessuna abilitazione presente per il profilo selezionato`,
                number:  result.length,
                func:null
            });
        }

    }); 
    
}



exports.getfuncbyProfiloDetail = (req,res)=> {

        let funcUser = '';
        let funcenabled = false;

        let functionUrlUp =  '';   
        let functionUserUp = '';


// variabili per la gestione permessi della rotta in funzione del level

        let level = req.params.level;
    
        let route = req.params.route;
        let functionUrl = req.params.funcrotta;

        const strsql = "SELECT * " + 
                        "FROM `abilfunctions` " +
                        "JOIN `modulis` ON `modulis`.`id` = `abilfunctions`.`idmodulo` " +
                        "where `abilfunctions`.`idlevel` = " + level + " and `modulis`.`route` =  '" + route + "' ";

                        console.log('backend - getfuncbyProfiloDetail - strsql --> ' + strsql);
  
                        // let strsql = `select * from users where id= ${key} `;    originale
                     
            db.query(strsql,(err,result)=> {
                    if(err) {
                                 console.log(err,'getfuncbyProfiloFull - errore il lettura abilfunctions for level ' + level + ' e rotta ' + modulo);
                     
                                 res.status(500).send({
                                     rc: 'ko',
                                     message: `getfuncbyProfiloFull - errore il lettura abilfunctions for level ${level} e rotta ${rotta}- errore: ${err}`,
                                     data:null
                                 });
                                 return;
                      }
                             
                     if(result.length>0) {
                                 console.log(`rilevate ${result.length}  ------------     abilitazioni ----->  ${JSON.stringify(result)}` )
                                 console.log(`normalizzata ----->  ${JSON.stringify(result[0])}` )
                     
                                 if(result[0].enabledNull === 'N' && result[0].enabledInqu === 'N'  && result[0].enabledEdit === 'N') {
                                     console.log(`test tutti i campi `);
                                     res.status(200).send({
                                        rc: 'ko',
                                        message: `Modulo non ancora abilitation da Amministratore`,
                                        funcUser: 'Da Valorizzare',
                                        number:  result.length,
                                        data:'Null'
                                    });
                                    return;
                                 }
                                 if(result[0].enabledNull === 'Y') {
                                    console.log(`test Null `);
                                    res.status(200).send({
                                        rc: 'ko',
                                        message: `Visualizzazione non abilitata da Amministratore`,
                                        number:  result.length,
                                        funcUser: 'Null',
                                        data:'Null'
                                    });
                                    return;
                                }
  
                                funcenabled = false;
                     
                                 if(result[0].enabledNull === 'N' && result[0].enabledInqu === 'Y') {
                                     console.log(`test Inqu `);
                                     funcUser = 'Inqu';
                                     funcenabled = true;
                                 }
                                 if(result[0].enabledNull === 'N' && result[0].enabledEdit === 'Y') {
                                     console.log(`test Edit `);
                                     funcenabled = true;
                                     funcUser =  'Edit';
                                     if(level == -1) {
                                         funcUser = 'Edits';
                                         console.log(`test Edits `);
                                     }
                                     if(funcUser === 'Edits'  || funcUser === 'Edit') {
                                        if(functionUrl === 'new')  {
                                            funcUser = 'New'
                                        }
                                      }
                                 }
                                if(funcenabled === false) {
                                    res.status(200).send({
                                        rc: 'ko',
                                        message: `manca Autorizzazione - rivolgersi a Amministratore`,
                                        number:  result.length,
                                        funcUser: 'Null',
                                        data:'Null'
                                    });
                                    return;  
                                }

                                functionUrlUp =  req.params.funcrotta.toUpperCase();   
                                functionUserUp = funcUser.toUpperCase();

                                if(functionUrlUp !== functionUserUp) {
                                    if(functionUrl !== 'edit' && functionUrl !== 'edits' && functionUrl !== 'new') {
                                        res.status(200).send({
                                            rc: 'ko',
                                            message: `Funzione richiesta non autorizzata - profilo insufficiente - rivolgersi a Amministratore`,
                                            number:  result.length,
                                            funcUser: 'Null',
                                            data:'Null'
                                        });
                                        return;  
                                    }
                                }
                                console.log(`passato test xyz `);
//  funzione abilitata
                
                                 res.status(200).send({ 
                                     rc: 'ok',
                                     message:`situazione attuale abilitazioni per profilo selezionato`,
                                     number:  result.length,
                                     data:funcUser
                                 });                    
                             }else {
                                 console.log(`nessun record presente per id: ${level} -- ${route} `);
                                 res.status(200).send({
                                     rc: 'ko',
                                     message: `nessuna abilitazione presente per il profilo selezionato`,
                                     number:  result.length,
                                     func:null
                                 });
                             }
                     
                });

    }


