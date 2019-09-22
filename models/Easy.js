const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const easySchema = new Schema({
  name: String,
  score: Number,
  clicks: Number
});

const Easy = mongoose.model( "Easy", easySchema );

module.exports = Easy;