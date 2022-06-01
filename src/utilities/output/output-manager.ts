import { throttle } from "../throttle";
import { OutputLine } from "./output-line";

const runThrottled = throttle((fn: () => void) => fn(), 1000);
export class OutputManager {
  private static lines: OutputLine<any>[] = [];
  private static linesToClearOnNextRender = 0;
  private static renderLinesOffset = 0;

  static _rerender() {
    runThrottled(() => {
      const relevantLines = this.lines.slice(this.renderLinesOffset);

      let checkClosed = true;
      let closedLines = 0;
      let linesNotToClearOnNextRender = 0;
      let out = "";
      for (const line of relevantLines) {
        const content = line.getContent();

        out += content + "\n";

        if (line.isClosed && checkClosed) {
          closedLines++;
          linesNotToClearOnNextRender += content.split("\n").length;
        } else {
          checkClosed = false;
        }
      }

      process.stdout.write(
        Array.from(
          { length: Math.max(0, this.linesToClearOnNextRender - 1) },
          () => "\u001b[T\u001b[2K"
        ).join("") + out
      );

      this.renderLinesOffset += closedLines;
      this.linesToClearOnNextRender =
        out.split("\n").length - linesNotToClearOnNextRender;
    });
  }

  static setMaxFps(fps: number) {
    runThrottled.setWait(Math.max(1, Math.floor(1000 / fps)));
  }

  static dynamicLine<T extends Array<string | undefined>>(
    initialContent: T,
    separator?: string
  ): OutputLine<T> {
    const line = new OutputLine(this, initialContent);
    this.lines.push(line);

    if (separator !== undefined) {
      line.setSeparator(separator, false);
    }

    this._rerender();

    return line;
  }

  static staticLine(content: string[], separator?: string) {
    const line = new OutputLine(this, content);
    this.lines.push(line);

    if (separator) {
      line.setSeparator(separator, false);
    }

    line.close();

    this._rerender();
  }
}
