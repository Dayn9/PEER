const e = require('express');
const { identity } = require('underscore');
const models = require('../models');

const { Data } = models;

const getDescriptive = (req, res) => Data.DataModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
  
    if(docs.length == 0){
        return res.json({error: 'No Data'});
    }

    const param = req.query['param'];
    let values = docs.map((d) => d[param]); //get an array of the relevant data
    let len = values.length;
    values.sort();

    //get the average
    let mean = values.reduce((acc, cur) => {
        return acc + cur;
    }, 0) / len;

    //get the median
    let median = 0;
    if(values.length % 2 == 0){
        median = (values[len / 2 - 1] + values[len / 2]) / 2;
    }else{
        median = values[(len - 1) / 2];
    }

    
    //get the mode
    let maxCount = 0;
    let mode;
    let counts = values.reduce((acc, cur) => {
        if(!(cur in acc)){
            acc[cur] = 0;
        }
        acc[cur]++;
        if(acc[cur] > maxCount) { 
            maxCount = acc[cur]; 
            mode = cur;
        }
        return acc;
    }, {});

    //get the range
    let range = [values[0], values[len -1]];

    return res.json({ mean, median, mode, range });
});
    

module.exports = {
    getDescriptive
};
