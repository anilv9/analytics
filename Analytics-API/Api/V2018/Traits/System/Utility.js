'use strict';

const Request     = require( 'request' );
const Moment      = require( 'moment' );
const Config      = require( '../../Configurations/Configuration' );
const ErrorModule = require( '../../Modules/Response/ErrorModule' );
const MetaModule  = require( '../../Modules/Response/MetaModule' );

/**
 * @namespace {Dates} App.Api.V2018.Traits.System
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/26/18 12:33 pm - created
 */
class Dates {
	constructor() {
		//
	}

	/**
	 * This function will get a timestamp in milliseconds
	 * @returns {number} Returns the milliseconds for the current time
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/30/18 03:47 pm - created
	 * @see Dates.seconds
	 */
	static get milliseconds() {
		return Date.now() || new Date().getTime();
	}

	/**
	 * This function will get a timestamp in milliseconds
	 * @returns {number} Returns the milliseconds for the current time
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/30/18 03:48 pm - created
	 * @see Dates.milliseconds
	 */
	static get seconds() {
		return Math.round( this.milliseconds / 1000 );
	}
}

/**
 * @namespace {DateRange} App.Api.V2018.Traits.System
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/26/18 12:36 pm - created
 */
class DateRange {
	constructor() {
		//
	}

	/**
	 *
	 * @static
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/26/18 12:39 pm - created
	 */
	static get last30Days() {
		let dateStart = Moment().subtract( 1, 'month' ).format( 'YYYY-MM-DD' ).toString();
		let dateEnd   = Moment().subtract( 1, 'day' ).format( 'YYYY-MM-DD' ).toString();

		return dateStart + 'T00:00:00.000/' + dateEnd + 'T00:00:00.000';
	}
}

/**
 * @namespace {Utility} App.Api.V2018.Traits.System
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/24/18 10:49 am - created
 */
class Utility {
	constructor() {
		//
	}

	/**
	 * @static
	 * @return {Dates}
	 * @constructor
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/26/18 12:37 pm - created
	 */
	static get Dates() {
		return Dates;
	}

	/**
	 * @static
	 * @return {DateRange}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/26/18 12:37 pm - created
	 */
	static get DateRange() {
		return DateRange;
	}

	/**
	 *
	 * @param {*} [property=null]
	 * @param {string|array} [value=null]
	 * @returns {boolean} Returns true if the passed in property (and value if available) is valid, otherwise returns false
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 11:11 am - created
	 */
	static isFail( property, value ) {
		return !Utility.notFail( property, value );
	}

	/**
	 *
	 * @param {?*} [property=null]
	 * @param {string|array} [value=null]
	 * @returns {boolean} Returns true if the passed in property (and value if available) is valid, otherwise returns false
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 11:11 am - created
	 */
	static notFail( property, value ) {
		if( typeof property === 'undefined' || property === undefined ) {
			return false;
		}
		if( typeof property === 'object' && this.notFail( value ) ) {
			return typeof value !== 'undefined' && property.hasOwnProperty( value ) && property[ value ] !== null && property[ value ] !== 'null';
		}
		if( Array.isArray( property ) && this.notFail( value ) ) {
			return typeof value !== 'undefined' && property.indexOf( value ) && property[ value ] !== null && property[ value ] !== 'null';
		}

		return property !== null && property !== 'null';
	}

	/**
	 * @static
	 * @param {object} object
	 * @return {boolean}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 04:20 pm - created
	 */
	static isErrorFreeResult( object ) {
		return this.isFail( object, 'error' ) &&
		       this.isFail( object, 'errorid' ) &&
		       this.isFail( object, 'errorId' ) &&
		       this.isFail( object, 'errorcode' ) &&
		       this.isFail( object, 'errorCode' ) &&
		       this.isFail( object, 'errorDescription' );
	}

	/**
	 *
	 * @static
	 * @param {string} start
	 * @param {string} end
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/30/18 01:20 pm - created
	 */
	static startEndToDateRange( start, end ) {
		let parseStart = typeof start !== 'undefined';
		let parseEnd   = typeof end !== 'undefined';
		let dateStart  = null;
		let dateEnd    = null;

		try {
			dateStart = parseStart ? Moment( start, 'MM-DD-YYYY' ) : Moment().subtract( 1, 'month' );
			dateEnd   = parseEnd ? Moment( end, 'MM-DD-YYYY' ) : Moment().subtract( 1, 'day' );

			if( !dateStart.isValid() || !dateEnd.isValid() || !dateStart.isBefore( dateEnd ) ) {
				return DateRange.last30Days();
			}

			return dateStart.format( 'YYYY-MM-DD' ).toString() + 'T00:00:00.000/' + dateEnd.format( 'YYYY-MM-DD' ).toString() + 'T00:00:00.000';
		} catch( exception ) {
			return DateRange.last30Days();
		}
	}

	/**
	 *
	 * @static
	 * @param {*} req
	 * @return {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/27/18 05:03 pm - created
	 */
	static download( req ) {
		return new Promise( function( resolve ) {
			Request.get( {
				             url    : req.query.url || 'https://appservice5-3.omniture.com/analytics/1.0/reports/topItems',
				             qs     : {
					             local                            : 'en_US',
					             locale                           : 'en_US',
					             rsid                             : req.query.suite || 'attconprod',
					             page                             : req.query.page || 0,
					             limit                            : req.query.limit || 100,
					             generateTopItemsForTimeDimensions: 'true',
					             dimension                        : 'variables/targetraw.activityexperience',
					             dateRange                        : req.query.range || DateRange.last30Days(),
				             },
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
			             function( err, httpResponse, body ) {
				             if( body && Utility.isErrorFreeResult( body ) ) {
					             resolve( new MetaModule( 200, 1, {
						             body: body,
					             } ) );
				             } else {
					             resolve( ErrorModule.detectError( body || err ) );
				             }
			             } );
		} );
	}
}

module.exports = Utility;
