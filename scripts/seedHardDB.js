const mongoose = require( "mongoose" );
const db = require( "../models" );

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/ponyRescue" );

const hardSeed = [
  {
    name: "Rasberry Sparkletwist",
    score: 60,
    losses: 2,
    clicks: 395
  }
]

db.Hard
  .remove({})
  .then(() => db.Hard.collection.insertMany( hardSeed ))
  .then(( data ) => { process.exit( 0 );})
  .catch(( err ) => { process.exit( 1 );});