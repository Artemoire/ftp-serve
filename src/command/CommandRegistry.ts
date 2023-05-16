import { CommandAction } from "./CommandAction";

export type CommandRegistry = {
  [key: string]: CommandAction;
};
