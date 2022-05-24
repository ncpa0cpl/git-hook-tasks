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
require("./json-schema.json");
const read_config_1 = require("./read-config");
const createConfig = (cwd, pm) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield promises_1.default.readdir(cwd);
    if (files.includes(read_config_1.CONFIG_FILE_NAME)) {
        return;
    }
    yield promises_1.default.writeFile(path_1.default.resolve(cwd, read_config_1.CONFIG_FILE_NAME), 
    /* json */ `{
  "packageManager": "${pm}",
  "hooks": {
    "prepush": [
      {
        "name": "Test",
        "script": "test"
      }
    ],
    "precommit": [],
    "postcommit": []
  }
}
`);
    const vscodeDir = path_1.default.resolve(cwd, ".vscode");
    const vscodeSettingsFile = path_1.default.resolve(vscodeDir, "settings.json");
    yield promises_1.default.mkdir(vscodeDir, { recursive: true });
    let settings = {};
    const vscodeFiles = yield promises_1.default.readdir(vscodeDir);
    if (vscodeFiles.includes("settings.json")) {
        const f = yield promises_1.default.readFile(vscodeSettingsFile, { encoding: "utf-8" });
        settings = JSON.parse(f);
    }
    if (!settings["json.schemas"]) {
        settings["json.schemas"] = [];
    }
    settings["json.schemas"].push({
        fileMatch: ["git-hook-tasks.config.json"],
        url: "./node_modules/git-hook-tasks/dist/config/json-schema.json",
    });
    yield promises_1.default.writeFile(vscodeSettingsFile, JSON.stringify(settings, null, 2));
});
exports.createConfig = createConfig;
