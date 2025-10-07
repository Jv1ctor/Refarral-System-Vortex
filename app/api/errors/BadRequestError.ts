import { ApiError, ParamErrorType } from "./ApiError"

export class BadRequestError extends ApiError {
  constructor({ message, codeError }: ParamErrorType) {
    super(message, 400, codeError)
  }
}
