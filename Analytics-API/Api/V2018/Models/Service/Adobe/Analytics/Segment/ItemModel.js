let Mongoose  = require( 'mongoose' );
let Schema    = Mongoose.Schema;
let ItemModel = new Schema( {
	                            id      : String,
	                            name    : String,
	                            folder  : String,
	                            class   : String,
	                            enabled : Boolean,
	                            readOnly: Boolean,
                            } );

module.exports = Mongoose.model( 'SegmentItemModel', ItemModel );
