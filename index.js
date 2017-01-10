var colors = require("colors");
var fs = require('fs');
var path = require('path');

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
});

var DEBUGLEVEL = 3;
var MODE = 0;
var LOGFILE = "";
/**
 * setOptions 设置配置
 * @param config.level 调试级别,0-不输出日志,1-只输出error,2-输出error和warning,3-输出所有日志
 * @param config.mode 日志模式,0-控制台输出,1-文件输出
 * @param config.logFile 仅日志模式下有效,日志文件路径
 */
exports.setOptions = function (config) {
    if (config.level) {
        DEBUGLEVEL = config.level;
    }
    if (config.mode) {
        MODE = config.mode;
    }
    if (config.logFile) {
        LOGFILE = config.logFile;
    }
}

exports.info = function () {
    if (DEBUGLEVEL > 2) {
        var msg = "";
        for (var i = 0; i < arguments.length; i++) {
            msg += arguments[i] + "\t";
        }
        var fileAndLine = traceCaller(1);
        log(fileAndLine + '[Info]'.info + "\t" + (new Date()).toLocaleString() + "\t" + msg);
    }
}

exports.warning = function () {
    if (DEBUGLEVEL > 1) {
        var msg = "";
        for (var i = 0; i < arguments.length; i++) {
            msg += arguments[i] + "\t";
        }
        var fileAndLine = traceCaller(1);
        log(fileAndLine + '[Warning]'.warn + "\t" + (new Date()).toLocaleString() + "\t" + msg);
    }
}

exports.error = function () {
    if (DEBUGLEVEL > 0) {
        var msg = "";
        for (var i = 0; i < arguments.length; i++) {
            msg += arguments[i] + "\t";
        }
        var fileAndLine = traceCaller(1);
        log(fileAndLine + '[Error]'.error + "\t" + (new Date()).toLocaleString() + "\t" + msg);
    }
}

function log(info) {
    info = info + '\n';
    if (MODE == 0) {
        console.log(info);
    } else if (MODE == 1 && LOGFILE != "") {
        var dir = path.dirname(LOGFILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.open(LOGFILE, 'a', (err, fd) => {
            if (err) {
                console.log("log file open error");
                return;
            }
            fs.write(fd, info);
        });
    }
}

function traceCaller(n) {
    if (isNaN(n) || n < 0) n = 1;
    n += 2;
    var s = (new Error()).stack;
    var b = s;
    while (n--) {
        b = b.substr(b.indexOf("\n") + 1);
    }
    b = b.substr(0, b.indexOf("\n"));
    b = b.substr(b.lastIndexOf(" "));
    b = b.replace(/[()]/g, "");
    return "[File]" + b + "\t";
}