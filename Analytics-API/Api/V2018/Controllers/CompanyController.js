'use strict';

const CompanyController = require( 'express' ).Router( { mergeParams: true } );
const AdobeController   = require( './AdobeController' );
const JiraController    = require( './JiraController' );
const ErrorModule       = require( '../Modules/Response/ErrorModule' );
const MetaModule        = require( '../Modules/Response/MetaModule' );
const ATrait            = require( '../Abstracts/Trait/ATrait' );

CompanyController.route( '/' ).get( function( req, res ) {
	ATrait.toResponse( res, MetaModule.ok() );
} );
CompanyController.use( '/adobe', AdobeController );
CompanyController.use( '/jira', JiraController );
CompanyController.use( function( req, res ) {
	ATrait.toResponse( res, ErrorModule.notFound() );
} );

module.exports = CompanyController;
