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
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);   // originale per immagini no in users/products
  router.get("/files/users/:name", controller.downloadusers);
  router.get("/files/products/:name", controller.downloadproducts);
  router.get("/files/personas/:name", controller.downloadpersones);
  router.get("/files/images/:name", controller.downloadimages);
  
  router.get("/files/direttivo/:name", controller.downloaddirettivo);
//  router.get("/carousel/sanfra/:name", controller.downloadcarousel);
module.exports = router;