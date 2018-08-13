let Mongoose   = require( 'mongoose' );
let Schema     = Mongoose.Schema;
let ShareModel = new Schema( {
	                             id       : Number,
	                             to       : {
		                             id   : String,
		                             type : String,
		                             name : String,
		                             login: String,
	                             },
	                             component: {
		                             id  : String,
		                             type: String,
	                             },
                             } );

module.exports = Mongoose.model( 'metricShares', ShareModel );
