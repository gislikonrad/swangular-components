#! /usr/bin/env node
var shell = require("shelljs");
var fs = require('fs');
var path = require('path');

var diff = shell.exec('git diff --exit-code package.json');
var output = diff.stdout;
var versionChanged = diff.code == 1 && /-\s*\"version\"/gim.test(output) && /\+\s*\"version\"/gim.test(output);

if(!versionChanged) {
  console.log('Version hasn\'t been changed. Patching');
  var filePath = path.join(__dirname, '../package.json');
  fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
    if(!err) {
      var packageJson = JSON.parse(data);
      console.log('Old version: ', packageJson.version);
      var split = packageJson.version.split('.');
      split[2]++;
      var version = split.join('.');
      packageJson.version = version;
      console.log('New version: ', version);
      fs.writeFile(filePath, JSON.stringify(packageJson, null, 2), function(err) {
        if(err) {
          console.log(err);
        }
        else {
          console.log('Version updated.')
        }
      })
    }
  })
}
