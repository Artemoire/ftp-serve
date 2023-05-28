export class Timer {

  private timeout: NodeJS.Timeout | undefined;
  public expired: boolean = false;

  constructor(
    private callback: { (...args: any[]): void },
    private ms?: number
  ) {
  }

  start(ms?: number) {
    if (this.timeout) this.cancel();
    if (ms) this.ms = ms;
    this.expired = false;

    return new Promise<void>((resolve, reject) => {
      this.timeout = setTimeout(() => {
        this.callback();
        this.expired = true;
        resolve();
      }, this.ms);
    });
  }

  refresh() {
    if (!this.timeout) return this;
    if (this.expired) return this.start();
    this.timeout.refresh();
    return this;
  }

  cancel() {
    if (!this.timeout) return this;
    clearTimeout(this.timeout);
    return this;
  }

}