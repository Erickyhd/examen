import db from "../db.js";

export const registrarInmueble = async (req, res) => {
  const { proyecto_id, titulo, tipo, estado } = req.body;

  // Validar campos requeridos
  if (!proyecto_id || !titulo || !tipo) {
    return res
      .status(400)
      .json(["Los campos proyecto_id, titulo y tipo son obligatorios"]);
  }

  try {
    // Verificar existencia del proyecto
    const [proyecto] = await db.query("SELECT id FROM proyectos WHERE id = ?", [
      proyecto_id,
    ]);
    if (proyecto.length === 0) {
      return res.status(404).json([`No existe el proyecto con id ${proyecto_id}`]);
    }

    // Insertar inmueble
    const [result] = await db.query(
      "INSERT INTO inmuebles (proyecto_id, titulo, tipo, estado) VALUES (?, ?, ?, ?)",
      [proyecto_id, titulo, tipo, estado ?? 1]
    );

    const insertedId = result.insertId;
    const [rows] = await db.query("SELECT * FROM inmuebles WHERE id = ?", [
      insertedId,
    ]);

    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json(["Error interno al registrar el inmueble"]);
  }
};

export const obtenerInmuebles = async (req, res) => {
  const { proyecto_id } = req.query;

  try {
    let sql = "SELECT * FROM inmuebles";
    const params = [];

    if (proyecto_id) {
      // Validar que proyecto_id sea un número positivo
      if (isNaN(proyecto_id) || Number(proyecto_id) <= 0) {
        return res.status(400).json(["El proyecto_id debe ser un número positivo"]);
      }

      // Verificar existencia del proyecto
      const [proyecto] = await db.query("SELECT id FROM proyectos WHERE id = ?", [
        proyecto_id,
      ]);
      if (proyecto.length === 0) {
        return res.status(404).json([`No existe el proyecto con id ${proyecto_id}`]);
      }

      sql += " WHERE proyecto_id = ?";
      params.push(proyecto_id);
    }

    const [rows] = await db.query(sql, params);

    if (rows.length === 0) {
      return res.status(404).json(["No hay inmuebles registrados"]);
    }

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json(["Error interno al obtener inmuebles"]);
  }
};

export const obtenerUnInmueble = async (req, res) => {
  const { id } = req.params;

  // Validar id
  if (isNaN(id) || Number(id) <= 0) {
    return res.status(400).json(["El id debe ser un número positivo"]);
  }

  try {
    const [rows] = await db.query("SELECT * FROM inmuebles WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json(["No se encontró el inmueble"]);
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json(["Error interno al obtener el inmueble"]);
  }
};

export const actualizarInmueble = async (req, res) => {
  const { id } = req.params;
  const { titulo, tipo, estado, proyecto_id } = req.body;

  // Validar id
  if (isNaN(id) || Number(id) <= 0) {
    return res.status(400).json(["El id debe ser un número positivo"]);
  }

  // Validar campos obligatorios para actualizar (por ejemplo, aquí todos menos proyecto_id)
  if (!titulo || !tipo || estado === undefined) {
    return res.status(400).json([
      "Los campos titulo, tipo y estado son obligatorios para actualizar",
    ]);
  }

  try {
    // Si te interesa permitir actualizar proyecto_id, verifica que exista ese proyecto
    if (proyecto_id) {
      if (isNaN(proyecto_id) || Number(proyecto_id) <= 0) {
        return res.status(400).json(["El proyecto_id debe ser un número positivo"]);
      }
      const [proyecto] = await db.query("SELECT id FROM proyectos WHERE id = ?", [
        proyecto_id,
      ]);
      if (proyecto.length === 0) {
        return res.status(404).json([`No existe el proyecto con id ${proyecto_id}`]);
      }
    }

    // Actualizar inmueble
    const [result] = await db.query(
      proyecto_id
        ? "UPDATE inmuebles SET titulo = ?, tipo = ?, estado = ?, proyecto_id = ? WHERE id = ?"
        : "UPDATE inmuebles SET titulo = ?, tipo = ?, estado = ? WHERE id = ?",
      proyecto_id
        ? [titulo, tipo, estado, proyecto_id, id]
        : [titulo, tipo, estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json(["No se encontró el inmueble"]);
    }

    const [updated] = await db.query("SELECT * FROM inmuebles WHERE id = ?", [id]);
    return res.status(200).json(updated[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json(["Error interno al actualizar el inmueble"]);
  }
};

export const eliminarInmueble = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id) || Number(id) <= 0) {
    return res.status(400).json(["El id debe ser un número positivo"]);
  }

  try {
    const [result] = await db.query("DELETE FROM inmuebles WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json(["No se encontró el inmueble"]);
    }

    return res.status(200).json(["Inmueble eliminado correctamente"]);
  } catch (error) {
    console.error(error);
    return res.status(500).json(["Error interno al eliminar el inmueble"]);
  }
};