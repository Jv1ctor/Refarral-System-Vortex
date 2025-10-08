export type ApiErrorType = Error & {
  statusCode: number
  codeError?: string
}