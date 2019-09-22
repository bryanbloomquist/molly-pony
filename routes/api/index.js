const router = require( "express" ).Router();
const easyRoutes = require( "./easy" );
const normalRoutes = require( "./normal" );
const hardRoutes = require( "./hard" );

router.use( "/easies", easyRoutes );
router.use( "/normals", normalRoutes );
router.use( "/hard", hardRoutes );

module.exports = router;