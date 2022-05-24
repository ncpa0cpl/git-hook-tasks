import child_process from "child_process";

export const exec = (command: string, options?: child_process.ExecOptions) => {
  return new Promise<void>((resolve, reject) => {
    child_process.exec(command, options, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};
