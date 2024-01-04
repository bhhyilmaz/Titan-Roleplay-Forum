const { rateLimit } = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10000,
	standardHeaders: true,
	legacyHeaders: false,
});

module.exports = limiter;

