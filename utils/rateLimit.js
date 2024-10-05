const rateLimit = require("express-rate-limit");

const RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS || 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = process.env.RATE_LIMIT_MAX_REQUESTS || 100; // 100 requests

const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS, // Time frame for the rate limit
  max: RATE_LIMIT_MAX_REQUESTS, // Limit each IP to a maximum number of requests
  standardHeaders: "draft-7",
  legacyHeaders: false,

  handler: (req, res) => {
    console.warn(`Rate limit exceeded for IP: ${req.ip}`);

    res.status(429).json({
      error: true,
      message: "Too many requests, please try again later.",
      currentLimit: RATE_LIMIT_MAX_REQUESTS,
      timeWindow: `${RATE_LIMIT_WINDOW_MS / 1000} seconds`,
    });
  },
});

module.exports = limiter;
