const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let TableModel = {};

const convertId = mongoose.Types.ObjectId;

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

TableSchema.statics.toAPI = (doc) => ({
  headers: doc.headers,
});

TableSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return TableModel.find(search).exec(callback);
};

TableModel = mongoose.model('Table', TableSchema);

module.exports.TableModel = TableModel;
module.exports.TableSchema = TableSchema;
