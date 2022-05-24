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
exports.createConfig = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const read_config_1 = require("./read-config");
const createConfig = (cwd, pm) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield promises_1.default.readdir(cwd);
    if (files.includes(read_config_1.CONFIG_FILE_NAME)) {
        return;
    }
    yield promises_1.default.writeFile(path_1.default.resolve(cwd, read_config_1.CONFIG_FILE_NAME), 
    /* json */ `{
        packageManager: "${pm}",
        hooks: [
            {
                name: "prepush",
                script: "test"
            }
        ]
    }
    `);
});
exports.createConfig = createConfig;
