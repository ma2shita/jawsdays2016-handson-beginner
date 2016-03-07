var es_endpoint = "YOUR_ES_ENDPOINT";
/* e.g.) var es_endpoint = "search-jawsdays20160312handson-***.ap-northeast-1.es.amazonaws.com"; */

/* requirement for input data
 * 1. include "deviceId" key and value (Use for doc id of ES)
 */

var aws = require('aws-sdk');
var elasticsearch = require('elasticsearch');
var moment = require('moment-timezone');

var timeObj = moment().tz("Asia/Tokyo");
var es_index = "es-test";

exports.handler = function(event, context) {
	console.log('Received event:');
	var searchRecords = [];

	var header = {
		"index":{
			"_index": es_index,
			"_type": 'log',
			"_id": event.deviceId + '-' + timeObj.format("YYYYMMDDHHmmss")
		}
	};
	searchRecords.push(header);

	var searchRecord = {
		"@timestamp" : timeObj.format("YYYY-MM-DD HH:mm:ss"),
		"payload"    : event
	};
	searchRecords.push(searchRecord);

	console.log(searchRecords);
	var es = new elasticsearch.Client({host: es_endpoint}); 
	es.bulk({
		"body": searchRecords
	}, function(err, resp){
		if(err){
			console.log(err);
			context.done("error" ,err);
		}else{
			console.log("Success");
			console.log(JSON.stringify(resp));
			context.done(null, 'success');
		}
	});
};
