import { ApiError, ParamErrorType } from "./ApiError"

export class BadRequestError extends ApiError {
  constructor({ message }: ParamErrorType) {
    super(message, 400)
  }
}
