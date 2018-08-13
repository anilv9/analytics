'use strict';

const Config      = require( '../../Configurations/Configuration' );
const ErrorModule = require( '../../Modules/Response/ErrorModule' );
const MetaModule  = require( '../../Modules/Response/MetaModule' );
const Utility     = require( '../../Traits/System/Utility' );

/**
 * @namespace {ATrait} App.Api.V2018.Abstracts.Trait
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/25/18 09:39 am - created
 */
class ATrait {
	constructor() {
		//
	}

	/**
	 * @static
	 * @param {boolean} [v2 = true]
	 * @return {object} 
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 12:27 pm - created
	 */
	static getStandardParams( v2 ) {
		if( v2 === true || true ) {
			return {
				locale          : 'en_US',
				includeOberonXml: true,
			};
		} else {
			return {};
		}
	}

	/**
	 * @static
	 * @return {object}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 12:27 pm - created
	 */
	static getStandardHeaders() {
		return {
			'Authorization'  : 'Bearer ' + Config.Adobe.OAuth.v2.shortcut,
			'x-api-key'      : Config.Adobe.OAuth.v2.client,
			'x-proxy-company': Config.Adobe.OAuth.v2.company,
			'Accept'         : 'application/json',
			'Cache-Control'  : 'no-cache',
			'Content-Type'   : 'application/json',
		};
	}

	/**
	 * @static
	 * @param {object} body
	 * @return {boolean}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 10:55 am - created
	 */
	static isRequiredParamsAvailable( body ) {
		return Utility.notFail( body, 'suite' ) && Utility.notFail( body, 'activity' );
	}

	/**
	 *
	 * @static
	 * @param res
	 * @param exception
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 04:43 pm - created
	 */
	static handleExceptionResponse( res, exception ) {
		this.toResponse( res, ErrorModule.detectError( exception ) );
	}

	/**
	 *
	 * @static
	 * @param {*} res
	 * @param {MetaModule|ErrorModule} result
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 04:22 pm - created
	 */
	static toResponse( res, result ) {
		res.setHeader( 'Access-Control-Allow-Origin', '*' );
		res.setHeader( 'Content-Type', 'application/json' );

		if( result instanceof MetaModule ) {
			res.status( result.code || 200 ).send( JSON.stringify( {
				                                                       data: result.data,
				                                                       meta: result.toJSON(),
			                                                       } ) );
		} else if( result instanceof Array ) {
			let metaTemp = new MetaModule( 200, 0, {} );

			for( let i = 0, total = result.length; i < total; i++ ) {
				let keys   = Object.keys( result[ i ].data );
				let values = Object.values( result[ i ].data );

				for( let e = 0, keyTotal = keys.length; e < keyTotal; e++ ) {
					metaTemp.data[ keys[ e ] ] = values[ e ];
				}
				metaTemp.total += result[ i ].total;
			}

			res.status( metaTemp.code || 200 ).send( JSON.stringify( {
				                                                         data: metaTemp.data,
				                                                         meta: metaTemp.toJSON(),
			                                                         } ) );
		} else {
			res.status( result.code || 400 ).send( JSON.stringify( {
				                                                       error: {
					                                                       code   : result.code || 400,
					                                                       domain : 'global',
					                                                       reason : result.reason || 'bad request',
					                                                       message: result.message || 'bad request',
				                                                       },
			                                                       } ) );
		}
	}
}

module.exports = ATrait;