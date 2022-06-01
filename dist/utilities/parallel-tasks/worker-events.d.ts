export declare enum WorkerEvent {
    PROGRESS = "progress",
    NEW_LINE = "newLine",
    ERROR = "error",
    FINISH_SUCCESS = "finishSuccess",
    FINISH_FAILURE = "finishFailure"
}
export declare type WorkerEventPayload<E extends WorkerEvent> = {
    [WorkerEvent.ERROR]: Error;
    [WorkerEvent.FINISH_FAILURE]: Error;
    [WorkerEvent.FINISH_SUCCESS]: null;
    [WorkerEvent.NEW_LINE]: {
        content: string[];
        separator: string | undefined;
    };
    [WorkerEvent.PROGRESS]: string;
}[E];
export declare const createEvent: <E extends WorkerEvent>(event: E, payload: WorkerEventPayload<E>) => {
    payload: WorkerEventPayload<E>;
    topic: E;
};
export declare const createListener: <E extends WorkerEvent>(event: E, handler: (payload: WorkerEventPayload<E>) => void) => readonly ["message", (data: {
    topic: E;
    payload: WorkerEventPayload<E>;
}) => void];
