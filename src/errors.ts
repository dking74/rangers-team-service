export class HttpError extends Error {
  code: number;

  constructor(statusCode: number, message: string) {
    super();

    this.code = statusCode;
    this.message = message;
  }
}

export class BadRequestHttpError extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}

export class NotFoundHttpError extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}

export class ServerErrorHttpError extends HttpError {
  constructor(message: string) {
      super(500, message);
  }
}