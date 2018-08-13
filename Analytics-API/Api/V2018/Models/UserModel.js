let Mongoose  = require( 'mongoose' );
let Schema    = Mongoose.Schema;
let UserModel = new Schema( {
	                            id      : Number,
	                            username: String,
	                            email   : String,
	                            name    : {
		                            first: String,
		                            last : String,
	                            },
	                            company : Number,
	                            title   : String,
	                            phone   : String,
	                            admin   : Boolean,
	                            disabled: Boolean,
	                            api     : String,
	                            ims     : String,
	                            created : String,
	                            updated : String,
	                            deleted : String,
                            } );

module.exports = Mongoose.model( 'users', UserModel );
