let Mongoose      = require( 'mongoose' );
let Schema        = Mongoose.Schema;
let PropertyModel = new Schema( {
	                                id        : String,
	                                name      : String,
	                                properties: Array,
                                } );

module.exports = Mongoose.model( 'properties', PropertyModel );
