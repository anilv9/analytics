'use strict';

const AModule = require( '../../Abstracts/Module/AModule' );
const Utility = require( '../../Traits/System/Utility' );

/**
 * @namespace {MetaModule} App.Api.V2018.Modules.Response
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/24/18 02:47 pm - created
 */
class MetaModule extends AModule {
	/**
	 *
	 * @param {number} code
	 * @param {number} total
	 * @param {*} [data=null]
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	constructor( code, total, data ) {
		super();
		this._code  = code || 200;
		this._total = total || 1;
		this._data  = data || null;
	}

	/**
	 *
	 * @return {number}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	get code() {
		return this._code;
	}

	/**
	 *
	 * @return {number}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	get total() {
		return this._total;
	}

	/**
	 *
	 * @return {*}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	get data() {
		return this._data;
	}

	/**
	 *
	 * @param {number} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	set code( value ) {
		this._code = value;
	}

	/**
	 *
	 * @param {number} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	set total( value ) {
		this._total = value;
	}

	/**
	 *
	 * @param {*} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	set data( value ) {
		this._data = value;
	}

	/**
	 *
	 * @return {object}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:06 pm - created
	 */
	toJSON() {
		return {
			code   : this._code,
			total  : this._total,
			created: Utility.Dates.seconds,
		};
	}

	/**
	 * @static
	 * @return {MetaModule}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 12:15 pm - created
	 */
	static ok() {
		return new MetaModule( 200, 1, { status: 'ok' } );
	}
}

module.exports = MetaModule;
