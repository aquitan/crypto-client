export default class ApiError extends Error {
  status: number
  errors: string[]

  constructor(status: number, message: string, errors: string[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, 'unauthorized user')
  }

  static BadRequest() {
    return new ApiError(400, 'wrong data',)
  }

  static ServerError() {
    return new ApiError(500, 'internal server error')
  }

}