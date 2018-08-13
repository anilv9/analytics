'use strict';

const express           = require( 'express' );
const Mongoose          = require( 'mongoose' );
const bodyParser        = require( 'body-parser' );
const app               = express();
const CompanyController = require( './Api/V2018/Controllers/CompanyController' );

Mongoose.Promise = global.Promise;
Mongoose.connect( 'mongodb://localhost:27017/demo', { useNewUrlParser: true }, ( err ) => {
	if( err ) {
		console.log( 'failed to connect to mongodb, please check connection.' );
	}
} ).then( () => {} );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( '/', CompanyController );
app.listen( 3000, () => {
	console.log( 'api-server is listening on port 3000!' );
} );
