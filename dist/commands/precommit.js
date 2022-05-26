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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreCommitCommand = void 0;
const read_config_1 = require("../config/read-config");
const get_package_manager_1 = require("../package-manager-bindings/get-package-manager");
const execute_hooks_1 = require("../utilities/execute-hooks");
const exit_on_throw_1 = require("../utilities/exit-on-throw");
const find_project_root_1 = require("../utilities/find-project-root");
const PreCommitCommand = () => {
    return {
        run() {
            return __awaiter(this, void 0, void 0, function* () {
                yield (0, exit_on_throw_1.runTasks)(() => __awaiter(this, void 0, void 0, function* () {
                    const cwd = yield (0, find_project_root_1.findProjectRoot)();
                    const config = yield (0, read_config_1.readConfig)(cwd);
                    const pm = (0, get_package_manager_1.getPackageManager)(config.packageManager);
                    pm.setCwd(cwd);
                    yield (0, execute_hooks_1.executeHooks)(pm, cwd, config, "pre-commit");
                }));
            });
        },
    };
};
exports.PreCommitCommand = PreCommitCommand;
