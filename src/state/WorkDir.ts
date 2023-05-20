export class WorkDir {

  constructor(
    public path: string = '/'
  ) { }

  toString() {
    return `"${this.path}" is the current directory`;
  }

}