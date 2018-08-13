'use strict';

const AModule = require( '../../../Abstracts/Module/AModule' );

/**
 * @namespace {OptionModule} App.Api.V2018.Modules.System.Proxy
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/31/18 10:43 pm - created
 */
class OptionModule extends AModule {
	/**
	 *
	 * @param {string} [url='']
	 * @param {object|null} [query={}]
	 * @param {object|null} [headers={'content-type':'application/json'}]
	 * @param {object|null} [body={}']
	 * @param {boolean} [isJSON=true]
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	constructor( url, query, headers, body, isJSON ) {
		super();
		this.url      = url || '';
		this.proxy    = null;
		this._agent   = 'A/B KB Dashboard API';
		this.query    = query || {};
		this.headers  = headers || { 'Content-Type': 'application/json' };
		this.body     = body || {};
		this.json     = isJSON || true;
		this._timeout = 10000;
	}

	/**
	 *
	 * @returns {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	get url() { return this._url; }

	/**
	 *
	 * @returns {string|null}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	get proxy() { return this._proxy; }

	/**
	 *
	 * @returns {string}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	get agent() { return this._agent; }

	/**
	 *
	 * @returns {Object}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	get query() { return this._query; }

	/**
	 *
	 * @returns {Object}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	get headers() { return this._headers; }

	/**
	 *
	 * @returns {Object}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	get body() { return this._body; }

	/**
	 *
	 * @returns {boolean}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	get json() { return this._json; }

	/**
	 *
	 * @returns {number}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	get timeout() { return this._timeout; }

	/**
	 *
	 * @param {string} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	set url( value ) { this._url = value; }

	/**
	 *
	 * @param {string|null} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	set proxy( value ) { this._proxy = value; }

	/**
	 *
	 * @param {Object} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	set query( value ) { this._query = value; }

	/**
	 *
	 * @param {Object} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	set headers( value ) { this._headers = value; }

	/**
	 *
	 * @param {Object} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	set body( value ) { this._body = value; }

	/**
	 *
	 * @param {boolean} value
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	set json( value ) { this._json = value; }

	/**
	 *
	 * @returns {OptionModule}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 11:51 pm - created
	 */
	enableProxy( url ) {
		this.proxy  = url;
		this._agent = 'A/B KB Dashboard API';

		return this;
	}

	/**
	 *
	 * @returns {OptionModule}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 11:51 pm - created
	 */
	disableProxy() {
		this.proxy  = null;
		this._agent = false;

		return this;
	}

	/**
	 *
	 * @returns {{url: (string), proxy: (string|null), agent: (string), qs: (Object), headers: (Object), body: (Object|string), json: boolean, timeout: number}}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/24/18 03:44 pm - created
	 */
	toJSON() {
		return {
			url    : this.url || '',
			proxy  : this.proxy || null,
			agent  : this.proxy ? this.agent || false : false,
			qs     : this.query || {},
			headers: this.headers || { 'Content-Type': 'application/json' },
			body   : this.body || '',
			json   : this.json || true,
			timeout: this.timeout || 10000,
		};
	}
}

module.exports = OptionModule;
