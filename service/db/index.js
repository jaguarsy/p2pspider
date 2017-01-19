/**
 * Created by johnnycage on 2017/1/19.
 */
var config = require('../../config');
var MQManager = require('./MQManager');
var HttpManager = require('./HttpManager');

let db;

if (config.isLocal) {
  db = new MQManager();
} else {
  db = new HttpManager();
}

module.exports =  db;