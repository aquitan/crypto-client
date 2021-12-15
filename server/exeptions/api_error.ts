export default class ApiError extends Error {
  status
  errors

  constructor(status: number, message: string, errors: string[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, 'unauthorized user')
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new ApiError(400, message, errors)
  }

  static ServerError() {
    return new ApiError(500, 'internal server error')
  }

}