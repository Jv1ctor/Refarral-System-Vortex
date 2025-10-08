
export type ReturnServiceType<T> = Promise<{ success: true, data: T, error: null } | { success: false, data: null, error: string }>