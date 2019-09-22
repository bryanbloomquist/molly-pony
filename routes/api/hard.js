const router = require( "express" ).Router();
const hardController = require( "../../controllers/hardController" );

router
  .route( "/" )
  .get( hardController.findAll )
  .post( hardController.create )

module.exports = router;