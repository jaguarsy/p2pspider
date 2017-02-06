/**
 * Created by johnnycage on 2017/1/19.
 */
var request = require('request');

var BaseManager = require('./BaseManager');

const config = require('../../config');
const log = require('../log');
const level = require('level');

const lvlDB = level(__dirname + '/leveldb');

class HttpManager extends BaseManager {
  
  constructor() {
    super();
    
    this.queue = [];
    
    this.api = config.httpHost;
  }
  
  send(data) {
    return new Promise((resolve, reject) => {
      this.queue.push(data);
      lvlDB.put(data.info);

      log.info(data.infoHash + ':' + data.name);

      if (queue.length >= 10) {
        log.info('Send peers by http post.');

        const postData = Object.assign({}, this.queue);
        this.queue = [];
        request.post({
          url: this.api + 'addPeer',
          json: postData,
        }, (err, res, body) => {
          if (err) {
            reject(err);
          } else {
            resolve(body);
          }
        });
      } else {
        resolve('Peer enqueue.');
      }
    });
  }

  exists(infoHash) {
    return new Promise((resolve, reject) => {
      lvlDB.createKeyStream({
          start: infoHash,
          end: infoHash
        })
        .on('data', function () {
          resolve(true);
        })
        .on('error', function (err) {
          reject(err);
        })
        .on('end', function () {
          resolve(false);
        });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      lvlDB.close(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = HttpManager;