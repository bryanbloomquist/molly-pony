const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const normalSchema = new Schema({
  name: String,
  score: Number,
  losses: Number,
  clicks: Number
});

const Normal = mongoose.model( "Normal", normalSchema );

module.exports = Normal;