type LogLevel = "log" | "error" | "info" | "warn" | "debug" | "clear" | "table";

export class ConsoleInterceptor {
  private static originals = {
    log: console.log,
    error: console.error,
    info: console.info,
    warn: console.warn,
    debug: console.debug,
    clear: console.clear,
    table: console.table,
  };

  static restore() {
    console.clear = this.originals.clear;
    console.debug = this.originals.debug;
    console.error = this.originals.error;
    console.info = this.originals.info;
    console.log = this.originals.log;
    console.table = this.originals.table;
    console.warn = this.originals.warn;
  }

  static intercept() {
    const interceptor = new ConsoleInterceptor();

    console.clear = (...args) => interceptor.intercept("clear", args);
    console.debug = (...args) => interceptor.intercept("debug", args);
    console.error = (...args) => interceptor.intercept("error", args);
    console.info = (...args) => interceptor.intercept("info", args);
    console.log = (...args) => interceptor.intercept("log", args);
    console.table = (...args) => interceptor.intercept("table", args);
    console.warn = (...args) => interceptor.intercept("warn", args);

    return interceptor;
  }

  private constructor() {}

  private buffer: Array<Readonly<[loglevel: LogLevel, args: Readonly<any[]>]>> =
    [];

  private intercept(loglevel: LogLevel, args: any[]) {
    this.buffer.push([loglevel, args]);
  }

  read() {
    return [...this.buffer];
  }
}
