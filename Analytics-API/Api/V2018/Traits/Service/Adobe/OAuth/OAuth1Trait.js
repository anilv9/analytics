'use strict';

const Request     = require( 'request' );
const Promise     = require( 'promise' );
const Config      = require( '../../../../Configurations/Configuration' );
const ErrorModule = require( '../../../../Modules/Response/ErrorModule' );
const MetaModule  = require( '../../../../Modules/Response/MetaModule' );
const TokenModule = require( '../../../../Modules/OAuth/TokenModule' );
const ATrait      = require( '../../../../Abstracts/Trait/ATrait' );
const Utility     = require( '../../../System/Utility' );

/**
 * @namespace {OAuth1Trait} App.Api.V2018.Traits.Service.Adobe.OAuth
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/24/18 10:49 am - created
 */
class OAuth1Trait extends ATrait {
	constructor() {
		super();
	}

	/**
	 *
	 * @static
	 * @param {*} req
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 11:22 am - created
	 */
	static refresh( req ) {
		console.log( 'running oauth - v1 refresh' );

		return new Promise( function( resolve, reject ) {
			Request.post( {
				              url    : Config.Adobe.OAuth.v1.url,
				              qs     : {},
				              headers: {
					              'Cache-Control': 'no-cache',
					              'Content-Type' : 'application/x-www-form-urlencoded',
				              },
				              form   : {
					              client_id    : Config.Adobe.OAuth.v1.client,
					              client_secret: Config.Adobe.OAuth.v1.secret,
					              grant_type   : Config.Adobe.OAuth.v1.type,
					              refresh_token: Config.Adobe.OAuth.v1.toTokenModule().refresh,
					              scope        : Config.Adobe.OAuth.v1.scope,
				              },
			              },
			              function( err, httpResponse, body ) {
				              console.log( 'get token', body );

				              if( body && typeof body.error === 'undefined' ) {
					              let oldToken = Config.Adobe.OAuth.v1.toTokenModule();
					              let newToken = TokenModule( 'Bearer', JSON.parse( body ).access_token, oldToken.refresh );

					              newToken.setExpiresToHour();

					              resolve( new MetaModule( 200, 1, { token: newToken } ) );
				              } else {
					              reject( ErrorModule.badRequest( null, 'invalid access credentials' ) );
				              }
			              } );
		} );
	}
}

module.exports = OAuth1Trait;
