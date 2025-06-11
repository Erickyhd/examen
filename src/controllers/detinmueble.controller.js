import db from "../db.js";

// Registrar detalle del inmueble
export const registroDetalleInmueble = async (req, res) => {
  const { inmueble_id, caracteristica, valor } = req.body;

  // Validaciones básicas
  if (!inmueble_id || !caracteristica || !valor) {
    return res
      .status(400)
      .json([
        "Los campos inmueble_id, caracteristica y valor son obligatorios",
      ]);
  }

  if (isNaN(inmueble_id) || Number(inmueble_id) <= 0) {
    return res.status(400).json(["inmueble_id debe ser un número positivo"]);
  }

  try {
    // Verificar que el inmueble exista
    const [inmueble] = await db.query("SELECT id FROM inmuebles WHERE id = ?", [
      inmueble_id,
    ]);
    if (inmueble.length === 0) {
      return res.status(404).json([`No existe inmueble con id ${inmueble_id}`]);
    }

    // Insertar detalle
    const [result] = await db.query(
      "INSERT INTO detalles_inmuebles (inmueble_id, caracteristica, valor) VALUES (?, ?, ?)",
      [inmueble_id, caracteristica, valor]
    );

    if (!result.affectedRows) {
      return res
        .status(500)
        .json(["No se pudo agregar el detalle del inmueble"]);
    }

    const insertedId = result.insertId;
    const [rows] = await db.query(
      "SELECT * FROM detalles_inmuebles WHERE id = ?",
      [insertedId]
    );

    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(["Error interno al registrar el detalle del inmueble"]);
  }
};

// Mostrar detalles de inmuebles, opcionalmente filtrando por inmueble_id
export const mostrarDetalleInmueble = async (req, res) => {
  const { inmueble_id } = req.query;

  try {
    let consulta = "SELECT * FROM detalles_inmuebles";
    const params = [];

    if (inmueble_id) {
      if (isNaN(inmueble_id) || Number(inmueble_id) <= 0) {
        return res
          .status(400)
          .json(["inmueble_id debe ser un número positivo"]);
      }

      // Verificar que el inmueble exista
      const [inmueble] = await db.query(
        "SELECT id FROM inmuebles WHERE id = ?",
        [inmueble_id]
      );
      if (inmueble.length === 0) {
        return res
          .status(404)
          .json([`No existe inmueble con id ${inmueble_id}`]);
      }

      consulta += " WHERE inmueble_id = ?";
      params.push(inmueble_id);
    }

    const [rows] = await db.query(consulta, params);

    if (rows.length === 0) {
      return res.status(404).json(["No hay detalles del inmueble disponibles"]);
    }

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(["Error interno al obtener detalles del inmueble"]);
  }
};

// Mostrar detalle específico de inmueble por id
export const mostrarDetalleUnInmueble = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id) || Number(id) <= 0) {
    return res.status(400).json(["El id debe ser un número positivo"]);
  }

  try {
    const [result] = await db.query(
      "SELECT * FROM detalles_inmuebles WHERE id = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json(["No existe dicho detalle del inmueble"]);
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(["Error interno al obtener el detalle del inmueble"]);
  }
};

// Actualizar detalle del inmueble
export const actualizarDetalleInmueble = async (req, res) => {
  const { id } = req.params;
  const { caracteristica, valor } = req.body;

  if (isNaN(id) || Number(id) <= 0) {
    return res.status(400).json(["El id debe ser un número positivo"]);
  }
  if (!caracteristica || !valor) {
    return res
      .status(400)
      .json(["Los campos caracteristica y valor son obligatorios"]);
  }

  try {
    const [result] = await db.query(
      "UPDATE detalles_inmuebles SET caracteristica = ?, valor = ? WHERE id = ?",
      [caracteristica, valor, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json(["No existe dicho detalle del inmueble"]);
    }

    const [datosActualizados] = await db.query(
      "SELECT * FROM detalles_inmuebles WHERE id = ?",
      [id]
    );

    return res.status(200).json(datosActualizados[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(["Error interno al actualizar el detalle del inmueble"]);
  }
};

// Eliminar detalle del inmueble
export const eliminarDetalleInmueble = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id) || Number(id) <= 0) {
    return res.status(400).json(["El id debe ser un número positivo"]);
  }

  try {
    const [result] = await db.query(
      "DELETE FROM detalles_inmuebles WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json(["No existe dicho detalle del inmueble"]);
    }

    return res
      .status(200)
      .json(["Detalle del inmueble eliminado correctamente"]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(["Error interno al eliminar el detalle del inmueble"]);
  }
};
