'use strict';

const Request      = require( 'request' );
const Config       = require( '../../Configurations/Configuration' );
const ErrorModule  = require( '../../Modules/Response/ErrorModule' );
const OptionModule = require( '../../Modules/System/Proxy/OptionModule' );
const Utility      = require( './Utility' );

const _staticProperties = {
	isSetup  : false,
	isProxyOn: false,
	proxy    : {
		url: 'http://one.proxy.att.com:8080',
	},
};

/**
 * @namespace {ProxyTrait} App.Api.V2018.Traits.System
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/31/18 04:14 pm - created
 */
class ProxyTrait {
	constructor() {
		//
	}

	/**
	 * @static
	 * @returns {boolean}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 11:46 pm - created
	 */
	static get isProxyOn() { return _staticProperties.isProxyOn; }

	/**
	 * @static
	 * @returns {ProxyTrait}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 11:46 pm - created
	 */
	static enableProxy() {
		_staticProperties.isProxyOn = true;

		return this;
	}

	/**
	 * @static
	 * @returns {ProxyTrait}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 11:46 pm - created
	 */
	static disableProxy() {
		_staticProperties.isProxyOn = false;

		return this;
	}

	/**
	 * @static
	 * @returns {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 11:17 pm - created
	 */
	static setup() {
		return new Promise( function( resolve ) {
			if( _staticProperties.isSetup !== true ) {
				Request.post( {
					              url    : 'https://appservice5-1.omniture.com/analytics/1.0/reports/ranked',
					              qs     : {
						              method: 'ReportSuite.GetMarketingChannels',
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
					              timeout: 5000,
				              },
				              function( exception, httpResponse, body ) {
					              if( body && Utility.isErrorFreeResult( body ) ) {
						              ProxyTrait.disableProxy();
					              } else if( ErrorModule.isTimeoutError( exception || body ) ) {
						              ProxyTrait.enableProxy();
					              }

					              resolve( _staticProperties.isSetup = true );
				              } );
			} else {
				resolve( true );
			}
		} );
	}

	/**
	 *
	 * @static
	 * @param {string} [url='']
	 * @param {object|null} [query={}]
	 * @param {object|null} [headers={'content-type':'application/json'}]
	 * @param {object|null} [body='']
	 * @param {boolean} [isJSON=true]
	 * @returns {Promise}
	 * @access public
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/31/18 04:24 pm - created
	 */
	static tunnel( url, query, headers, body, isJSON ) {
		return new Promise( function( resolve ) {
			ProxyTrait.setup().then( function() {
				let result = new OptionModule( url, query, headers, body, isJSON );

				if( ProxyTrait.isProxyOn ) {
					result.enableProxy( _staticProperties.proxy.url );
				} else {
					result.disableProxy();
				}

				resolve( result.toJSON() );
			} );
		} );
	}

	static get( url, query, headers, body, isJSON ) {
		//
	}

	/**
	 *
	 * @static
	 * @param options
	 * @param callback
	 */
	static post( options, callback ) {
		this.tunnel( options.url, options.query || options.qs, options.headers, options.body, options[ 'isJSON' ] )
		    .then( function( options ) {
			    Request.post( options, callback );
		    } );
	}

}

module.exports = ProxyTrait;
