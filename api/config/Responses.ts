export const Responses = {
  deleted: {
    name: "Ok",
    status: 200,
    message: "Resource deleted successfully."
  },
  success: {
    name: "Ok",
    status: 200,
    message: "Response status OK."
  },
  created: {
    name: "Created",
    status: 201,
    message: "The request has been fulfilled and has resulted in one or more new resources being created."
  },
  emptyField: {
    name: "No Content",
    status: 204,
    message: "The field provided in the body is empty."
  },
  badRequest: {
    name: "BadRequest",
    status: 400,
    message: "Request has wrong format."
  },
  regexEmailError: {
    name: "BadRequest",
    status: 400,
    message: "Email address has wrong format"
  },
  regexPasswordError: {
    name: "BadRequest",
    status: 400,
    message: "Password address has wrong format"
  },
  unauthorized: {
    name: "Unauthorized",
    status: 401,
    message: "Authentication credentials not valid."
  },
  forbidden: {
    name: "Forbidden",
    status: 403,
    message: "You're missing permission to execute this request."
  },
  notFound: {
    name: "Not Found",
    status: 404,
    message: "The requested resource was not found."
  },
  conflict: {
    name: "Conflict",
    status: 409,
    message: "An account with the following email is already in use."
  },
  expiredSession: {
    name: "Login Timeout",
    status: 440,
    message: "Your session has expired."
  },
  notImplemented: {
    name: "Not implemented",
    status: 501,
    message: "This method was not implemented"
  }
}
