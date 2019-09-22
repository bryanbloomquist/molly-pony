const mongoose = require( "mongoose" );
const db = require( "../models" );

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/ponyRescue" );

const normalSeed = [
  {
    name: "Rasberry Sparkletwist",
    score: 24,
    clicks: 138
  }
]

db.Normal
  .remove({})
  .then(() => db.Normal.collection.insertMany( normalSeed ))
  .then(( data ) => { process.exit( 0 );})
  .catch(( err ) => { process.exit( 1 );});