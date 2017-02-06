/**
 * Created by johnnycage on 2017/1/19.
 */
'use strict';

const db = require('./service/db');
const log = require('./service/log');
const P2PSpider = require('./lib');

const p2p = P2PSpider({
  nodesMaxSize: 100,
  maxConnections: 100,
  timeout: 5000
});

p2p.ignore((infohash, rinfo, callback) => {
  db.exists(infohash).then(callback);
});

p2p.on('metadata', (metadata) => {
  const data = {};

  if (!metadata) {
    return;
  }

  data.infoHash = metadata.infohash;
  data.name = metadata.info.name ? metadata.info.name.toString() : '';
  data.fetchedAt = new Date().getTime();

  if (metadata.info.files) {
    data.files = metadata.info.files.map(file => {
      return {
        length: file.length,
        path: file.path && file.path.join('/')
      };
    });
  }

  db.send(data).then(res => {
    log.info(res);
  }).catch(err => {
    log.error(err);
  });
});

process.on('SIGINT', () => {
  db.close().catch(err => {
    log.error(err);
  }).then(() => {
    process.exit();
  });
});

p2p.listen(6881, '0.0.0.0');