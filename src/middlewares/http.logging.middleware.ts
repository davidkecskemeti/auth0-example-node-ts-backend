import { logger } from "./../config/logger.config";

export const httpLogginMiddleware = (req, res, next) => {
  logger.info(
    `${req.method} ${req.url} ${JSON.stringify(req.params)} ${JSON.stringify(
      req.body
    )}`
  );
  next();
};
