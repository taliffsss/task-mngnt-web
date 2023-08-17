enum LogLevel {
    NONE = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 3,
    DEBUG = 4
}

export class Logger {
    private static currentLogLevel: LogLevel = LogLevel.DEBUG;

    static setLogLevel(level: LogLevel) {
        this.currentLogLevel = level;
    }

    private static shouldLog(level: LogLevel): boolean {
        return this.currentLogLevel >= level;
    }

    private static getTimestamp(): string {
        return new Date().toISOString();
    }

    static info(message: string, ...optionalParams: any[]) {
        if (this.shouldLog(LogLevel.INFO)) {
            console.info(`[INFO] [${this.getTimestamp()}] ${message}`, ...optionalParams);
        }
    }

    static warn(message: string, ...optionalParams: any[]) {
        if (this.shouldLog(LogLevel.WARN)) {
            console.warn(`[WARN] [${this.getTimestamp()}] ${message}`, ...optionalParams);
        }
    }

    static error(message: string, ...optionalParams: any[]) {
        if (this.shouldLog(LogLevel.ERROR)) {
            console.error(`[ERROR] [${this.getTimestamp()}] ${message}`, ...optionalParams);
        }
    }

    static debug(message: string, ...optionalParams: any[]) {
        if (this.shouldLog(LogLevel.DEBUG)) {
            console.debug(`[DEBUG] [${this.getTimestamp()}] ${message}`, ...optionalParams);
        }
    }
}
