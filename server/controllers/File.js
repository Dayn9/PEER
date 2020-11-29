const { head } = require('underscore');
const filedb = require('../models/Filestore.js');
const datadb = require('../models/Data.js');


const uploadFile = (req, res) => {
    if(!req.files || Object.keys(req.files).length === 0){
        //nothing to upload
        return res.status(400).json({error: 'No files were uploaded'});
    }

    const { sampleFile } = req.files;

    const imageModel = new filedb.FileModel(sampleFile);

    let parsedData = {};

    const str = sampleFile.data.toString('utf8');
    const rows = str.split('\r');

    const headers = rows[0].split(',');
    
    headers.forEach(h => { parsedData[h] = []; }); //create parsed data arrays
 
    for(let r = 1; r < rows.length-1; r++){ //row index
      let col = rows[r].split(',');
      console.dir(col);
      for(let c = 0; c < col.length; c++){ //col index
        parsedData[headers[c]].push(col[c]);
      }  
    }

    const tableData = {
      headers: headers,
      data: parsedData,
    }

    let tableModel = new datadb.TableModel(tableData);
    const savePromise = tableModel.save();

    savePromise.then(() => {
        res.status(201).json({ 
          message: 'Upload Successful! ',  
          redirect: '/maker'
        });
    });
    savePromise.catch((error) => {
      console.dir(error);
      res.status(400).json({ 
        error: 'Something went wrong uploading',
        redirect: '/maker',
      });
    });

    
    //return res.json({ });
    return savePromise;
}

const retrieveFile = (req, res) => {
    
    if (!req.query.fileName) {
      return res.status(400).json({ error: 'Missing File Name! ' });
    }
  
    return filedb.FileModel.findOne({ name: req.query.fileName }, (error, doc) => {

      if (error) {
        console.dir(error);
        return res.status(400).json({ error: 'An error occured retrieving the file. ' });
      }
  
      if (!doc) {
        return res.status(404).json({ error: 'File not found' });
      }

      res.writeHead(200, { 'Content-Type': doc.mimetype, 'Content-Length': doc.size });
      return res.end(doc.data);
    });
  };
  

module.exports = {
    uploadFile,
    retrieveFile,
};
  