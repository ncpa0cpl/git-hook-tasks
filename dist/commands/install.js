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
exports.InstallCommand = void 0;
const package_manager_1 = require("../arguments/package-manager");
const get_package_manager_1 = require("../package-manager-bindings/get-package-manager");
const exec_1 = require("../utilities/exec");
const find_project_root_1 = require("../utilities/find-project-root");
const InstallCommand = () => {
    const selectedPm = new package_manager_1.PM();
    return {
        run() {
            return __awaiter(this, void 0, void 0, function* () {
                const pm = (0, get_package_manager_1.getPackageManager)(selectedPm.value);
                const cwd = yield (0, find_project_root_1.findProjectRoot)();
                pm.setCwd(cwd);
                yield pm.run("husky install");
                yield Promise.all([
                    pm.run(`husky add .husky/pre-commit "${yield pm.generateCommand("git-hook-tasks", "precommit", "-p", selectedPm.value)}"`),
                    pm.run(`husky add .husky/pre-push "${yield pm.generateCommand("git-hook-tasks", "prepush", "-p", selectedPm.value)}"`),
                    pm.run(`husky add .husky/post-commit "${yield pm.generateCommand("git-hook-tasks", "postcommit", "-p", selectedPm.value)}"`),
                ]);
                yield Promise.all([
                    (0, exec_1.exec)("git add .husky/pre-commit", { cwd }),
                    (0, exec_1.exec)("git add .husky/pre-push", { cwd }),
                    (0, exec_1.exec)("git add .husky/post-commit", { cwd }),
                ]);
            });
        },
    };
};
exports.InstallCommand = InstallCommand;
