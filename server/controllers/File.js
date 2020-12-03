const models = require('../models');

const { Data } = models;

const uploadFile = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    // nothing to upload
    return res.status(400).json({ error: 'No files were uploaded' });
  }

  const { sampleFile } = req.files;

  if (sampleFile.name.split('.')[1] !== 'csv') {
    // nothing to upload
    return res.status(422).json({ error: 'File must be a CSV' });
  }

  const str = sampleFile.data.toString('utf8');
  const rows = str.split('\r');
  const headers = rows[0].split(',');
  const parsedData = [];

  for (let r = 1; r < rows.length - 1; r++) { // row index
    const col = rows[r].split(',');
    const d = {};
    for (let c = 0; c < col.length; c++) { // col index
      d[headers[c]] = col[c];
    }
    parsedData.push(d);
  }

  const fileName = sampleFile.name.split('.')[0]; // remove file extension

  const tableData = {
    name: fileName,
    headers,
    data: parsedData,
    owner: req.session.account._id,
  };

  const tableModel = new Data.TableModel(tableData);
  const savePromise = tableModel.save();

  savePromise.then(() => {
    // res.status(201).json({ message: 'Upload Successful! '});
    res.redirect('/maker');
  });
  savePromise.catch((error) => {
    console.dir(error);
    // res.status(400).json({ error: 'Something went wrong uploading' });
    res.redirect('/maker');
  });

  return savePromise;
};
module.exports = {
  uploadFile,
};
