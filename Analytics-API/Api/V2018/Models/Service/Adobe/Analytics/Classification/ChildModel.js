let Mongoose   = require( 'mongoose' );
let Schema     = Mongoose.Schema;
let ChildModel = new Schema( {
	                             type       : String,
	                             name       : String,
	                             description: String,
	                             parent     : String,
	                             dateEnabled: Boolean,
                             } );

module.exports = Mongoose.model( 'ChildModel', ChildModel );
