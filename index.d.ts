export enum DebugLevel {
    Never = 0,
    Error = 1,
    Warning = 2,
    Info = 3
}

export enum LogMode {
    Console = 0,
    File = 1
}

export interface NarroLogConfig {
    level: DebugLevel,
    mode: LogMode,
    logFile: string
}

export function info(...msg: string[]);
export function warning(...msg: string[]);
export function error(...msg: string[]);
export function setOptions(config: NarroLogConfig);