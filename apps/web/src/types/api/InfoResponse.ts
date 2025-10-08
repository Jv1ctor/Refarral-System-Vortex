export type InfoResponse =
  | {
      success: true
      data: {
        codeReferral: string
        email: string
        name: string
        score: number
      }
    }
  | {
      success: false
      error: string
    }
