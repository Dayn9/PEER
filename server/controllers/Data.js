const models = require('../models');

const { Data } = models;

const makerPage = (req, res) => {
  Data.TableModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', {
      csrfToken: req.csrfToken(),
      tableData: docs,
    });
  });
};

const make = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required' });
  }

  const newDataObj = {
    name: req.body.name,
    age: req.body.age,
    friends: req.body.friends,
    owner: req.session.account._id,
  };

  const newData = new Data.DataModel(newDataObj);
  const dataPromise = newData.save();

  dataPromise.then(() => res.json({ redirect: '/maker' }));
  dataPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Data already exists' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  });

  return dataPromise;
};

// get all the uploads associated with this user
const getData = (req, res) => {
  Data.TableModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ data: docs });
  });
};

// get the most recent upload
const getRecentData = (req, res) => {
  Data.TableModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ data: [docs[docs.length - 1]] });
  });
};

module.exports = {
  makerPage,
  make,
  getData,
  getRecentData,
};
