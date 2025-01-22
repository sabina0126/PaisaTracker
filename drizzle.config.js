module.exports = {
  schema: "./utils/schema.js",
  out: "./migrations",
  dialect: "postgresql",
  url: "postgresql://paisa-tracker_owner:W48CwykoRUtr@ep-twilight-king-a5ena0ly-pooler.us-east-2.aws.neon.tech/paisa-tracker?sslmode=require",
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
};
