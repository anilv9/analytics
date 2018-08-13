let Mongoose  = require( 'mongoose' );
let Schema    = Mongoose.Schema;
let ItemModel = new Schema( {
	                            id           : String,
	                            name         : String,
	                            enabled      : Boolean,
	                            pathing      : Boolean,
	                            participation: Boolean,
	                            description  : String,
	                            list         : {
		                            enabled  : Boolean,
		                            delimiter: String,
	                            },
	                            case         : {
		                            insensitive: Boolean,
		                            dateEnabled: Boolean,
	                            },
                            } );

module.exports = Mongoose.model( 'PropertyItemModel', ItemModel );
