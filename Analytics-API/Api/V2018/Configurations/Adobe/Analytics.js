'use strict';

/**
 * @namespace {Report} App.Api.V2018.Configurations.Adobe.Analytics
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/24/18 02:19 pm - created
 */
class Report {
	constructor() {
		this._activities      = [];
		this._users           = [];
		this._groups          = [];
		this._suites          = [];
		this._elements        = [];
		this._metrics         = [];
		this._classifications = [];
		this._segments        = [];
		this._properties      = [];
		this._channels        = [];
	}

	/**
	 *
	 * @return {Array}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/28/18 05:47 pm - created
	 */
	get activities() { return this._activities; }

	/**
	 *
	 * @return {Array}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 02:19 pm - created
	 */
	get users() { return this._users; }

	/**
	 *
	 * @return {Array}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 02:19 pm - created
	 */
	get groups() { return this._groups; }

	/**
	 *
	 * @return {Array}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 02:19 pm - created
	 */
	get suites() { return this._suites; }

	/**
	 *
	 * @return {Array}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 09:21 pm - created
	 */
	get elements() { return this._elements; }

	/**
	 *
	 * @return {Array}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 09:21 pm - created
	 */
	get metrics() { return this._metrics; }

	/**
	 *
	 * @return {Array}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 09:21 pm - created
	 */
	get classifications() { return this._classifications; }

	/**
	 *
	 * @return {Array}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 09:21 pm - created
	 */
	get segments() { return this._segments; }

	/**
	 *
	 * @return {Array}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 08:26 am - created
	 */
	get properties() { return this._properties; }

	/**
	 *
	 * @return {Array}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 08:26 am - created
	 */
	get channels() { return this._channels; }

	/**
	 *
	 * @param {Array} data
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/28/18 05:47 pm - created
	 */
	set activities( data ) { this._activities = data; }

	/**
	 *
	 * @param {Array} data
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 02:19 pm - created
	 */
	set users( data ) { this._users = data; }

	/**
	 *
	 * @param {Array} data
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 02:19 pm - created
	 */
	set groups( data ) { this._groups = data; }

	/**
	 *
	 * @param {Array} data
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 02:19 pm - created
	 */
	set suites( data ) { this._suites = data; }

	/**
	 *
	 * @param {Array} data
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 09:21 pm - created
	 */
	set elements( data ) { this._elements = data; }

	/**
	 *
	 * @param {Array} data
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 09:21 pm - created
	 */
	set metrics( data ) { this._metrics = data; }

	/**
	 *
	 * @param {Array} data
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 09:21 pm - created
	 */
	set classifications( data ) { this._classifications = data; }

	/**
	 *
	 * @param {Array} data
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 09:21 pm - created
	 */
	set segments( data ) { this._segments = data; }

	/**
	 *
	 * @param {Array} data
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 08:26 am - created
	 */
	set properties( data ) { this._segments = data; }

	/**
	 *
	 * @param {Array} data
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/25/18 08:26 am - created
	 */
	set channels( data ) { this._segments = data; }
}

/**
 * @namespace {Analytics} App.Api.V2018.Configurations.Adobe
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/13/18 01:09 am - created
 */
class Analytics {
	constructor() {
		this._report = new Report();
		this._suites = {
			conDev : 'attcondev',
			conProd: 'attconprod',
		};
	}

	/**
	 *
	 * @return {Report}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 02:22 pm - created
	 */
	get report() { return this._report; }

	/**
	 *
	 * @return {{conDev: string, conProd: string}}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 10:43 pm - created
	 */
	get suites() { return this._suites; }
}

const _instance = new Analytics();
Object.freeze( _instance );
module.exports = function() {
	return _instance;
};