var log = require('./index');

function aa() {
    log.setOptions({
        mode: 1,
        logFile: "log/a.log"
    });
    log.error('aa');
}

aa();