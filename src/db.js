import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "examen",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conectado a la base de datos");
    connection.release(); // Liberar la conexión al pool
  } catch (err) {
    console.error("Error de conexión con la base de datos:", err.message);
  }
})();

export default pool;
