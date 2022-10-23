class AppError extends Error {
  constructor(mesagge, statusCode) {
    super();
    this.mesagge = mesagge;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperatinal = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
