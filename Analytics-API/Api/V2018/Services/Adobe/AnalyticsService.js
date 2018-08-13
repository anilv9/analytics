'use strict';

const AnalyticsService = require( 'express' ).Router( { mergeParams: true } );
const QueryString      = require( 'querystring' );
const BodyParser       = require( 'body-parser' );
const Request          = require( 'request' );
const Config           = require( '../../Configurations/Configuration' );
const ErrorModule      = require( '../../Modules/Response/ErrorModule' );
const MetaModule       = require( '../../Modules/Response/MetaModule' );
const ReportTrait      = require( '../../Traits/Service/Adobe/Analytics/ReportTrait' );

AnalyticsService.use( BodyParser.json() );
AnalyticsService.use( BodyParser.urlencoded( { extended: true } ) );
AnalyticsService.route( '/' ).get( function( req, res ) {
	ReportTrait.toResponse( res, MetaModule.ok() );
} );
AnalyticsService.route( '/report' ).get( function( req, res ) {
	ReportTrait.getAllList( req ).done( function( result ) {
		console.log( 'promise returned', result );
		ReportTrait.toResponse( res, result );
	}, function( result ) {
		ReportTrait.toResponse( res, result );
	} );
} );
AnalyticsService.route( '/report' ).post( function( req, res ) {
	console.log( 'running analytics - post report' );
	ReportTrait.getStandardReport( req, res );
} );
AnalyticsService.route( '/report/activities' ).get( function( req, res ) {
	ReportTrait.getActivitiesList(req).then( function( result ) {
		console.log( 'promise returned', result );
		ReportTrait.toResponse( res, result );
	} );
} );
AnalyticsService.route( '/report/users' ).get( function( req, res ) {
	ReportTrait.getUsersList().then( function( result ) {
		console.log( 'promise returned', result );
		ReportTrait.toResponse( res, result );
	} );
} );
AnalyticsService.route( '/report/groups' ).get( function( req, res ) {
	ReportTrait.getGroupsList().then( function( result ) {
		console.log( 'promise returned', result );
		ReportTrait.toResponse( res, result );
	} );
} );
AnalyticsService.route( '/report/suites' ).get( function( req, res ) {
	ReportTrait.getSuitesList().then( function( result ) {
		console.log( 'promise returned', result );
		ReportTrait.toResponse( res, result );
	} );
} );
AnalyticsService.route( '/report/elements' ).get( function( req, res ) {
	ReportTrait.getElementsList( req ).then( function( result ) {
		console.log( 'promise returned', result );
		ReportTrait.toResponse( res, result );
	} );
} );
AnalyticsService.route( '/report/metrics' ).get( function( req, res ) {
	ReportTrait.getMetricsList( req ).then( function( result ) {
		console.log( 'promise returned', result );
		ReportTrait.toResponse( res, result );
	} );
} );
AnalyticsService.route( '/report/classifications' ).get( function( req, res ) {
	ReportTrait.getClassificationsList( req ).then( function( result ) {
		console.log( 'promise returned', result );
		ReportTrait.toResponse( res, result );
	} );
} );
AnalyticsService.route( '/report/segments' ).get( function( req, res ) {
	ReportTrait.getSegmentsList( req ).then( function( result ) {
		console.log( 'promise returned', result );
		ReportTrait.toResponse( res, result );
	} );
} );
AnalyticsService.route( '/report/properties' ).get( function( req, res ) {
	ReportTrait.getPropertiesList( req ).then( function( result ) {
		console.log( 'promise returned', result );
		ReportTrait.toResponse( res, result );
	} );
} );
AnalyticsService.route( '/report/channels' ).get( function( req, res ) {
	ReportTrait.getChannelsList( req ).then( function( result ) {
		console.log( 'promise returned', result );
		ReportTrait.toResponse( res, result );
	} );
} );
AnalyticsService.use( function( req, res, next ) {
	ReportTrait.toResponse( res, ErrorModule.notFound() );
} );

module.exports = AnalyticsService;