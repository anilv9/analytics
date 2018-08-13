const MeService   = require( 'express' ).Router( { mergeParams: true } );
const BodyParser  = require( 'body-parser' );
const Request     = require( 'request' );
const Config      = require( '../../Configurations/Configuration' );
const UserModel   = require( '../../Models/UserModel' );
const ErrorModule = require( '../../Modules/Response/ErrorModule' );
const MetaModule  = require( '../../Modules/Response/MetaModule' );
const ATrait      = require( '../../Abstracts/Trait/ATrait' );
const Utility     = require( '../../Traits/System/Utility' );

MeService.use( BodyParser.json() );
MeService.use( BodyParser.urlencoded( { extended: true } ) );
MeService.route( '/' ).get( function( req, res ) {
	console.log( 'running - get me' );
	Request.get( {
		             url    : 'https://appservice5.omniture.com/analytics/1.0/users/me',
		             qs     : {},
		             headers: {
			             'Authorization'  : 'Bearer ' + Config.Adobe.OAuth.v2.shortcut,
			             'x-api-key'      : Config.Adobe.OAuth.v2.client,
			             'x-proxy-company': Config.Adobe.OAuth.v2.company,
			             'Accept'         : 'application/json',
			             'Cache-Control'  : 'no-cache',
			             'Content-Type'   : 'application/json',
		             },
		             body   : {},
		             json   : true,
	             },
	             function( exception, httpResponse, body ) {
		             /**
		              *
		              * @param {object} data
		              * @return {UserModel}
		              */
		             let mapUser = function( data ) {
			             return new UserModel( {
				                                   id      : data[ 'loginId' ] || 0,
				                                   username: data.login || '',
				                                   email   : data.email || '',
				                                   name    : {
					                                   first: data[ 'firstName' ] || '',
					                                   last : data[ 'lastName' ] || '',
				                                   },
				                                   company : data[ 'companyid' ] || 0,
				                                   title   : data.title || '',
				                                   phone   : data[ 'phoneNumber' ] || '',
				                                   admin   : data.admin || false,
				                                   disabled: data.disabled || false,
				                                   api     : data[ 'apiKey' ] || '',
				                                   ims     : data.imsUserId || '',
				                                   created : data[ 'createDate' ] || '',
				                                   updated : data.lastLogin || '',
				                                   deleted : null,
			                                   } );
		             };

		             if( body && Utility.isFail( body, 'error' ) ) {
			             console.log( '/adobe/me {body}', body );
			             let user = mapUser( body );
			             console.log( '--- body', body );
			             console.log( '--- user', user );

			             try {
				             user.save();
			             } catch( exception ) {
				             // ignore for now
			             } finally {
				             ATrait.toResponse( res, new MetaModule( 200, 1, { profile: user } ) );
			             }
		             }
		             else if( exception ) {
			             if( exception.code === 'ETIMEDOUT' ) {
				             ATrait.toResponse( res, ErrorModule.timeout() );
			             } else {
				             ATrait.toResponse( res, ErrorModule.badRequest() );
			             }
		             } else {
			             ATrait.toResponse( res, ErrorModule.badRequest() );
		             }
	             } );
} );

module.exports = MeService;
