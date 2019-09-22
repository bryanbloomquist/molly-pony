const db = require( "../models" );

module.exports = {
  findAll: function( req, res ) {
    db.Hard
      .find( req.query )
      .sort({ score: desc, clicks: asc })
      .limit( 10 )
      .then(( dbModel ) => res.json( dbModel ))
      .catch(( err ) => res.status( 422 ).json( err ));
  },
  create: function( req, res ) {
    db.Hard
      .create( req.body )
      .then(( dbModel ) => res.json( dbModel ))
      .catch(( err ) => res.status( 422 ).json( err ));
  }
}