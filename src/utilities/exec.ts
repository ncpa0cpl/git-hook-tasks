import child_process from "child_process";

export const exec = (
  command: string,
  args: string[],
  options?: child_process.ExecOptions
) => {
  return new Promise<void>((resolve, reject) => {
    const proc = child_process.spawn(command, args, options);

    let out = "";

    proc.stdout.on("data", (data) => {
      out += data.toString();
    });

    proc.stderr.on("data", (data) => {
      out += data.toString();
    });

    proc.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      if (code !== 0) {
        reject(new Error(`exited with error code ${code}:\n${out}`));
      } else {
        resolve();
      }
    });
  });
};
