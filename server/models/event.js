const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const eventSchema = new Schema({
    id: Number,
    creator: String,
    name: String,
    date: String,
    place : String,
    Description: String
});
module.exports = mongoose.model('event',eventSchema,'events');