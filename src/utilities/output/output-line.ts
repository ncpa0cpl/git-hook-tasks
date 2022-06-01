import type { OutputManager } from "./output-manager";

export class OutputLine<T extends Array<string | undefined>> {
  private manager: typeof OutputManager;
  private content: T;
  private separator = " ";
  private _isClosed = false;

  constructor(manager: typeof OutputManager, initialContent: T) {
    this.manager = manager;
    this.content = initialContent;
  }

  setSeparator(separator: string, rerender?: boolean) {
    const prev = this.separator;
    this.separator = separator;
    if (rerender && prev !== separator) this.manager._rerender();
  }

  getContent(): string {
    return this.content.filter((e) => e).join(this.separator);
  }

  update(value: T | ((current: T) => T)) {
    if (this._isClosed) return;

    if (typeof value === "function") {
      this.content = value(this.content);
    } else {
      this.content = value;
    }

    this.manager._rerender();
  }

  close() {
    this._isClosed = true;
  }

  get isClosed() {
    return this._isClosed;
  }
}
