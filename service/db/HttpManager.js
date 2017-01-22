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
    
    this.api = config.httpHost;
  }
  
  send(data) {
    this.queue.push(data);
    
    if (queue.length >= 10) {
      log.info('send peers by http post.');
      const postData = Object.assign({}, this.queue);
      this.queue = [];
      return request.post(this.api, JSON.stringify(postData));
    }

  }
}

module.exports = HttpManager;