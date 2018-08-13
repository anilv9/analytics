let mongoose = require( 'mongoose' );
let dataPathSchema = require('dataPathSchema');
let Schema = mongoose.Schema;
let dataSchema = new Schema( {
	                             name          : String,
	                             url           : String,
	                             path          : dataPathSchema,
	                             parentId      : Number,
	                             formula       : String,
	                             year          : Number,
	                             month         : Number,
	                             day           : Number,
	                             hour          : Number,
	                             minute        : Number,
	                             trend         : Number,
	                             counts        : Array,
	                             upperBounds   : Array,
	                             lowerBounds   : Array,
	                             forecasts     : Array,
	                             breakdownTotal: Array,
	                             breakdown     : Array
                             } );

module.exports = mongoose.model( 'dataSchema', dataSchema );