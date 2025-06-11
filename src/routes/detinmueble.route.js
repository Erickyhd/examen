import { Router } from "express";
import {
  actualizarDetalleInmueble,
  eliminarDetalleInmueble,
  mostrarDetalleInmueble,
  mostrarDetalleUnInmueble,
  registroDetalleInmueble,
} from "../controllers/detinmueble.controller.js";

const rutaDetalleInmueble = Router();

rutaDetalleInmueble.post("/detalleinmueble", registroDetalleInmueble);
rutaDetalleInmueble.get("/detalleinmuebles", mostrarDetalleInmueble);
rutaDetalleInmueble.get("/detalleinmuebles/:id", mostrarDetalleUnInmueble);
rutaDetalleInmueble.put("/detalleinmuebles/:id", actualizarDetalleInmueble);
rutaDetalleInmueble.delete("/detalleinmuebles/:id", eliminarDetalleInmueble);

export default rutaDetalleInmueble;
