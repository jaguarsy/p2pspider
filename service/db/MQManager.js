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

    this.pub = context.socket('PUB');
    this.sub = context.socket('SUB');
    this.sub.pipe(process.stdout);

    this.donePromise = new Promise((resolve, reject) => {
      this.sub.connect('events', (err) => {
        console.log(err);
        this.pub.connect('events', (err) => {
          console.log(err);
          resolve();
        });
      });
    });
  }

  send(data) {
    this.donePromise.then(() => {
      this.pub.publish('data', JSON.stringify(data));
    });
  }
}

module.exports = MQManager;