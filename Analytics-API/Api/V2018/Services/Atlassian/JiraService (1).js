'use strict';

const JiraService = require( 'express' ).Router( { mergeParams: true } );
const QueryString      = require( 'querystring' );
const BodyParser       = require( 'body-parser' );
const Request          = require( 'request' );
const Config           = require( '../../Configurations/Configuration' );
const ErrorModule      = require( '../../Modules/Response/ErrorModule' );
const MetaModule       = require( '../../Modules/Response/MetaModule' );
const ReportTrait      = require( '../../Traits/Service/Adobe/Analytics/ReportTrait' );

// 4q5zgESfAMfksewMr4wJ520E

JiraService.use( BodyParser.json() );
JiraService.use( BodyParser.urlencoded( { extended: true } ) );
JiraService.route( '/' ).get( function( req, res ) {
	ReportTrait.toResponse( res, MetaModule.ok() );
} );
JiraService.route( '/report' ).get( function( req, res ) {
	ReportTrait.getAllList( req ).done( function( result ) {
		console.log( 'promise returned', result );
		ReportTrait.toResponse( res, result );
	}, function( result ) {
		ReportTrait.toResponse( res, result );
	} );
} );
JiraService.use( function( req, res, next ) {
	ReportTrait.toResponse( res, ErrorModule.notFound() );
} );

module.exports = JiraService;
