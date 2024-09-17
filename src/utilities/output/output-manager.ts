import type { OutputLine, Stringifyable } from "./output-line";
import { OutputEntry } from "./output-line";
import { throttle } from "./throttle";

const runThrottled = throttle((fn: () => void) => fn(), 1000, {
  leading: true,
  trailing: true,
});

class OutputBuffer {
  private lines: OutputLine[] = [];
  private firstOpenLineIdx = 0;

  put(lines: readonly OutputLine[]) {
    let checkClosed = true;

    for (let i = 0; i < lines.length; i++) {
      const l = lines[i]!;
      this.lines.push(l);
      if (checkClosed && !l.entryClosed) {
        checkClosed = false;
        this.firstOpenLineIdx = i;
      }
    }
  }

  findFirstDifferentLine(buff: OutputBuffer): number | null {
    const lim = Math.max(this.lines.length, buff.lines.length);
    for (let i = this.firstOpenLineIdx; i < lim; i++) {
      if (this.lines[i]?.content !== buff.lines[i]?.content) return i;
    }

    return null;
  }

  lineCount() {
    return this.lines.length;
  }

  slice(fromLineIdx: number): OutputLine[] {
    return this.lines.slice(fromLineIdx);
  }
}

export class OutputManager {
  private static outEntries: OutputEntry<any>[] = [];
  private static currentBuffer = new OutputBuffer();

  private static replaceStdoutLine(lineIdx: number, replacement: string) {
    process.stdout.moveCursor(0, -lineIdx);
    process.stdout.clearLine(0);
    process.stdout.write("\r" + replacement + "\r");
    process.stdout.moveCursor(0, lineIdx);
  }

  private static isRenderQueued = false;
  static _rerender() {
    if (this.isRenderQueued) {
      return;
    }

    this.isRenderQueued = true;
    setTimeout(() => {
      this.isRenderQueued = false;

      runThrottled(() => {
        const newBuffer = new OutputBuffer();

        for (let i = 0; i < this.outEntries.length; i++) {
          const entry = this.outEntries[i]!;
          if (!entry.isDeleted) {
            newBuffer.put(entry.getContent());
          }
        }

        // index of the line from which we need to perform the re-render
        const startIdx = this.currentBuffer.findFirstDifferentLine(newBuffer);

        if (startIdx === null) {
          return;
        }

        const linesToClear = this.currentBuffer.lineCount() - startIdx;
        const replacementLines = newBuffer.slice(startIdx);

        for (let i = linesToClear; i > 0; i--) {
          const replacement = replacementLines.shift();
          if (replacement != null) {
            this.replaceStdoutLine(i, replacement.content);
          } else {
            process.stdout.write("\u001b[T\u001b[2K");
          }
        }

        for (let i = 0; i < replacementLines.length; i++) {
          const line = replacementLines[i]!;
          process.stdout.write(line.content + "\n");
        }

        this.currentBuffer = newBuffer;
      });
    }, 25);
  }

  static setMaxFps(fps: number) {
    runThrottled.setWait(Math.max(1, Math.floor(1000 / fps)));
  }

  static dynamicLine<T extends Array<Stringifyable | undefined>>(
    initialContent: T,
    separator?: string
  ): OutputEntry<T> {
    const line = new OutputEntry(this, initialContent);
    this.outEntries.push(line);

    if (separator !== undefined) {
      line.setSeparator(separator, false);
    }

    this._rerender();

    return line;
  }

  static staticLine(content: Stringifyable[], separator?: string) {
    const line = new OutputEntry(this, content);
    this.outEntries.push(line);

    if (separator) {
      line.setSeparator(separator, false);
    }

    line.close();

    this._rerender();
  }
}
