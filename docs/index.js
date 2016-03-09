var es_endpoint = "YOUR_ES_ENDPOINT";
/* e.g.) var es_endpoint = "search-jawsdays20160312handson-***.ap-northeast-1.es.amazonaws.com"; */

/* requirement for input data
 * 1. include "deviceId" key and value (Use for doc id of ES)
 */

var aws = require('aws-sdk');
var elasticsearch = require('elasticsearch');
var moment = require('moment-timezone');
var random = require("random-js")();

var timeObj = moment().tz("Asia/Tokyo");
var es_index = "es-test";

exports.handler = function(event, context) {
	console.log('Received event:');
	console.log(event);
	var payload = event.state.reported; // When you pass through the AWS IoT, become {state: {reported: PAYLOAD}}
	var searchRecords = [];

	var header = {
		"index":{
			"_index": es_index,
			"_type": 'log',
			"_id": payload.deviceId + '-' + timeObj.format("YYYYMMDDHHmmss") + '-' + random.hex(8)
		}
	};
	searchRecords.push(header);

	var searchRecord = {
		"deviceId"   : payload.deviceId,
		"@timestamp" : timeObj.format("YYYY-MM-DDTHH:mm:ssZZ"),
		"payload"    : payload
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
