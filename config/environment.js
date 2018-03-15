const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/holiday-planner-${env}`;

module.exports = { env, port, dbURI };
