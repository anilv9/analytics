'use strict';

const AModule = require( '../../../../../../Abstracts/Module/AModule' );

/**
 * @namespace {MetricModule} App.Api.V2018.Modules.Service.Adobe.Analytics.Report.Standard
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/31/18 02:09 pm - created
 */
class MetricModule extends AModule {
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
	 * @version 1.0.0 - 07/31/18 02:06 pm - created
	 */
	constructor( id, name, total, variance, conversion, lift, confidence ) {
		super();
		this._id         = id || '';
		this._name       = name || '';
		this._total      = total || 0;
		this._variance   = variance || '0';
		this._conversion = conversion || '0';
		this._lift       = lift || '0';
		this._confidence = confidence || '0';
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
	get total() { return this._total; }

	/**
	 *
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	get variance() { return this._variance; }

	/**
	 *
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	get conversion() { return this._conversion; }

	/**
	 *
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	get lift() { return this._lift; }

	/**
	 *
	 * @return {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	get confidence() { return this._confidence; }

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
	set total( value ) { this._total = value; }

	/**
	 *
	 * @param {string} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	set variance( value ) { this._variance = value; }

	/**
	 *
	 * @param {string} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	set conversion( value ) { this._conversion = value; }

	/**
	 *
	 * @param {string} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	set lift( value ) { this._lift = value; }

	/**
	 *
	 * @param {string} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 02:14 pm - created
	 */
	set confidence( value ) { this._confidence = value; }

	/**
	 *
	 * @return {{id: *, name: *, total: *, variance: *, conversion: *, lift: *, confidence: *}}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 03:10 pm - created
	 */
	toJSON() {
		return {
			id        : this._id,
			name      : this._name,
			total     : this._total,
			variance  : this._variance,
			conversion: this._conversion,
			lift      : this._lift,
			confidence: this._confidence,
		};
	}
}

module.exports = MetricModule;
