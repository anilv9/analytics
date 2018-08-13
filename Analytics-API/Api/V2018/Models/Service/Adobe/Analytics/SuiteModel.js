let Mongoose    = require( 'mongoose' );
let Schema      = Mongoose.Schema;
let SuiteSchema = new Schema( {
	                              id  : String,
	                              name: String,
                              } );

module.exports = Mongoose.model( 'suites', SuiteSchema );
