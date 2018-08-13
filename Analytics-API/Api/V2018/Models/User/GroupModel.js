let Mongoose  = require( 'mongoose' );
let Schema    = Mongoose.Schema;
let GroupModel = new Schema( {
	                              id         : String,
	                              name       : String,
	                              description: String
                              } );

module.exports = Mongoose.model( 'uGroups', GroupModel );
