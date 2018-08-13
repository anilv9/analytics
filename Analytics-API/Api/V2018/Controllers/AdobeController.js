const AdobeController  = require( 'express' ).Router( { mergeParams: true } );
const ErrorModule      = require( '../Modules/Response/ErrorModule' );
const MetaModule       = require( '../Modules/Response/MetaModule' );
const AnalyticsService = require( '../Services/Adobe/AnalyticsService' );
const MeService        = require( '../Services/Adobe/MeService' );
const OAuthService     = require( '../Services/Adobe/OAuthService' );
const ATrait           = require( '../Abstracts/Trait/ATrait' );

AdobeController.route( '/' ).get( function( req, res ) {
	ATrait.toResponse( res, MetaModule.ok() );
} );
AdobeController.use( '/analytics', AnalyticsService );
AdobeController.use( '/me', MeService );
AdobeController.use( '/oauth', OAuthService );
AdobeController.use( function( req, res, next ) {
	ATrait.toResponse( res, ErrorModule.notFound() );
} );

module.exports = AdobeController;
