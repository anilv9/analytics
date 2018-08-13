'use strict';

const AModule      = require( '../../../../../Abstracts/Module/AModule' );
const MetricModule = require( '../../../../../Modules/Service/Adobe/Analytics/Report/Standard/MetricModule' );

/**
 * @namespace {StandardModule} App.Api.V2018.Modules.Service.Adobe.Analytics.Report
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/31/18 02:00 pm - created
 */
class StandardModule extends AModule {
	/**
	 *
	 * @param {string|null} [id=null]
	 * @param {string|null} [name=null]
	 * @param {number|null} [visitors=0]
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:06 pm - created
	 */
	constructor( id, name, visitors ) {
		super();
		this._id       = id || '';
		this._name     = name || '';
		this._visitors = visitors || 0;
		this._orders   = new MetricModule();
		this._clicks   = [];
	}

	/**
	 *
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	get id() { return this._id; }

	/**
	 *
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	get name() { return this._name; }

	/**
	 *
	 * @return {number}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	get visitors() { return this._visitors; }

	/**
	 *
	 * @return {MetricModule}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	get orders() { return this._orders; }

	/**
	 *
	 * @return {Array}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	get clicks() { return this._clicks; }

	/**
	 *
	 * @param {string} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	set id( value ) { this._id = value; }

	/**
	 *
	 * @param {string} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	set name( value ) { this._name = value; }

	/**
	 *
	 * @param {number} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	set visitors( value ) { this._visitors = value; }

	/**
	 *
	 * @param {MetricModule} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	set orders( value ) { this._orders = value; }

	/**
	 *
	 * @param {Array} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	set clicks( value ) {this._clicks = value; }

	/**
	 *
	 * @param {string|null} [id='']
	 * @param {string|null} [name='']
	 * @param {number|null} [total=0]
	 * @param {string|null} [variance='0']
	 * @param {string|null} [conversion='0']
	 * @param {string|null} [lift='-']
	 * @param {string|null} [confidence='-']
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:30 pm - created
	 */
	addClicks( id, name, total, variance, conversion, lift, confidence ) {
		this.clicks.push( new MetricModule( id, name, total, variance, conversion, lift, confidence ) );
	}

	/**
	 *
	 * @return {{id: string, name: string, visitors: number, orders: {id: *, name: *, total: *, variance: *, conversion: *, lift: *, confidence: *}, clicks: Array}}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 03:14 pm - created
	 */
	toJSON() {
		let tempOrders = this.orders.toJSON();
		let tempClicks = [];
		delete tempOrders.id;
		delete tempOrders.name;

		for( let i = 0, total = this.clicks.length; i < total; i++ ) {
			tempClicks.push( this.clicks[ i ].toJSON() );
		}

		return {
			id      : this.id,
			name    : this.name,
			visitors: this.visitors,
			orders  : tempOrders,
			clicks  : tempClicks,
		};
	}
}

module.exports = StandardModule;
