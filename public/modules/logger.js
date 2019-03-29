var bunyan = require('bunyan');

var logger = bunyan.createLogger({name: "jjsmobile-admin-console"});

module.exports = {
	loginfo: function( data)
	{
		logger.info( data );
	},
	logerror: function( data)
	{
		logger.error( data );
	}
};