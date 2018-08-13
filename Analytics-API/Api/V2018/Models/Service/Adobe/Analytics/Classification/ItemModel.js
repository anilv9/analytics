let Mongoose  = require( 'mongoose' );
let Schema    = Mongoose.Schema;
let ItemModel = new Schema( {
	                            type       : String,
	                            name       : String,
	                            description: String,
	                            dateEnabled: Boolean,
	                            children   : [],
                            } );

module.exports = Mongoose.model( 'ItemModel', ItemModel );
