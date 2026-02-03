const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:process.env.NODE_ENV === "production"? { rejectUnauthorized: false }: false,
});

// DB connection 
const connection = pool.connect();
  connection.then(client => {
    console.log("PostgreSQL Connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

module.exports = pool;
