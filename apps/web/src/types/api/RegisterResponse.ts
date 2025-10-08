export type RegisterResponse =
  | {
      success: true
    }
  | {
      success: false
      error: string
    }