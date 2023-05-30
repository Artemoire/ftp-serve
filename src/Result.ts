export class Result {
}

export class Success extends Result { static Result = new Success(); }
export class Failure extends Result { static Result = new Failure(); }