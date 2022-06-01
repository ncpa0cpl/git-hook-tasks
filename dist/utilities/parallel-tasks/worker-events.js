"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListener = exports.createEvent = exports.WorkerEvent = void 0;
var WorkerEvent;
(function (WorkerEvent) {
    WorkerEvent["PROGRESS"] = "progress";
    WorkerEvent["NEW_LINE"] = "newLine";
    WorkerEvent["ERROR"] = "error";
    WorkerEvent["FINISH_SUCCESS"] = "finishSuccess";
    WorkerEvent["FINISH_FAILURE"] = "finishFailure";
})(WorkerEvent = exports.WorkerEvent || (exports.WorkerEvent = {}));
var createEvent = function (event, payload) {
    return { payload: payload, topic: event };
};
exports.createEvent = createEvent;
var createListener = function (event, handler) {
    return [
        "message",
        function (data) {
            if (typeof data === "object" &&
                data !== null &&
                "topic" in data &&
                data.topic === event) {
                handler(data.payload);
            }
        },
    ];
};
exports.createListener = createListener;
