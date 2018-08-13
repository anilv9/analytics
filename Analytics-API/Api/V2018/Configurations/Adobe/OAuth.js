'use strict';

const TokenModule = require( '../../Modules/OAuth/TokenModule' );

/**
 * @namespace {OAuthV1} App.Api.V2018.Configurations.Adobe
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/16/18 09:55 pm - created
 */
class OAuthV1 {
	constructor() {
		this._client   = 'da735298f3-att-ab-testing';
		this._secret   = 'c62bfe924a591d8d597c';
		this._type     = 'refresh_token';
		this._refresh  = 'e42cf452681a5f1fa1a7ae944f6dc7e69ae8f6ff';
		this._scope    = '';
		this._url      = 'https://api.omniture.com/token';
		this._timer    = null;
		this._shortcut
		               = "eyJ4NXUiOiJpbXNfbmExLWtleS0xLmNlciIsImFsZyI6IlJTMjU2In0.eyJpZCI6IjE1MzM3NTIzMjU0MjJfNDJhOWQwYTMtYzU0Yi00YTI5LTkxYzAtNGEzMTFjMjVlNzFlX3VlMSIsImNsaWVudF9pZCI6Ijc0ZDkzODE3MWZkMDQ5ZTZhYzllMGJhYmZmYzVmMWM4IiwidXNlcl9pZCI6IjU4OTgxREZDNUI2QjMxMjgwQTQ5NUM0MUB0ZWNoYWNjdC5hZG9iZS5jb20iLCJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiYXMiOiJpbXMtbmExIiwiZmciOiJTVkdJVlJVUEZMTjdDSENPQUVBQUFBQUFTTT09PT09PSIsInNpZCI6IjE1MzM3NTIzMjU0MjVfMDcwZjNiMzQtZDIwYS00YmViLWFmM2MtN2ExZjkyYmVjMmE0X3VlMSIsIm1vaSI6IjJjNjU2ZGU1IiwiYyI6IkN5Q1NoN2Vwc0FUaWhoREd3K01lMFE9PSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoib3BlbmlkLEFkb2JlSUQsdGFyZ2V0X3NkayxyZWFkX29yZ2FuaXphdGlvbnMsYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0IiwiY3JlYXRlZF9hdCI6IjE1MzM3NTIzMjU0MjIifQ.dPNjqlxHPZPFW988N4l90mnphr6CDD9UzvEcCQNRwrbWtnOezBp_2V4jIGwwZZxAhW78pvW1AQ8ZKzdjcxqdI47Pf360vwfATVVmUqbZtGOVKPeTsoYOxfGvjec59SPC0L8LniSnP2h3eLjpw7rBoQEBnxG6SWpZ2CwIht7hBUKHHbSPLpSZKXch9eEJwNO1Tj2W-mbb7rxEPM6A4cIaVVRSOfN5OgEN3CkBwn-kwDCzy7NZlgeFyu_Ax-pNfZwhmzNDzEjvvyusI22fWeRlUMoBFBSuijBdH3sogifEQGV9HPBaCdv7uXwovRvokVFiP0aC4Jle8wzN0YWSRJ6acw";
	}

	/**
	 *
	 * @return {string}
	 */
	get client() { return this._client; }

	/**
	 *
	 * @return {string}
	 */
	get secret() { return this._secret; }

	/**
	 *
	 * @return {string}
	 */
	get type() { return this._type; }

	/**
	 *
	 * @return {string}
	 */
	get scope() { return this._scope; }

	/**
	 *
	 * @return {string}
	 */
	get url() { return this._url; }

	/**
	 *
	 * @return {number|null}
	 */
	get timer() { return this._timer; }

	/**
	 *
	 * @param {number} data
	 */
	set timer( data ) { this._timer = data; }

	/**
	 *
	 * @return {string}
	 */
	get shortcut() { return this._shortcut; }

	/**
	 *
	 * @return {TokenModule}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 09:44 pm - created
	 */
	toTokenModule() {
		return TokenModule( this._type, null, this._refresh );
	}
}

/**
 * @namespace {OAuthV2} App.Api.V2018.Configurations.Adobe
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/16/18 09:55 pm - created
 */
class OAuthV2 {
	constructor() {
		this._client   = 'a901466b354c4938bdb84749bfc54e4a';
		this._secret   = '7a7ead84-e8b4-4c8a-ad6b-4c8f5dd6236a';
		this._type     = 'refresh_token';
		this._refresh  = 'e42cf452681a5f1fa1a7ae944f6dc7e69ae8f6ff';
		this._company  = 'ATT';
		this._scope    = 'openid,AdobeID';
		this._url      = 'https://appservice5.omniture.com/analytics/1.0/metrics';
		this._timer    = null;
		this._shortcut = 'SC:62a3e843e5969844e683d80d8e82f0d3c9335a1edbca84bf01fd80f733fa6370';
	}

	/**
	 *
	 * @return {string}
	 */
	get client() { return this._client; }

	/**
	 *
	 * @return {string}
	 */
	get secret() { return this._secret; }

	/**
	 *
	 * @return {string}
	 */
	get type() { return this._type; }

	/**
	 *
	 * @return {string}
	 */
	get company() { return this._company; }

	/**
	 *
	 * @return {string}
	 */
	get scope() { return this._scope; }

	/**
	 *
	 * @return {string}
	 */
	get url() { return this._url; }

	/**
	 *
	 * @return {number|null}
	 */
	get timer() { return this._timer; }

	/**
	 *
	 * @param {number} data
	 */
	set timer( data ) { this._timer = data; }

	/**
	 *
	 * @return {string}
	 */
	get shortcut() { return this._shortcut; }

	/**
	 *
	 * @return {TokenModule}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 09:44 pm - created
	 */
	toTokenModule() {
		return TokenModule( 'Bearer', null, this._refresh );
	}
}

/**
 * @namespace {OAuth} App.Api.V2018.Configurations.Adobe
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/16/18 05:22 pm - created
 */
class OAuth {
	constructor() {
		this._instance = this;
		this._version  = '180716';
		this._v1       = new OAuthV1();
		this._v2       = new OAuthV2();

		if( this._isSetup !== true ) {
			//this._isLive  = String( window.location.host ).match( /^(vapi\.[a-z0-9-]*)$/mig ) === null;
			this._isSetup = true;
		}
	}

	/**
	 *
	 * @returns {OAuth}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/13/18 01:09 am - created
	 */
	get instance() { return this._instance; }

	/**
	 *
	 * @returns {string}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/13/18 01:09 am - created
	 */
	get version() { return this._version; }

	/**
	 *
	 * @return {OAuthV1}
	 */
	get v1() { return this._v1; }

	/**
	 *
	 * @return {OAuthV2}
	 */
	get v2() { return this._v2; }
}

const _instance = new OAuth();
Object.freeze( _instance );
module.exports = function() {
	return _instance;
};
//export default _instance;