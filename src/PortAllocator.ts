export abstract class PortAllocator {

  abstract allocate(): number;
  abstract free(port: number): void;


  static range(start: number, end: number) {
    return new PortRangeAllocator(start, end);
  }
}

class PortRangeAllocator extends PortAllocator {

  unused: number[];
  freed: number[] = [];

  constructor(
    start: number,
    end: number
  ) {
    super();
    this.unused = Array.from({ length: end - start + 1 }, (_, index) => index + start);
  }

  allocate(): number {
    const port = this.unused.shift();
    if (!port) throw "unreachable";
    if (this.unused.length === 0) this.swap();
    return port;
  }

  free(port: number): void {
    this.freed.push(port);
  }

  private swap(): void {
    this.unused = this.freed;
    this.freed = [];
  }

}

