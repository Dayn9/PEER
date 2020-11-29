const { head } = require('underscore');
const datadb = require('../models/Data.js');

const uploadFile = (req, res) => {
    if(!req.files || Object.keys(req.files).length === 0){
        //nothing to upload
        return res.status(400).json({error: 'No files were uploaded'});
    }

    const { sampleFile } = req.files;

    const str = sampleFile.data.toString('utf8');
    const rows = str.split('\r');  
    const headers = rows[0].split(',');
    let parsedData = [];
 
    for(let r = 1; r < rows.length-1; r++){ //row index
      let col = rows[r].split(',');
      let d = {}
      for(let c = 0; c < col.length; c++){ //col index
        d[headers[c]] = col[c];
      }  
      parsedData.push(d);
    }

    const tableData = {
      headers: headers,
      data: parsedData,
      owner: req.session.account._id,
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
module.exports = {
    uploadFile,
};
  