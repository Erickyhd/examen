import db from "../db.js";

export const registrarProyecto = async (req, res) => {
  const { nombre, ubicacion, descripcion, fecha_inicio } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO proyectos (nombre, ubicacion, descripcion, fecha_inicio) VALUES (?, ?, ?, ?)",
      [nombre, ubicacion, descripcion, fecha_inicio]
    );
    if (!result.affectedRows) {
      return res.status(404).json(["No se agrego el proyecto"]);
    }

    const insertedId = result.insertId;
    const [rows] = await db.query("SELECT * FROM proyectos WHERE id = ?", [
      insertedId,
    ]);
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json(["Error al registrar el proyecto"]);
  }
};

export const obtenerProyectos = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM proyectos");

    if (!result.length) {
      return res.status(404).json(["No hay proyectos disponibles"]);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error en la consulta:", error);
    return res.status(500).json(["Error al obtener la lista de proyectos"]);
  }
};

export const obtenerUnProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("SELECT * FROM proyectos WHERE id = ?", [
      id,
    ]);
    if (!result.length) {
      return res.status(404).json(["No existe dicho proyecto"]);
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json(["Error al obtener este proyecto"]);
  }
};

export const actualizarProyecto = async (req, res) => {
  const { id } = req.params;
  const { nombre, ubicacion, descripcion, fecha_inicio } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE proyectos SET nombre = ?, ubicacion = ?, descripcion = ?, fecha_inicio = ? WHERE id = ?",
      [nombre, ubicacion, descripcion, fecha_inicio, id]
    );
    if (!result.affectedRows) {
      return res.status(404).json(["No existe dicho proyecto"]);
    }
    const datosActualizados = await db.query(
      "SELECT * FROM proyectos WHERE id = ?",
      [id]
    );
    return res.status(200).json(datosActualizados[0]);
  } catch (error) {
    return res.status(500).json(["Error al actualizar el proyecto"]);
  }
};

export const eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM proyectos WHERE id = ?", [id]);
    if (!result.affectedRows) {
      return res.status(404).json(["No existe dicho proyecto"]);
    } else {
      return res.status(200).json(["Proyecto eliminado"]);
    }
  } catch (error) {
    return res.status(500).json(["Error al eliminar el proyecto"]);
  }
};
