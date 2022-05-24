"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfig = exports.CONFIG_FILE_NAME = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
exports.CONFIG_FILE_NAME = "git-hook-tasks.config.json";
const readConfig = (cwd) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield promises_1.default.readdir(cwd);
    if (!files.includes(exports.CONFIG_FILE_NAME)) {
        throw new Error("Config file not found!");
    }
    const config = JSON.parse(yield promises_1.default.readFile(path_1.default.resolve(cwd, exports.CONFIG_FILE_NAME), {
        encoding: "utf-8",
    }));
    if (config.packageManager !== "yarn" && config.packageManager !== "npm") {
        throw new Error(`Incorrect setting for [packageManager]. Found: "${config.packageManager}", expected "yarn" or "npm".`);
    }
    if (typeof config.hooks !== "object" || config.hooks === null) {
        throw new Error(`Incorrect setting for [hooks]. Found: "${config.hooks}", expected a dictionary.`);
    }
    if (typeof config.hooks.prepush !== "string" ||
        !Array.isArray(config.hooks.prepush)) {
        throw new Error(`Incorrect setting for [hooks.prepush]. Found: "${config.hooks.prepush}", expected a filepath or an array.`);
    }
    if (typeof config.hooks.precommit !== "string" ||
        !Array.isArray(config.hooks.precommit)) {
        throw new Error(`Incorrect setting for [hooks.precommit]. Found: "${config.hooks.precommit}", expected a filepath or an array.`);
    }
    if (typeof config.hooks.postcommit !== "string" ||
        !Array.isArray(config.hooks.postcommit)) {
        throw new Error(`Incorrect setting for [hooks.postcommit]. Found: "${config.hooks.postcommit}", expected a filepath or an array.`);
    }
    if (Array.isArray(config.hooks.prepush)) {
        for (const index in config.hooks.prepush) {
            const elem = config.hooks.prepush[index];
            if (typeof elem !== "object" || elem === null) {
                throw new Error(`Incorrect setting for [hooks.prepush.${index}]. Found: "${elem}", expected an object.`);
            }
            if (typeof elem["name"] !== "string") {
                throw new Error(`Incorrect setting for [hooks.prepush.${index}.name]. Found: "${elem}", expected a string.`);
            }
            if (!elem["script"] && !elem["taskFile"]) {
                throw new Error(`Incorrect setting for [hooks.prepush.${index}]. Found: "${elem}", expected an object with a property "script" or "taskFile".`);
            }
            if (elem["script"] && typeof elem["script"] !== "string") {
                throw new Error(`Incorrect setting for [hooks.prepush.${index}.script]. Found: "${elem["script"]}", expected a string.`);
            }
            if (elem["taskFile"] && typeof elem["taskFile"] !== "string") {
                throw new Error(`Incorrect setting for [hooks.prepush.${index}.taskFile]. Found: "${elem["taskFile"]}", expected a string.`);
            }
        }
    }
    if (Array.isArray(config.hooks.precommit)) {
        for (const index in config.hooks.precommit) {
            const elem = config.hooks.precommit[index];
            if (typeof elem !== "object" || elem === null) {
                throw new Error(`Incorrect setting for [hooks.precommit.${index}]. Found: "${elem}", expected an object.`);
            }
            if (typeof elem["name"] !== "string") {
                throw new Error(`Incorrect setting for [hooks.precommit.${index}.name]. Found: "${elem}", expected a string.`);
            }
            if (!elem["script"] && !elem["taskFile"]) {
                throw new Error(`Incorrect setting for [hooks.precommit.${index}]. Found: "${elem}", expected an object with a property "script" or "taskFile".`);
            }
            if (elem["script"] && typeof elem["script"] !== "string") {
                throw new Error(`Incorrect setting for [hooks.precommit.${index}.script]. Found: "${elem["script"]}", expected a string.`);
            }
            if (elem["taskFile"] && typeof elem["taskFile"] !== "string") {
                throw new Error(`Incorrect setting for [hooks.precommit.${index}.taskFile]. Found: "${elem["taskFile"]}", expected a string.`);
            }
        }
    }
    if (Array.isArray(config.hooks.postcommit)) {
        for (const index in config.hooks.postcommit) {
            const elem = config.hooks.postcommit[index];
            if (typeof elem !== "object" || elem === null) {
                throw new Error(`Incorrect setting for [hooks.postcommit.${index}]. Found: "${elem}", expected an object.`);
            }
            if (typeof elem["name"] !== "string") {
                throw new Error(`Incorrect setting for [hooks.postcommit.${index}.name]. Found: "${elem}", expected a string.`);
            }
            if (!elem["script"] && !elem["taskFile"]) {
                throw new Error(`Incorrect setting for [hooks.postcommit.${index}]. Found: "${elem}", expected an object with a property "script" or "taskFile".`);
            }
            if (elem["script"] && typeof elem["script"] !== "string") {
                throw new Error(`Incorrect setting for [hooks.postcommit.${index}.script]. Found: "${elem["script"]}", expected a string.`);
            }
            if (elem["taskFile"] && typeof elem["taskFile"] !== "string") {
                throw new Error(`Incorrect setting for [hooks.postcommit.${index}.taskFile]. Found: "${elem["taskFile"]}", expected a string.`);
            }
        }
    }
    return config;
});
exports.readConfig = readConfig;
