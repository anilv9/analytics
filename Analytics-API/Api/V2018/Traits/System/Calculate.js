'use strict';

/**
 * @namespace {Utility} App.Api.V2018.Traits.System
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/26/18 02:35 pm - created
 */
class Calculate {
	constructor() {
		//
	}

	/**
	 *
	 * @static
	 * @param {number|string} conversions
	 * @param {number} visitors
	 * @param {number} [places=2]
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/26/18 02:35 pm - created
	 */
	static conversionRate( conversions, visitors, places ) {
		return parseFloat( String( Math.round( ( parseFloat( conversions ) / visitors * 100 ) * 100 ) / 100 ) ).toFixed( places || 2 );
	}

	/**
	 *
	 * @static
	 * @param {number|string} conversion
	 * @param {number} visitors
	 * @param {number} [places=2]
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/26/18 02:45 pm - created
	 */
	static conversionVariance( conversion, visitors, places ) {
		let parse  = parseFloat( conversion );
		let top    = Math.abs( 1 - parse ) * parse;
		let bottom = Math.sqrt( visitors );
		let result = bottom !== 0 ? ( top / bottom ) * 1.96 : 0;

		return parseFloat( String( Math.round( result * 100 ) / 100 ) ).toFixed( places || 2 );
	}

	/**
	 *
	 * @static
	 * @param {number} conversion1
	 * @param {number} conversion2
	 * @param {number} [places=2]
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/26/18 02:35 pm - created
	 */
	static lift( conversion1, conversion2, places ) {
		let parse1 = parseFloat( String( conversion1 ) );
		let parse2 = parseFloat( String( conversion2 ) );
		let result = ( parse2 - parse1 ) / parse1;

		return parseFloat( String( Math.round( ( result * 100 ) * 100 ) / 100 ) ).toFixed( places || 2 );
	}

	/**
	 *
	 * @static
	 * @param {number|null} [conversion1=null]
	 * @param {number|null} [conversion2=null]
	 * @param {number} [places=2]
	 * @return {number}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/26/18 02:35 pm - created
	 */
	static confidence( conversion1, conversion2, places ) {
		return 0;
	}
}

module.exports = Calculate;
