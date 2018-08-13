let Mongoose      = require( 'mongoose' );
let Promise       = require( 'bluebird' );
let Utility       = require( '../../../../Traits/System/Utility' );
let Schema        = Mongoose.Schema;
let ActivityModel = new Schema( {
	                                id     : {
		                                type   : String,
		                                default: '',
	                                },
	                                name   : {
		                                type   : String,
		                                default: null,
	                                },
	                                created: {
		                                type   : String,
		                                default: Utility.Dates.seconds,
	                                },
	                                updated: {
		                                type   : String,
		                                default: Utility.Dates.seconds,
	                                },
	                                deleted: {
		                                type   : String,
		                                default: null,
	                                },
                                } );

/**
 *
 * @static
 * @param {array} attributes
 * @param {function} callback
 * @return {ActivityModel}
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/31/18 10:08 am - created
 * @see ActivityModel.firstOrNew()
 */
ActivityModel.statics.firstOrNew = function( attributes, callback ) {
	//
};
/**
 *
 * @static
 * @param {array} attributes
 * @param {function} callback
 * @return {ActivityModel}
 * @access public
 * @author Isaac Ewing
 * @version 1.0.0 - 07/31/18 10:08 am - created
 * @see ActivityModel.firstOrNew()
 */
ActivityModel.statics.firstOrCreate = function( attributes, callback ) {
	//
};
Promise.promisifyAll( Mongoose );
module.exports = Mongoose.model( 'activities', ActivityModel );
