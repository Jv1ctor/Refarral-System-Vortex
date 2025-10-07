import { ApiError, ParamErrorType } from "./Api.errors"

export class UnauthorizedError extends ApiError {
  constructor({ message }: ParamErrorType) {
    super(message, 401)
  }
}
