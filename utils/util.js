const { arg } = require('../events/messageCreate');
module.exports = class Util {
    static removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    static usage(cmd) {
        var text = ''
        var desc = ''
        var args = arg;
        args.forEach(a => {
            if ()
        })

    }
}