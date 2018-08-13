let Mongoose     = require( 'mongoose' );
let Schema       = Mongoose.Schema;
let ElementModel = new Schema( {
	                               id            : String,
	                               name          : String,
	                               correlation   : Boolean,
	                               subrelation   : Boolean,
	                               classification: String,
                               } );

module.exports = Mongoose.model( 'elements', ElementModel );
