import { ApiError, ParamErrorType } from "./ApiError"

export class UnauthorizedError extends ApiError {
  constructor({ message }: ParamErrorType) {
    super(message, 401)
  }
}
