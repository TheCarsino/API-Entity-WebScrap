import rateLimit from "express-rate-limit";

export const limitto20 = rateLimit({
  windowMs: 1 * 60 * 1000, //One minute
  max: parseInt(process.env.MAX_REQUEST),
  message: {
    status: 429,
    message: "Too many requests from the API. Please try again in one minute",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
