module.exports = {
  schema: "./utils/schema.js",
  out: "./migrations",
  dialect: "postgresql",
  url: "postgresql://neondb_owner:npg_h7tGgIXPMpj3@ep-polished-poetry-a4juvzsl.us-east-1.aws.neon.tech/neondb?sslmode=require",
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
    url: "postgresql://paisa-tracker_owner:npg_Po5qeHBb4wrm@ep-twilight-king-a5ena0ly-pooler.us-east-2.aws.neon.tech/paisa-tracker?sslmode=require"
  },
};
