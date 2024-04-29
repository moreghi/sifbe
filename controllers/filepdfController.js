const uploadFile = require("../middleware/upload");
const fs = require('fs');
const baseUrl =        "http://localhost:3001/files/";   // backend in locale su localhost
// const baseUrl = "https://api.ghisellinimoreno.it/files/";   // backend su aws bandieragialla


console.log('filepdfController -------  inizio');

// uploadlocandina ---  salvo i file delle locandine

uploadpdf = async (req, res) => {
  
  try {
    
    await uploadFile(req, res);

    console.log('filepdfController -- UploadPdf -- file: ' + JSON.stringify(req.file));
 
    if (req.file == undefined) {
      return res.status(400).send({ messageupload: "Please upload a file!" });
    }

    res.status(200).send({
      messageupload: "il file è stato salvato con successo " + req.file.originalname,
      rc: 'ok'
    });

    console.log('filepdfController -----------> uploadpdf concluso con successo ');
 

  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        messageupload: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      messageupload: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

downloadpdf = (req, res) => {

    console.log('filepdfControllerv --- downloadpdf ' + req.params.name)
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/documents/";
  
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          messageupload: "Could not download the file. " + err,
        });
      }
    });
  };


/*

upload = async (req, res) => {
  
    try {
      
      await uploadFile(req, res);
  
      console.log('fileController -- Upload -- file: ' + JSON.stringify(req.file));
   
      if (req.file == undefined) {
        return res.status(400).send({ messageupload: "Please upload a file!" });
      }
  
      res.status(200).send({
        messageupload: "Uploaded the file successfully: " + req.file.originalname,
        rc: 'ok'
      });
  
      console.log('fileController -----------> Upload concluso con successo ');
   
  
    } catch (err) {
      console.log(err);
  
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          messageupload: "File size cannot be larger than 2MB!",
        });
      }
  
      res.status(500).send({
        messageupload: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  };

getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  console.log('backend --- filecontroller --- getlistfiles ------------- ' + directoryPath);

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        messageupload: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    console.log('backend --- filecontroller --- getlistfiles ----  finita la creazione dei file salvati --------- ');
    res.status(200).send(fileInfos);
  });
};

download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Could not download the file. " + err,
      });
    }
  });
};

downloadusers = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/users/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Could not download the file. " + err,
      });
    }
  });
};

downloadcarousel = (req, res) => {

  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/carousel/";


  console.log('----------- 1  ---------------------------------------     bkend - downloaddirettivo ' + req.params.name);
  console.log('----------- 2 -------------------------------------     bkend - downloaddirettivo ' + directoryPath);




  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Could not download the file. " + err,
      });
    }
  });


};

downloadeventos = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/eventos/logistica/";


  console.log('filecontroller--downloadsevetos -- directoryPath ' + directoryPath);




  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Could not download the file. " + err,
      });
    }
  });
};

downloadevlocandina = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/eventos_locandina/";


  console.log('filecontroller--downloadevlocandina -- directoryPath ' + directoryPath);




  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Impossibile scaricare il file ... " + err,
      });
    }
  });
};

downloadmaniflocandina = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/manifestaziones/";


  console.log('filecontroller--downloadmaniflocandina -- directoryPath ' + directoryPath);

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Impossibile scaricare il file ... " + err,
      });
    }
  });
};

downloadimages = (req, res) => {

  console.log('-----------------------------------------------     downloadimage');
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/images/message/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Could not download the file. " + err,
      });
    }
  });
};

downloadlogistica = (req, res) => {
  const fileName = req.params.name;

  console.log('downloadlogistica ----- file da caricare passata : ' + fileName);
  const directoryPath = __basedir + "/resources/static/assets/uploads/logistica/";


  console.log('filecontroller--downloadlogistica -- directoryPath: ' + directoryPath );




  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Could not download the file. " + err,
      });
    }
  });
};

downloadgeneric = (req, res) => {
  const fileName = req.params.name;

  console.log('downloadgeneric ----- file da caricare passata : ' + fileName);
  const directoryPath = __basedir + "/resources/static/assets/uploads/generic/";


  console.log('filecontroller--downloadgeneric -- directoryPath: ' + directoryPath );




  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Could not download the file. " + err,
      });
    }
  });
};

*/


/*
module.exports = {
    uploadpdf,
    uploadlocandina,
    getListFiles,
    download,
    downloadusers,
    downloadcarousel,
    downloadeventos,
    downloadimages,
   
    downloadevlocandina,
    downloadmaniflocandina,
    downloadlogistica,
    downloadgeneric
  }; */

module.exports = {
  uploadpdf,
  downloadpdf
 
};