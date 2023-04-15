export const errorMessageFormat = (message, req, errorData) => ({
   status: req.statusCode === null ? undefined : req.statusCode,
   statusMessage: req.statusMessage === null ? undefined : req.statusMessage,
   message: message,
   path: req.originalUrl,
   error: errorData,
});
