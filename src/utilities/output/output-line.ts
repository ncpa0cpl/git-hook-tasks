import type { OutputManager } from "./output-manager";

export class OutputLine<T extends Array<string | undefined>> {
  private manager: typeof OutputManager;
  private content: T;
  private separator = " ";
  private isClosed = false;

  constructor(manager: typeof OutputManager, initialContent: T) {
    this.manager = manager;
    this.content = initialContent;
  }

  setSeparator(separator: string) {
    this.separator = separator;
    this.manager.rerender();
  }

  getContent(): string {
    return this.content.filter((e) => e).join(this.separator);
  }

  update(value: T | ((current: T) => T)) {
    if (this.isClosed) return;

    if (typeof value === "function") {
      this.content = value(this.content);
    } else {
      this.content = value;
    }

    this.manager.rerender();
  }

  close() {
    this.isClosed = true;
  }
}
