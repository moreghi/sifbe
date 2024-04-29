const express = require("express");
const router = express.Router();
const controller = require("../controllers/filepdfController");


  console.log('imagesController ----    prima di rotte');

      
 // da afre per salvare il pdf

//  router.post("/folder/filespdf/:folder", controller.uploadfilepdf);
router.get("/file/:name", controller.downloadpdf);
 
module.exports = router;