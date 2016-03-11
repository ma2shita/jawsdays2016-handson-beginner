## example) es_endpoint = "search-jawsdays20160312handson-***.ap-northeast-1.es.amazonaws.com"
es_endpoint = "YOUR_ES_ENDPOINT"

es_index = "es-test"
es_type  = "awsiot0"

# REF: https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/python-logging.html
import logging
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

http_req_headers = {
    "pragma"      : "no-cache",
    "content-type": "application/json"
}

# REF: http://takatoshiono.hatenablog.com/entry/2014/12/18/192726
from datetime import timedelta, tzinfo
class JST(tzinfo):
    def utcoffset(self, dt):
        return timedelta(hours=9)
    def dst(self, dt):
        return timedelta(0)
    def tzname(self, dt):
        return "JST"
# Usage;
from datetime import datetime
#print datetime.now(tz=JST()).strftime("%Y-%m-%dT%H:%M:%S%z")

import urllib2, json
def lambda_handler(event, context):
    logger.info('got event: {}'.format(event))
    body = []

    es_bulk_header = {"index": {}}
    body.append(es_bulk_header)

    payload = event["state"]["reported"] # When data of client pass through the AWS IoT, become {state: {reported: {PAYLOAD}}}
    es_bulk_row = {
        "deviceId"  : payload["deviceId"],
        "@timestamp": datetime.now(tz=JST()).strftime("%Y-%m-%dT%H:%M:%S%z"),
        "payload"   : payload
    }
    body.append(es_bulk_row)

    post_body = "\n".join(map(json.dumps, body)) + "\n"
    logger.debug('post_body: {}'.format(post_body))

    # REF: http://takuya-1st.hatenablog.jp/entry/2014/08/23/023707
    invoke_url = "http://" + "/".join([es_endpoint, es_index, es_type, "_bulk"])
    logger.debug('invoke url: {}'.format(invoke_url))
    req = urllib2.Request(invoke_url, post_body, http_req_headers)
    res = urllib2.urlopen(req)
    logger.info('res body   :{}'.format(res.read()))

    return "done"

