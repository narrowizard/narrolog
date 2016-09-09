declare module "narrolog" {
    function info(...msg: string[]);
    function warning(...msg: string[]);
    function error(...msg: string[]);
}