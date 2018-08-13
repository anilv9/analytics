let Mongoose   = require( 'mongoose' );
let Schema     = Mongoose.Schema;
let UsageModel = new Schema( {
	                             item     : String,
	                             count    : Number,
	                             score    : Number,
	                             timestamp: String,
                             } );

module.exports = Mongoose.model( 'metricUsages', UsageModel );
