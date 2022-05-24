import child_process from "child_process";

export const exec = (command: string, options?: child_process.ExecOptions) => {
  return new Promise<void>((resolve, reject) => {
    child_process.exec(command, options, (err, stdout, stderr) => {
      if (err)
        return reject(
          new Error(
            err.message + "\n" + stdout.toString() + "\n" + stderr.toString(),
            // @ts-expect-error
            {
              cause: err,
            }
          )
        );
      return resolve();
    });
  });
};
