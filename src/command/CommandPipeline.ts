import { CommandExecution } from "./CommandExecution";
import { CommandInput } from "./CommandInput";

export class CommandPipeline {

  private queue: CommandInput[] = [];
  private processing = false;

  constructor(
    private execution: CommandExecution
  ) { }

  pipe(command: CommandInput): void {
    this.queue.push(command);
    if (!this.processing) this._processNextCommand();
  }

  async _processNextCommand(): Promise<void> {
    this.processing = true;
    const command = this.queue.shift();
    if (command !== undefined) await this.execution.execute(command);
    if (this.queue.length > 0) this._processNextCommand();
    else this.processing = false;
  }

}