export declare class Git {
    private static cwd;
    private static execute;
    static setCwd(cwd: string): void;
    static init(dirPath: string): Promise<void>;
    static add(...files: string[]): void;
}
