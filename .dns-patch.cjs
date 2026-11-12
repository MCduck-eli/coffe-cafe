// Offline-ish environment fix: registry.npmjs.org is not resolvable via
// system DNS, but it IS reachable by IP. Patch Node's DNS layer so any code
// (pnpm, undici, node-fetch, etc.) resolves registry.npmjs.org to the known
// good IP while keeping the original hostname for TLS/SNI and Host headers.
const net = require('net');
const dns = require('dns');

const REGISTRY_IP = '104.16.8.34';
const REGISTRY_HOST = 'registry.npmjs.org';

const MONGO_HOSTS = {
  'ac-czjubci-shard-00-00.tka7irt.mongodb.net': '159.41.2.112',
  'ac-czjubci-shard-00-01.tka7irt.mongodb.net': '159.41.27.65',
  'ac-czjubci-shard-00-02.tka7irt.mongodb.net': '159.41.27.79',
};
const SRV_NAME = '_mongodb._tcp.cluster0.tka7irt.mongodb.net';
const SRV_RECORDS = [
  { priority: 0, weight: 0, port: 27017, name: 'ac-czjubci-shard-00-00.tka7irt.mongodb.net' },
  { priority: 0, weight: 0, port: 27017, name: 'ac-czjubci-shard-00-01.tka7irt.mongodb.net' },
  { priority: 0, weight: 0, port: 27017, name: 'ac-czjubci-shard-00-02.tka7irt.mongodb.net' },
];

function isRegistry(hostname) {
  return hostname === REGISTRY_HOST || hostname.endsWith('.' + REGISTRY_HOST);
}

function isMongoHost(hostname) {
  return Object.prototype.hasOwnProperty.call(MONGO_HOSTS, hostname);
}

function patchLookup(lookup) {
  return function patchedLookup(hostname, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    } else if (typeof options === 'string') {
      options = { family: options };
    } else {
      options = { ...options };
    }
    if (isRegistry(hostname)) {
      const result = [{ address: REGISTRY_IP, family: 4 }];
      if (options && options.all) {
        return callback(null, result, 4);
      }
      return callback(null, REGISTRY_IP, 4);
    }
    if (isMongoHost(hostname)) {
      const ip = MONGO_HOSTS[hostname];
      const result = [{ address: ip, family: 4 }];
      if (options && options.all) {
        return callback(null, result, 4);
      }
      return callback(null, ip, 4);
    }
    return lookup.call(dns, hostname, options, callback);
  };
}

dns.lookup = patchLookup(dns.lookup);
if (dns.promises && dns.promises.lookup) {
  const orig = dns.promises.lookup.bind(dns.promises);
  dns.promises.lookup = async function (hostname, options) {
    if (isRegistry(hostname)) {
      const result = [{ address: REGISTRY_IP, family: 4 }];
      if (options && options.all) return result;
      return { address: REGISTRY_IP, family: 4 };
    }
    if (isMongoHost(hostname)) {
      const result = [{ address: MONGO_HOSTS[hostname], family: 4 }];
      if (options && options.all) return result;
      return { address: MONGO_HOSTS[hostname], family: 4 };
    }
    return orig(hostname, options);
  };
}
if (dns.resolve) {
  const origResolve = dns.resolve.bind(dns);
  dns.resolve = function (hostname, rrtype, callback) {
    if (typeof rrtype === 'function') {
      callback = rrtype;
      rrtype = 'A';
    }
    if (isRegistry(hostname) && (rrtype === 'A' || rrtype === undefined)) {
      return callback(null, [{ address: REGISTRY_IP, ttl: 60 }]);
    }
    return origResolve(hostname, rrtype, callback);
  };
}
if (dns.resolve4) {
  const origResolve4 = dns.resolve4.bind(dns);
  dns.resolve4 = function (hostname, callback) {
    if (isRegistry(hostname)) {
      return callback(null, [{ address: REGISTRY_IP, ttl: 60 }]);
    }
    return origResolve4(hostname, callback);
  };
}
if (dns.resolve6) {
  const origResolve6 = dns.resolve6.bind(dns);
  dns.resolve6 = function (hostname, callback) {
    if (isRegistry(hostname)) {
      // Only IPv4 is available for the registry IP.
      return callback(null, []);
    }
    return origResolve6(hostname, callback);
  };
}
const TXT_HOST = 'cluster0.tka7irt.mongodb.net';
if (dns.resolveTxt) {
  const origResolveTxt = dns.resolveTxt.bind(dns);
  dns.resolveTxt = function (hostname, callback) {
    if (hostname === TXT_HOST) {
      return callback(null, [[]]);
    }
    return origResolveTxt(hostname, callback);
  };
}
if (dns.promises && dns.promises.resolveTxt) {
  const origResolveTxt = dns.promises.resolveTxt.bind(dns.promises);
  dns.promises.resolveTxt = async function (hostname) {
    if (hostname === TXT_HOST) {
      return [[]];
    }
    return origResolveTxt(hostname);
  };
}
if (dns.resolveSrv) {
  const origResolveSrv = dns.resolveSrv.bind(dns);
  dns.resolveSrv = function (hostname, callback) {
    if (hostname === SRV_NAME) {
      return callback(null, SRV_RECORDS);
    }
    return origResolveSrv(hostname, callback);
  };
}
if (dns.promises && dns.promises.resolveSrv) {
  const origResolveSrv = dns.promises.resolveSrv.bind(dns.promises);
  dns.promises.resolveSrv = async function (hostname) {
    if (hostname === SRV_NAME) {
      return SRV_RECORDS;
    }
    return origResolveSrv(hostname);
  };
}
// Also patch net.createConnection's lookup option? Net uses dns.lookup already.

console.debug(
  '[dns-patch] registry.npmjs.org ->', REGISTRY_IP,
  '|', SRV_NAME, '->', SRV_RECORDS.length, 'records'
);
