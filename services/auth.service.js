const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");

const sendEmail = require('helpers/send-email');


module.exports = {
      send_gmmailfor_register     // moreno
  };

  //  metodo creato da moreno per inoltro mail in fase di tegistrazione nuovo utente
async function send_gmmailfor_register(sendto,cognome,nome, token) {
    let message;
 
        const confURL = `http://localhost:4200/signupConferme?token=${token}`;
        message = `<p>Buongiorno sig ${cognome} ${nome}</p>
                    <p>abbiamo ricevuto la richiesta di nuova registrazione utente</p>
                    <p>ti preghiamo di cliccare sul link sottostante per rendere operativa la registrazione</p>
                   <p><a href="${confURL}">${confURL}</a></p>
                   
                   <p><button>Conferma</button></p>`;
                   await sendEmail({
                    to: sendto,
                    subject: 'Sign-up Conferma Registrazione nuovo Utente',
                    html: `<h4>Registrazione nuovo utente - Moreno</h4>
                           ${message}`
                });
    }

    

