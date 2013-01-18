var mkdirp = require('mkdirp');
var path = require('path');
var async = require('async');
var exec = require('child_process').exec;
var Command = exports = module.exports = function(program) {
    this.program = program;

}

Command.prototype.run = function(filePath) {
    var that = this;
    if (!filePath) {
        filePath = '.';
    } else {
    }

    mkdirp.sync(filePath, 0755);

    var arkType = '';

    async.waterfall([
        function(callback){
            var list = ['php', 'java', 'node'];
            console.log('Ark type: ');
            that.program.choose(list, function(i){
                arkType = list[i].toLowerCase();
                process.stdin.destroy();
                callback();
            });
        },
        function(callback){
            var cmd = 'cd "' + path.resolve(__dirname + '/../../skel/' + arkType) + '" && cp -R * "' + path.resolve(filePath) + '"';
            exec(cmd, function (error, stdout, stderr) {
                if (error !== null) {
                    throw new Error('exec error: ' + error);
                }
                console.log(stdout);
                callback();
            });
        }
    ], function (err, result) {
        console.log('Done');
    });
};