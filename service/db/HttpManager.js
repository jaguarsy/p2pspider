/**
 * Created by johnnycage on 2017/1/19.
 */
var request = require('request');

var BaseManager = require('./BaseManager');

var config = require('../../config');
var log = require('../log');

class HttpManager extends BaseManager {

  constructor() {
    super();

    this.queue = [];
  }

  send(data) {
    this.queue.push(data);

    if (queue.length >= 10) {
      request.post(config.httpHost, JSON.stringify(this.queue));

      this.queue = [];
    }
  }

}

module.exports =  HttpManager;