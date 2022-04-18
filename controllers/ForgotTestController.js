// creo i metodi per la gestione dell'utente
const config = require("../config.json");

const crypto = require("crypto");

const db = require('../db');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("generic", salt);

const nodemailer = require('nodemailer');
const sendEmail = require('./../helpers/send-email');

const User = db.user;
const ForgotPass = db.forgotPass;

console.log('forgotTestController - inizio');






exports.resetpassword = (req,res)=> {
        console.log('forgotTest - inizio');
}


