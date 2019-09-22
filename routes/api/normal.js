const router = require( "express" ).Router();
const normalController = require( "../../controllers/normalController" );

router
  .route( "/" )
  .get( normalController.findAll )
  .post( normalController.create )

module.exports = router;