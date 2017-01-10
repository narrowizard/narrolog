# narrolog
a simple log tool based on nodejs.

## config
call setOptions to config narrolog.  

```json
{
    "level": 3, // debug level 0-never, 1-only error, 2-error and warning, 3-all
    "mode": 0, // log mode 0-console, 1-file
    "logFile": "" // log file path, only when mode == 1 eg: log/error.log
}
```