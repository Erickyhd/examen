import { Router } from "express";
import {
  actualizarProyecto,
  eliminarProyecto,
  obtenerProyectos,
  obtenerUnProyecto,
  registrarProyecto,
} from "../controllers/proyecto.controller.js";

const rutaProyecto = Router();

rutaProyecto.post("/registroproyecto", registrarProyecto);
rutaProyecto.get("/proyectos", obtenerProyectos);
rutaProyecto.get("/proyectos/:id", obtenerUnProyecto);
rutaProyecto.put("/proyectos/:id", actualizarProyecto);
rutaProyecto.delete("/proyectos/:id", eliminarProyecto);

export default rutaProyecto;
