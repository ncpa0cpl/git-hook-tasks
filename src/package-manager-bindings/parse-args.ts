export const parseArgs = (args: string[]) =>
  args
    .map((p) => {
      if (p.includes(" ") && p[0] !== '"' && p[0] !== '"' && p[0] !== "`") {
        return `"${p}"`;
      }
      return p;
    })
    .join(" ");
