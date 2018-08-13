'use strict';

const AModule = require( '../../Abstracts/Module/AModule' );

/**
 * @namespace {ErrorModule} App.Api.V2018.Modules.Response
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/24/18 03:44 pm - created
 */
class ErrorModule extends AModule {
	/**
	 *
	 * @param {number} code
	 * @param {string} reason
	 * @param {string} [message='']
	 * @param {array} [examples=[]]
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	constructor( code, reason, message, examples ) {
		super();
		this._code     = code || 400;
		this._reason   = reason || '';
		this._message  = message || 200;
		this._examples = examples || [];
	}

	/**
	 *
	 * @return {number}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	get code() { return this._code; }

	/**
	 *
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	get reason() { return this._reason; }

	/**
	 *
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	get message() { return this._message; }

	/**
	 *
	 * @return {array}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	get examples() { return this._examples; }

	/**
	 *
	 * @param {number} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	set code( value ) { this._code = value; }

	/**
	 *
	 * @param {string} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	set reason( value ) { this._reason = value; }

	/**
	 *
	 * @param {string} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	set message( value ) { this._message = value; }

	/**
	 *
	 * @param {array} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	set examples( value ) { this._examples = value; }

	/**
	 *
	 * @static
	 * @param {string|null} [reason=null]
	 * @param {string|null} [message=null]
	 * @return {ErrorModule}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 11:44 am - created
	 */
	static badRequest( reason, message ) {
		return new ErrorModule( 400, reason || 'bad request', message || 'the requested was rejected' );
	}

	/**
	 *
	 * @static
	 * @param {string|null} [reason=null]
	 * @param {string|null} [message=null]
	 * @return {ErrorModule}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 11:44 am - created
	 */
	static timeout( reason, message ) {
		return new ErrorModule( 400, reason || 'bad request', message || 'there is a vpn issue that is blocking outgoing traffic' );
	}

	/**
	 *
	 * @static
	 * @param {string} [reason=null]
	 * @param {string} [message=null]
	 * @return {ErrorModule}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 11:44 am - created
	 */
	static unauthorized( reason, message ) {
		return new ErrorModule( 401, reason || 'unauthorized', message || 'The api rejected the login credentials for the request' );
	}

	/**
	 *
	 * @static
	 * @param {string} [reason=null]
	 * @param {string} [message=null]
	 * @return {ErrorModule}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 11:44 am - created
	 */
	static notFound( reason, message ) {
		return new ErrorModule( 404, reason || 'not found', message || 'page not found' );
	}

	/**
	 *
	 * @static
	 * @param {object} result
	 * @return {boolean}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 04:33 pm - created
	 */
	static isTimeoutError( result ) {
		let errorVariations = [
			'ETIMEOUT',
			'ETIMEDOUT',
			'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
		];

		result = result || {};

		return errorVariations.indexOf( result.code ) !== -1 ||
		       errorVariations.indexOf( result[ 'errno' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorcode' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorCode' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorid' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorId' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorDescription' ] ) !== -1;
	}

	/**
	 *
	 * @static
	 * @param {object} result
	 * @return {boolean}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 04:33 pm - created
	 */
	static isTokenExpired( result ) {
		let errorVariations = [
			'invalid',
			'invalid_token',
		];

		result = result || {};

		return errorVariations.indexOf( result.code ) !== -1 ||
		       errorVariations.indexOf( result[ 'errno' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorcode' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorCode' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorid' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorId' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorDescription' ] ) !== -1;
	}

	/**
	 *
	 * @static
	 * @param {object} result
	 * @return {boolean}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 08:33 am - created
	 */
	static isNotFound( result ) {
		let errorVariations = [
			'ENOTFOUND',
			'NOT_FOUND',
			'E_NOT_FOUND',
		];

		result = result || {};

		return errorVariations.indexOf( result.code ) !== -1 ||
		       errorVariations.indexOf( result[ 'errno' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorcode' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorCode' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorid' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorId' ] ) !== -1 ||
		       errorVariations.indexOf( result[ 'errorDescription' ] ) !== -1;
	}

	/**
	 *
	 * @static
	 * @param {object} exception
	 * @return {ErrorModule}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/30/18 09:26 pm - created
	 */
	static detectError( exception ) {
		if( this.isTimeoutError( exception ) ) {
			return ErrorModule.timeout();
		} else if( this.isTokenExpired( exception ) ) {
			return ErrorModule.unauthorized();
		} else if( this.isNotFound( exception ) ) {
			return ErrorModule.notFound();
		} else {
			return ErrorModule.badRequest();
		}
	}
}

module.exports = ErrorModule;
