// handle error which are without third party lib
export const errorHandler = (statusCode, message, stack) => {
  const error = new Error();
  // create `statusCode`, `message` key to respond
  error.statusCode = statusCode;
  error.message = message;
  error.stack = process.env.NODE_ENV === "production" ? null : err.stack;

  return error;
};
