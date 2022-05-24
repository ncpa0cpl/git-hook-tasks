export declare class OperationError extends Error {
    private readonly _isOperationError;
    static isOperationError(e: Error | OperationError): e is OperationError;
    constructor(name: string, data: string);
}
