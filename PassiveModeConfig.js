class PassiveModeConfig {
  constructor(ports) {
    this.ports = ports;
    // this.free = [...ports]; // TODO: recycle ports
  }

  static range(min, max) {
    return new PassiveModeConfig(new Array(max - min + 1).fill(0).map((_, idx) => idx + min))
  }

  allocate() {
    return this.ports.pop();
  }
}

module.exports = { PassiveModeConfig };