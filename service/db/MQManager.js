/**
 * Created by johnnycage on 2017/1/19.
 */
var BaseManager = require('./BaseManager');
var rabbit = require('rabbit.js');

var config = require('../../config');
var log = require('../log');

class MQManager extends BaseManager {

  constructor() {
    super();

    const context = rabbit.createContext(config.mqHost);

    context.on('ready', () => {
      this.pub = context.socket('PUB', { routing: 'direct' });

      this.donePromise = new Promise((resolve, reject) => {
        this.pub.connect('events.peers', () => {
          resolve();
        });
      });
    });

    context.on('error', (err) => {
      log.error(err);
    });
  }

  send(data) {
    return this.donePromise.then(() => {
      log.info('send peers by amqp.');
      this.pub.publish('peers.add', JSON.stringify(data));
    });
  }
}

module.exports = MQManager;