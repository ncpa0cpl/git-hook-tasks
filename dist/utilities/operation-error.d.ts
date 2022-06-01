export declare class OperationError extends Error {
    private readonly _isOperationError;
    static isOperationError(e: Error | OperationError): e is OperationError;
    constructor(data: string);
}
export declare class PostponedOperationError extends Error {
    private readonly _isPostponedOperationError;
    static isPostponedOperationError(e: Error | PostponedOperationError): e is PostponedOperationError;
    private errorData;
    constructor(errorData: string);
    static print(por: PostponedOperationError): void;
}
