const errorHandler = (ctx, next) => {
  return next().catch(err => {
    console.log(err);
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message
      };
    } else {
      throw err;
    }
  });
};
module.exports = errorHandler;
