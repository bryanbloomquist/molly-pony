const db = require( "../models" );

module.exports = {
  findAll: function( req, res ) {
    db.Hard
      .find( req.query )
      .sort({ score: -1, clicks: 1 })
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