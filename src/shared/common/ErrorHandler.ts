export class ErrorHandler extends Error {
  statusCode: number

  constructor (status: number, message: string, name: string) {
    super(message)
    this.message = message
    this.name = name
    this.statusCode = status
  }
}
