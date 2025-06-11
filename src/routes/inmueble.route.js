import { Router } from "express";
import { actualizarInmueble, eliminarInmueble, obtenerInmuebles, obtenerUnInmueble, registrarInmueble } from "../controllers/inmueble.controller.js";


const rutaInmueble = Router();

rutaInmueble.post("/registroinmueble", registrarInmueble);
rutaInmueble.get("/inmuebles", obtenerInmuebles);
rutaInmueble.get("/inmuebles/:id", obtenerUnInmueble);
rutaInmueble.put("/inmuebles/:id", actualizarInmueble);
rutaInmueble.delete("/inmuebles/:id", eliminarInmueble);

export default rutaInmueble;