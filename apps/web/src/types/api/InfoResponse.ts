import type { UserData } from "../userData"

export type InfoResponse =
  | {
      success: true
      data: UserData
    }
  | {
      success: false
      error: string
    }
