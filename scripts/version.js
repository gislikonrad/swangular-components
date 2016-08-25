#! /usr/bin/env node
var shell = require("shelljs");

var diff = shell.exec('git diff --exit-code package.json');
var output = diff.stdout;
var versionChanged = diff.code == 1 && /-\s*\"version\"/gim.test(output) && /\+\s*\"version\"/gim.test(output);

if(!versionChanged) {
  console.log('Version hasn\'t been changed. Patching');
  shell.exec('npm version patch --force');
}
