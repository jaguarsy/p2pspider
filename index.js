/**
 * Created by johnnycage on 2017/1/19.
 */
'use strict';

var db = require('./service/db');
var log = require('./service/log');
var P2PSpider = require('./lib');

const p2p = P2PSpider({
  nodesMaxSize: 200,
  maxConnections: 400,
  timeout: 5000
});

const hashCache = {};

p2p.ignore((infohash, rinfo, callback) => {
  if (hashCache[infohash]) {
    callback(true);
  } else {
    hashCache[infohash] = true;
  }
});

p2p.on('metadata', function (metadata) {
  var data = {};
  data.hash = metadata.infohash;
  data.magnet = metadata.magnet;
  data.name = metadata.info.name ? metadata.info.name.toString() : '';
  data.fetchedAt = new Date().getTime();

  log.info('announce_peers: ' + JSON.stringify(data));
  db.send(data);
});

process.on('SIGINT', function () {
  log.warn('Spider closed.');
  process.exit();
});

p2p.listen(6881, '0.0.0.0');