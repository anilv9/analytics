let Mongoose       = require( 'mongoose' );
let Schema         = Mongoose.Schema;
let ComponentModel = new Schema( {
	                                 id  : String,
	                                 type: String,
	                                 tags: [
		                                 { value: String },
	                                 ],
                                 } );

module.exports = Mongoose.model( 'metricComponents', ComponentModel );
