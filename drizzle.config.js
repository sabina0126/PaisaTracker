module.exports = {
  schema: "./utils/schema.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
    url: "postgresql://paisa-tracker_owner:npg_Po5qeHBb4wrm@ep-twilight-king-a5ena0ly-pooler.us-east-2.aws.neon.tech/paisa-tracker?sslmode=require"
  },
};
