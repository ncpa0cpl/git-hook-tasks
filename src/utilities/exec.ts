import child_process from "child_process";

export const exec = (command: string, options?: child_process.ExecOptions) => {
  return new Promise<void>((resolve, reject) => {
    child_process.exec(command, options, (err, _, stderr) => {
      // @ts-expect-error
      if (err) return reject(new Error(stderr.toString(), { cause: err }));
      return resolve();
    });
  });
};
