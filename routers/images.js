const express = require("express");
const router = express.Router();
const controller = require("../controllers/fileController");

/*
let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

  app.use(router);
};
*/

  console.log('imagesController ----    prima di rotte');
 
      
  // router.post("/", controller.upload);  // originalr
  router.post("/folder/:folder", controller.upload);
  router.post("/folder/locandina/:folder", controller.uploadlocandina);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);   // originale per immagini no in users/products
  router.get("/files/users/:name", controller.downloadusers);
  router.get("/files/eventos/logistica/:name", controller.downloadeventos);
  router.get("/files/eventos_locandina/:name", controller.downloadevlocandina);
  router.get("/files/manifestaziones/:name", controller.downloadmaniflocandina); 
  router.get("/files/images/:name", controller.downloadimages);
  router.get("/files/jumbotron/:name", controller.downloadjumbotron);
 
  router.get("/files/generic/:name", controller.downloadgeneric);
  router.get("/files/prodotti/:name", controller.downloadprodotto);  // per gestire i prodotti nella commanda

  //router.get("/files/comunicazionis/:name", controller.downfilecomunicazioni);
  router.get("/files/comunicazioni/:dirc1/:dirc2/:name", controller.downfilecomunicazioni)
  
 
module.exports = router;