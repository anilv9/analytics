let Mongoose  = require( 'mongoose' );
let Schema    = Mongoose.Schema;
let ItemModel = new Schema( {
	                            id       : Number,
	                            name     : String,
	                            type     : String,
	                            color    : String,
	                            enabled  : Boolean,
	                            breakdown: Number,
	                            override : Boolean,
                            } );

module.exports = Mongoose.model( 'ChannelItemModel', ItemModel );
