const router = require( "express" ).Router();
const easyController = require( "../../controllers/easyController" );

router
  .route( "/" )
  .get( easyController.findAll )
  .post( easyController.create )

module.exports = router;