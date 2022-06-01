export enum WorkerEvent {
  PROGRESS = "progress",
  NEW_LINE = "newLine",
  ERROR = "error",
  FINISH_SUCCESS = "finishSuccess",
  FINISH_FAILURE = "finishFailure",
}

export type WorkerEventPayload<E extends WorkerEvent> = {
  [WorkerEvent.ERROR]: Error;
  [WorkerEvent.FINISH_FAILURE]: Error;
  [WorkerEvent.FINISH_SUCCESS]: null;
  [WorkerEvent.NEW_LINE]: { content: string[]; separator: string | undefined };
  [WorkerEvent.PROGRESS]: string;
}[E];

export const createEvent = <E extends WorkerEvent>(
  event: E,
  payload: WorkerEventPayload<E>
) => {
  return { payload, topic: event };
};

export const createListener = <E extends WorkerEvent>(
  event: E,
  handler: (payload: WorkerEventPayload<E>) => void
) => {
  return [
    "message",
    (data: { topic: E; payload: WorkerEventPayload<E> }) => {
      if (
        typeof data === "object" &&
        data !== null &&
        "topic" in data &&
        data.topic === event
      ) {
        handler(data.payload);
      }
    },
  ] as const;
};
