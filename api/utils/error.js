// handle error which are without third party lib
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  // create `statusCode`, `message` key to respond
  error.statusCode = statusCode;
  error.message = message;

  return error;
};
