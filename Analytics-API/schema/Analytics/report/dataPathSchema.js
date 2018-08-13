let mongoose = require( 'mongoose' );
let Schema = mongoose.Schema;
let dataPathSchema = new Schema( {
	                                 name: String,
	                                 url : String
                                 } );

module.exports = mongoose.model( 'dataPathSchema', dataPathSchema );