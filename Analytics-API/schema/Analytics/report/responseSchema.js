let mongoose = require( 'mongoose' );
let reportSuiteSchema = require( 'reportSuiteSchema' );
let elementSchema = require( 'elementSchema' );
let metricSchema = require( 'metricSchema' );
let segmentSchema = require( 'segmentSchema' );
let dataSchema = require( 'dataSchema' );
let Schema = mongoose.Schema;
let responseSchema = new Schema( {
	                                 type       : String,
	                                 reportSuite: reportSuiteSchema,
	                                 period     : String,
	                                 elements   : [
		                                 elementSchema
	                                 ],
	                                 metrics    : [
		                                 metricSchema
	                                 ],
	                                 segments   : [
		                                 segmentSchema
	                                 ],
	                                 data       : [
		                                 dataSchema
	                                 ],
	                                 totals     : Array,
	                                 version    : String
                                 } );

module.exports = mongoose.model( 'responseSchema', responseSchema );