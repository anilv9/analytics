let mongoose = require( 'mongoose' );
let Schema = mongoose.Schema;
let reportSuiteSchema = new Schema( {
	                                    id  : String,
	                                    name: String
                                    } );

module.exports = mongoose.model( 'reportSuiteSchema', reportSuiteSchema );