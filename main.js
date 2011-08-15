var dependencyResolver = require('./lib/dependency-resolver'),
    identifier = require('./lib/identifier'),
    fs = require('fs');

exports.graphSrc = graphSrc;
function graphSrc(src, config, callback) {
  if (!callback) {
    callback = config;
    config = {};
  }
  var resolver = dependencyResolver.create(config),
      result = resolver.createResult(config);
  resolver.fromSrc(src, result, callback);
};

exports.graph = graph;
function graph(ident, config, callback) {
  if (!callback) {
    callback = config;
    config = {};
  }
  var resolver = dependencyResolver.create(config),
      module = resolver.createModule(ident),
      result = resolver.createResult(config);
  
  resolver.fromModule(module, result, callback);
};

exports.graphPath = graphPath;
function graphPath(p, config, callback) {
  fs.readFile(p, 'utf8', function(err, src) {
    err ? callback(err) : graphSrc(src, config, callback);
  })
};


