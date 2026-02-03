# 📌 Proyecto Examen – Sistema de Gestión de Proyectos e Inmuebles

Sistema Full Stack (Backend + Frontend) para la gestión de proyectos inmobiliarios, inmuebles y detalles asociados, utilizando una base de datos relacional.

---

## 🚀 Instalación

Clonar o descargar el repositorio:
```bash
git clone <url-del-repositorio>
```

Instalar dependencias:
```bash
npm install
```

Instalar nodemon (opcional):
```bash
npm install -g nodemon
```

Ejecutar el backend:
```bash
npm run dev
```

El backend corre en el puerto **3000**.

---

## 🛠️ Tecnologías Utilizadas

Backend:
- Node.js
- Express
- MySQL2
- Joi (validaciones)

Frontend:
- React
- Tailwind CSS
- React Router DOM
- Axios

Nota: Se utiliza una base de datos relacional.

---

## 🗄️ Base de Datos

```sql
CREATE DATABASE examen;
USE examen;

CREATE TABLE proyectos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  ubicacion VARCHAR(255) NOT NULL,
  descripcion TEXT,
  fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE inmuebles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  proyecto_id INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  estado TINYINT(1) DEFAULT 1,
  FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE detalles_inmuebles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inmueble_id INT NOT NULL,
  caracteristica VARCHAR(255) NOT NULL,
  valor VARCHAR(255) NOT NULL,
  FOREIGN KEY (inmueble_id) REFERENCES inmuebles(id) ON DELETE CASCADE
) ENGINE=InnoDB;
```

---

## 🔁 CRUD PROYECTOS

Listar proyectos  
GET  
http://localhost:3000/api/proyectos

Registrar proyecto  
POST  
http://localhost:3000/api/registroproyecto

```json
{
  "nombre": "Condominio Oasis",
  "ubicacion": "Cusco, Perú",
  "descripcion": "Viviendas modernas con seguridad privada",
  "fecha_inicio": "2025-09-10T05:00:00.000Z"
}
```

Actualizar / Eliminar proyecto  
PUT / DELETE  
http://localhost:3000/api/proyectos/{id}

```json
{
  "id": 2,
  "nombre": "Condominio Oasis",
  "ubicacion": "Cusco, Perú",
  "descripcion": "Viviendas modernas con seguridad privada",
  "fecha_inicio": "2025-09-10T05:00:00.000Z",
  "fecha_registro": "2025-06-10T19:50:25.000Z"
}
```

---

## 🏠 CRUD INMUEBLES

Listar inmuebles  
GET  
http://localhost:3000/api/inmuebles

Listar inmuebles por proyecto  
GET  
http://localhost:3000/api/inmuebles?proyecto_id=2

Registrar inmueble  
POST  
http://localhost:3000/api/registroinmueble

```json
{
  "proyecto_id": 2,
  "titulo": "Casa A11",
  "tipo": "Casa Unifamiliar",
  "estado": 1
}
```

Actualizar / Eliminar inmueble  
PUT / DELETE  
http://localhost:3000/api/inmuebles/{id}

```json
{
  "proyecto_id": 2,
  "titulo": "Casa A11",
  "tipo": "Casa Unifamiliar",
  "estado": 1
}
```

---

## 🧾 CRUD DETALLES INMUEBLES

Listar detalles  
GET  
http://localhost:3000/api/detalleinmuebles

Registrar detalle  
POST  
http://localhost:3000/api/detalleinmueble

```json
{
  "inmueble_id": 5,
  "caracteristica": "Vista panorámica",
  "valor": "Sí"
}
```

Actualizar / Eliminar detalle  
PUT / DELETE  
http://localhost:3000/api/detalleinmuebles/{id}

```json
{
  "inmueble_id": 5,
  "caracteristica": "precio",
  "valor": "120000"
}
```

---

Proyecto desarrollado con Node.js, React y MySQL.
