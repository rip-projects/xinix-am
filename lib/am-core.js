var program = require('commander')
    .version('0.0.1')
    .usage('[options] <command> [<args>]')
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .parse(process.argv);

var core = exports = module.exports;

core.cli = {
    run: function() {
        try {
            if (program.args.length > 0) {
                core.modules = require('./modules');
                var command = new core.modules[program.args.shift()](program);
                command.run.apply(command, program.args);
            } else {
                throw new Error('No command found!');
            }
        } catch(e) {
            this.error(e);
        }
    },

    error: function(e) {
        program.outputHelp();
        console.log(e.message || "");
        process.exit(1);
    }
};



