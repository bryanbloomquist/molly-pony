const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const hardSchema = new Schema({
  name: String,
  score: Number,
  clicks: Number
});

const Hard = mongoose.model( "Hard", hardSchema );

module.exports = Hard;