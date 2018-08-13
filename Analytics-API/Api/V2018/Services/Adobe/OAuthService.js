const OAuthService = require( 'express' ).Router( { mergeParams: true } );
const QueryString  = require( 'querystring' );
const BodyParser   = require( 'body-parser' );
const Request      = require( 'request' );
const Config       = require( '../../Configurations/Configuration' );
const ErrorModule  = require( '../../Modules/Response/ErrorModule' );
const MetaModule   = require( '../../Modules/Response/MetaModule' );
const OAuth1Trait  = require( '../../Traits/Service/Adobe/OAuth/OAuth1Trait' );

OAuthService.use( BodyParser.json() );
OAuthService.use( BodyParser.urlencoded( { extended: true } ) );
OAuthService.route( '/' ).get( function( req, res ) {
	res.setHeader( 'Content-Type', 'application/json' );

	switch( req.params.action || '' ) {
		case '':
			res.status( 200 ).send( JSON.stringify( { status: 'ok' } ) );
			break;
		default:
			res.status( 404 ).send( JSON.stringify( {
				                                        error: 'analytics page not found',
				                                        path : '/adobe/analytics/' + req.params.action,
			                                        } ) );
			break;
	}
} );
OAuthService.route( '/code' ).get( function( req, res ) {
	res.setHeader( 'Content-Type', 'application/json' );
	res.status( 200 ).send( JSON.stringify( {
		                                        company: 'adobe',
		                                        service: 'oauth',
		                                        action : 'test',
	                                        } ) );
} );
OAuthService.route( '/token' ).get( function( req, res ) {
	res.setHeader( 'Content-Type', 'application/json' );
	res.status( 200 ).send( JSON.stringify( {
		                                        company: 'adobe',
		                                        service: 'oauth',
		                                        action : 'metrics',
	                                        } ) );
} );
OAuthService.route( '/refresh' ).get( function( req, res ) {
	res.setHeader( 'Content-Type', 'application/json' );
	res.status( 200 ).send( JSON.stringify( {
		                                        company: 'adobe',
		                                        service: 'oauth',
		                                        action : 'metrics',
	                                        } ) );
} );
OAuthService.route( '/v1/refresh' ).get( function( req, res ) {
	OAuth1Trait.refresh( req ).then( function( result ) {
		console.log( 'promise returned', result );
		OAuth1Trait.toResponse( res, result );
	} );
} );
OAuthService.use( function( req, res, next ) {
	OAuth1Trait.toResponse( res, ErrorModule.notFound() );
} );

module.exports = OAuthService;
