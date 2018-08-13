'use strict';

/**
 * @namespace {TokenModule} App.Api.V2018.Modules.OAuth
 * @static
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/16/18 08:24 pm - created
 */
class TokenModule {
	/**
	 *
	 * @param {object|string} [type=null]
	 * @param {string} [access=null]
	 * @param {string} [refresh=null]
	 * @param {string} [jwt=null]
	 * @param {number} [created=0]
	 * @param {number} [expires=0]
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 08:46 pm - created
	 */
	constructor( type, access, refresh, jwt, created, expires ) {
		if( typeof type === 'object' ) {
			this._type    = type[ 'type' ] || null;
			this._access  = type[ 'access' ] || null;
			this._refresh = type[ 'refresh' ] || null;
			this._jwt     = type[ 'jwt' ] || null;
			this._created = type[ 'created' ] || 0;
			this._expires = type[ 'expires' ] || 0;
		}
		else if( typeof type === 'string' ) {
			this._type    = type || null;
			this._access  = access || null;
			this._refresh = refresh || null;
			this._jwt     = jwt || null;
			this._created = created || 0;
			this._expires = expires || 0;
		} else {
			this._type    = null;
			this._access  = null;
			this._refresh = null;
			this._jwt     = null;
			this._created = 0;
			this._expires = 0;
		}
	}

	/**
	 *
	 * @returns {string|null}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 08:56 pm - created
	 */
	get type() { return this._type; }

	/**
	 *
	 * @returns {string|null}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 08:56 pm - created
	 */
	get access() { return this._access; }

	/**
	 *
	 * @returns {string|null}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 08:56 pm - created
	 */
	get refresh() { return this._refresh; }

	/**
	 *
	 * @returns {string|null}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 08:56 pm - created
	 */
	get jwt() { return this._jwt; }

	/**
	 *
	 * @returns {number}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 08:56 pm - created
	 */
	get created() { return this._created; }

	/**
	 *
	 * @returns {number}
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 08:56 pm - created
	 */
	get expires() { return this._expires; }

	/**
	 *
	 * @param {string} value
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 09:00 pm - created
	 */
	set type( value ) { this._type = value; }

	/**
	 *
	 * @param {string} value
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 09:00 pm - created
	 */
	set access( value ) { this._access = value; }

	/**
	 *
	 * @param {string} value
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 09:00 pm - created
	 */
	set refresh( value ) { this._refresh = value; }

	/**
	 *
	 * @param {string} value
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 09:00 pm - created
	 */
	set jwt( value ) { this._jwt = value; }

	/**
	 *
	 * @param {number} value
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 09:00 pm - created
	 */
	set created( value ) { this._created = value; }

	/**
	 *
	 * @param {number} value
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 09:00 pm - created
	 */
	set expires( value ) { this._refresh = value; }

	/**
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 10:23 pm - created
	 */
	setCreatedToNow() {
		this._created = Date.now() || new Date().getTime();
	}

	/**
	 * @author Isaac Ewing
	 * @version 1.0.0 - 07/16/18 10:23 pm - created
	 */
	setExpiresToHour() {
		if( this._created === 0 )
			this.setCreatedToNow();

		this._expires = this._created + (1000 * 60 * 55);
	}
}

module.exports = function( type, access, refresh, jwt, created, expires ) {
	return new TokenModule( type, access, refresh, jwt, created, expires );
};
