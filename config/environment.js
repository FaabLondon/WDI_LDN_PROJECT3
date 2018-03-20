const env = process.env.NODE_ENV || 'test';
const port = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/holiday-planner-${env}`;
const secret = process.env.SECRET || '*Ghs/L@GabsOes';

module.exports = { env, port, dbURI, secret };
