import Queue from "async-await-queue";
import { OutputLine } from "./output-line";

const renderQueue = new Queue(1);

export class OutputManager {
  private static lines: OutputLine<any>[] = [];
  private static lastRenderLines = 0;
  private static rerenderCount = 0;

  private static async flush(contents: string[]) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.lastRenderLines; i++) {
      process.stdout.write("\u001b[T\u001b[2K");
    }

    this.lastRenderLines = 0;
    for (const line of contents) {
      process.stdout.write(line + "\n");
      this.lastRenderLines += line.split("\n").length;
    }
  }

  static waitTillAllFlushed() {
    return renderQueue.flush();
  }

  static rerender() {
    const currentRender = ++this.rerenderCount;

    renderQueue.run(async () => {
      if (this.rerenderCount === currentRender)
        await this.flush(this.lines.map((l) => l.getContent()));
    });
  }

  static newLine<T extends Array<string | undefined>>(
    initialContent: T,
    separator?: string
  ): OutputLine<T> {
    const line = new OutputLine(this, initialContent);
    this.lines.push(line);

    if (separator !== undefined) {
      line.setSeparator(separator);
    } else {
      this.rerender();
    }

    return line;
  }
}
