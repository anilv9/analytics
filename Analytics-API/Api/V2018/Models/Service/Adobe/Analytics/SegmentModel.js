let Mongoose     = require( 'mongoose' );
let Schema       = Mongoose.Schema;
let SegmentModel = new Schema( {
	                               id      : String,
	                               segments: Array,
                               } );

module.exports = Mongoose.model( 'segments', SegmentModel );
