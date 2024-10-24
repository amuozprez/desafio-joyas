const logMiddleware = (req, res, next) => {
    console.log(`Ruta consultada: ${req.method} ${req.originalUrl}`);
    next();
  };
  
  module.exports = logMiddleware;
  