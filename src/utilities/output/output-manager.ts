import { OutputLine } from "./output-line";

export class OutputManager {
  private static lines: OutputLine<any>[] = [];
  private static lastRenderLines = 0;

  static rerender() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.lastRenderLines; i++) {
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine(1);
    }

    this.lastRenderLines = 0;
    for (const line of this.lines) {
      const content = line.getContent();
      process.stdout.write(content + "\n");

      this.lastRenderLines += content.split("\n").length;
    }
  }

  static newLine<T extends Array<string | undefined>>(
    initialContent: T
  ): OutputLine<T> {
    const line = new OutputLine(this, initialContent);
    this.lines.push(line);

    this.rerender();

    return line;
  }
}
