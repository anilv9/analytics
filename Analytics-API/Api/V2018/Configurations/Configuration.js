'use strict';

const Analytics = require( './Adobe/Analytics' );
const OAuth     = require( './Adobe/OAuth' );

/**
 * @namespace {Adobe} App.Api.V2018.Configurations
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/16/18 03:47 pm - created
 */
class Adobe {
	constructor() {
		this._analytics = Analytics();
		this._oauth     = OAuth();
	}

	/**
	 *
	 * @returns {Analytics}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 03:47 pm - created
	 */
	get Analytics() { return this._analytics; }

	/**
	 *
	 * @returns {OAuth}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 05:46 pm - created
	 */
	get OAuth() { return this._oauth; }
}

/**
 * @namespace {Config} App.Api.V2018.Configurations
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/13/18 01:09 am - created
 */
class Config {
	constructor() {
		//this._instance       = this;
		//this._version        = '180713';
		this._adobe          = new Adobe();
		//this.cdnjs     = new CDNJS();
		this.users           = [];
		this.groups          = [];
		this.suites          = [];
		this.elements        = [];
		this.metrics         = [];
		this.classifications = [];
		this.segments        = [];
		this.properties      = [];
		this.channels        = [];
	}

	/**
	 *
	 * @returns {Adobe}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/13/18 01:09 am - created
	 */
	get Adobe() { return this._adobe; }
}

const _instance = new Config();
Object.freeze( _instance );
module.exports =  _instance;