const models = require('../models');

const { Data } = models;

const getDescriptiveNumeric = (req, res) => Data.TableModel.findByOwner(
  req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    if (docs.length === 0) {
      return res.status(400).json({ error: 'No Data' });
    }

    const { param } = req.query;
    const { data } = docs[docs.length - 1];

    const values = data.map((d) => parseFloat(d[param])); // get an array of the relevant data
    const len = values.length;
    values.sort();

    // get the average
    const mean = values.reduce((acc, cur) => acc + cur, 0) / len;

    // get the median
    let median = 0;
    if (values.length % 2 === 0) {
      median = (values[len / 2 - 1] + values[len / 2]) / 2;
    } else {
      median = values[(len - 1) / 2];
    }

    // get the mode
    let maxCount = 0;
    let mode;
    values.reduce((acc, cur) => {
      if (!(cur in acc)) {
        acc[cur] = 0;
      }
      acc[cur]++;
      if (acc[cur] > maxCount) {
        maxCount = acc[cur];
        mode = cur;
      }
      return acc;
    }, {});

    // get the range
    const range = [values[0], values[len - 1]];

    return res.json({
      mean, median, mode, range,
    });
  },
);

const getDescriptiveCategorical = (req, res) => Data.TableModel.findByOwner(
  req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    if (docs.length === 0) {
      return res.status(400).json({ error: 'No Data' });
    }

    const { param } = req.query;
    const { data } = docs[docs.length - 1];

    const values = data.map((d) => d[param]); // get an array of the relevant data
    const len = values.length;
    values.sort(); // alphabetical sort

    // get the counts
    const counts = values.reduce((acc, cur) => {
      if (!(cur in acc)) {
        acc[cur] = 0;
      }
      acc[cur]++;
      return acc;
    }, {});

    // get the percentages
    const percents = values.reduce((acc, cur) => {
      if (!(cur in acc)) {
        acc[cur] = 0;
      }
      acc[cur] += 1 / len;
      return acc;
    }, {});

    return res.json({
      counts, percents,
    });
  },
);

module.exports = {
  getDescriptiveNumeric,
  getDescriptiveCategorical,
};
