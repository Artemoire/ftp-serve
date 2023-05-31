import { Failure } from "./Result";

export class ConnectionFailed extends Failure { static Result = new ConnectionFailed(); }