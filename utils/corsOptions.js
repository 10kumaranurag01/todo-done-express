const corsOptions = {
  origin: "process.env.CLIENT_URL", // Allow requests from the client URL
  credentials: true,
};

module.exports = corsOptions;
