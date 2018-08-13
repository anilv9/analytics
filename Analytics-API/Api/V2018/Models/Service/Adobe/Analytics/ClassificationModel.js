let Mongoose            = require( 'mongoose' );
let Schema              = Mongoose.Schema;
let ClassificationModel = new Schema( {
	                                      id             : String,
	                                      name           : String,
	                                      classifications: [],
                                      } );

module.exports = Mongoose.model( 'metricClassifications', ClassificationModel );
