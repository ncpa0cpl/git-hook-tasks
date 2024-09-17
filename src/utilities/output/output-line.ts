import type { OutputManager } from "./output-manager";

export type Stringifyable = {
  toString(): string;
};

export class OutputEntry<T extends Array<Stringifyable | undefined>> {
  private manager: typeof OutputManager;
  private content: T;
  private separator = " ";
  private _isClosed = false;
  private _isDeleted = false;
  private contentMemo?: OutputLine[];

  constructor(manager: typeof OutputManager, initialContent: T) {
    this.manager = manager;
    this.content = initialContent;
  }

  setSeparator(separator: string, rerender?: boolean) {
    const prev = this.separator;
    this.separator = separator;
    this.contentMemo = undefined;
    if (rerender && prev !== separator) this.manager._rerender();
  }

  getContent(): readonly OutputLine[] {
    if (this.contentMemo) {
      return this.contentMemo;
    }

    this.contentMemo = this.content
      .filter((e) => e)
      .map((e) => String(e))
      .join(this.separator)
      .split("\n")
      .map((txt) => new OutputLine(this, txt));

    return this.contentMemo;
  }

  update(value: T | ((current: T) => T)) {
    if (this._isClosed) return;
    this.contentMemo = undefined;

    try {
      if (typeof value === "function") {
        this.content = value(this.content);
      } else {
        this.content = value;
      }

      this.manager._rerender();
    } catch {
      //
    }
  }

  delete() {
    this._isClosed = true;
    this._isDeleted = true;
    this.contentMemo = undefined;
    this.content = [] as any;

    this.manager._rerender();
  }

  close() {
    this._isClosed = true;
  }

  get isClosed() {
    return this._isClosed;
  }

  get isDeleted() {
    return this._isDeleted;
  }
}

export class OutputLine {
  public entryClosed: boolean;

  constructor(
    protected readonly entry: OutputEntry<any>,
    public readonly content: string
  ) {
    this.entryClosed = entry.isClosed;
  }
}
