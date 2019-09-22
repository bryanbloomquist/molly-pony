const mongoose = require( "mongoose" );
const db = require( "../models" );

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/ponyRescue" );

const easySeed = [
  {
    name: "Rasberry Sparkletwist",
    score: 12,
    clicks: 69
  }
]

db.Easy
  .remove({})
  .then(() => db.Easy.collection.insertMany( easySeed ))
  .then(( data ) => { process.exit( 0 );})
  .catch(( err ) => { process.exit( 1 );});