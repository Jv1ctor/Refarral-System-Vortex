
export type LoginResponse = 
| {
  success: true,
  data: string
 }
| {
  success: false,
  error: string
}