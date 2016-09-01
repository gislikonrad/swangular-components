#! /usr/bin/env node
var fs = require('fs');
var path = require('path');

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

var directory = path.join(__dirname, '../lib');
walk(directory, function(err, results) {
  if(err) {
    console.error(err);
  }
  else {
    console.log('Files built:')
    for(var i = 0; i < results.length; i++) {
      console.log('  ', results[i]);
    }
  }
})
