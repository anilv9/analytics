let mongoose = require( 'mongoose' );
let Schema = mongoose.Schema;
let metricSchema = new Schema( {
	                               id      : String,
	                               name    : String,
	                               type    : String, // either number or currency
	                               decimals: Number,
	                               formula : String,
	                               latency : Number,
	                               current : Boolean
                               } );

module.exports = mongoose.model( 'metricSchema', metricSchema );