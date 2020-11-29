const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

let DataModel = {};
let TableModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const TableSchema = new mongoose.Schema({
  headers: {
    type: [String],
    required: true,
  },

  data: {
    type: Object,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
});

TableSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return TableModel.find(search).exec(callback);
};

TableModel = mongoose.model('Table', TableSchema);

const DataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  friends: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

DataSchema.statics.toAPI = (doc) => ({
  name: doc.username,
  age: doc.age,
  friends: doc.friends,
});

DataSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DataModel.find(search).select('name age friends').lean().exec(callback);
};

DataModel = mongoose.model('Data', DataSchema);

// module.exports.DataModel = DataModel;
// module.exports.DataSchema = DataSchema;
module.exports.TableModel = TableModel;
module.exports.TableSchema = TableSchema;
