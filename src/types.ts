export type RequestError = {
  info: any
  occurred: boolean
}

export const defaultError: RequestError = {
  info: null,
  occurred: false
}
