let Express        = require( 'express' );
let JiraController = Express.Router( { mergeParams: true } );

JiraController.route( '/' ).get( function( req, res ) {
	res.setHeader( 'Content-Type', 'application/json' );

	switch( req.params.service ) {
		case 'test':
			res.status( 200 ).send( JSON.stringify( {
				                                        company: 'jira',
				                                        service: req.params.service,
			                                        } ) );
			break;
		default:
			res.status( 404 ).send( JSON.stringify( {
				                                        error: 'jira page not found',
				                                        path : '/jira/' + req.params.service,
			                                        } ) );
			break;
	}
} );
JiraController.route( '/:service' ).get( function( req, res ) {
	res.setHeader( 'Content-Type', 'application/json' );

	switch( req.params.service ) {
		case 'isaac':
			res.status( 200 ).send( JSON.stringify( {
				                                        company: 'jira',
				                                        service: req.params.service,
			                                        } ) );
			break;
		default:
			res.status( 404 ).send( JSON.stringify( {
				                                        error: 'jira page not found',
				                                        path : '/jira/' + req.params.service,
			                                        } ) );
			break;
	}
} );

module.exports = JiraController;
