let Mongoose     = require( 'mongoose' );
let Schema       = Mongoose.Schema;
let ChannelModel = new Schema( {
	                               id      : String,
	                               channels: Array,
                               } );

module.exports = Mongoose.model( 'channels', ChannelModel );
