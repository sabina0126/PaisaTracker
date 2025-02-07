module.exports = {
  schema: "./utils/schema.js",
  out: "./migrations",
  dialect: "postgresql",
  url: "postgresql://neondb_owner:npg_h7tGgIXPMpj3@ep-polished-poetry-a4juvzsl.us-east-1.aws.neon.tech/neondb?sslmode=require",
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
};
