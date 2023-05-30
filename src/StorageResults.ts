import { Failure } from "./Result";

export class InvalidPath extends Failure { static Result = new InvalidPath(); }
export class PathAlreadyExists extends Failure { static Result = new PathAlreadyExists(); }