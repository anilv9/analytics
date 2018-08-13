let Mongoose    = require( 'mongoose' );
let ShareModel  = require( './Metric/ShareModel' );
let TagModel    = require( './Metric/TagModel' );
let UsageModel  = require( './Metric/UsageModel' );
let Schema      = Mongoose.Schema;
let MetricModel = new Schema( {
	                              type       : String,
	                              id         : String,
	                              title      : {
		                              name : String,
		                              extra: String,
	                              },
	                              name       : String,
	                              category   : String,
	                              precision  : Number,
	                              calculated : Boolean,
	                              description: String,
	                              polarity   : String,
	                              hidden     : Boolean,
	                              help       : String,
	                              shares     : [
		                              {
			                              type: Schema.Types.ObjectId,
			                              ref : 'ShareModel',
		                              },
	                              ],
	                              approved   : Boolean,
	                              favorite   : Boolean,
	                              usage      :
		                              {
			                              type: Schema.Types.ObjectId,
			                              ref : 'UsageModel',
		                              },
	                              tags       : [
		                              {
			                              type: Schema.Types.ObjectId,
			                              ref : 'TagModel',
		                              },
	                              ],
	                              support    : Array,
                              } );

module.exports = Mongoose.model( 'metrics', MetricModel );
