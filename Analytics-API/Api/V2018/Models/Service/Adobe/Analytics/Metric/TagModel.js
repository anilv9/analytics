let Mongoose       = require( 'mongoose' );
let ComponentModel = require( './ComponentModel' );
let Schema         = Mongoose.Schema;
let TagModel       = new Schema( {
	                                 id         : Number,
	                                 name       : String,
	                                 description: String,
	                                 components : [
		                                 {
			                                 type: Schema.Types.ObjectId,
			                                 ref : 'ComponentModel',
		                                 },
	                                 ],
                                 } );

module.exports = Mongoose.model( 'metricTags', TagModel );
