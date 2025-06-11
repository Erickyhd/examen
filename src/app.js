import express from "express";
import morgan from "morgan";
import cors from "cors";
import rutaProyecto from "./routes/proyecto.route.js";
import rutaInmueble from "./routes/inmueble.route.js";
import rutaDetalleInmueble from "./routes/detinmueble.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", rutaProyecto);
app.use("/api", rutaInmueble);
app.use("/api", rutaDetalleInmueble);

app.get("/", (req, res) => {
  res.send("App corriendo en correctamente");
});

export default app;
