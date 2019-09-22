const express = require( "express" );
const bodyParser = require( "body-parser" );
const path = require( "path" );
const mongoose = require( "mongoose" );
const routes = require( "./routes" );
const app = express();
const PORT = process.env.PORT || 3001;

app.use( bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() ); 

if ( process.env.NODE_ENV === "production" ) {
  app.use( express.static( "client/build" ));
}

app.use( routes );

app.get( "*", ( req, res ) => {
  res.sendFile( path.join( __dirname, "./client/build/index.html" ));
});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/ponyRescue"
);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});