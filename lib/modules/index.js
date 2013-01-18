var fs = require('fs');
var path = require('path');

var modules = exports = module.exports;

fs.readdirSync(__dirname).forEach(function (file) {
    if (file && file !== 'index') {
        file = file.replace(/\.js/, '');
        modules[file] = require(__dirname + '/' + file);
    }
});