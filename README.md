Instalacion: descarga el repositrio ejecucion del npm i para instalar las dependencias de desarrollo y npm i nodemon para mejor experiencia de la ejecucion del backend

El backend corre en el purto 3000, en lineas posteriores muestro las urls para consultas en postman


Herramientas usadas: -Backend: NodeJS: libreria Express DataBase: para la DB MySQL2 JOI: validaciones

-Frontend: React Tailwindcss React-router-dom: ruteo de paginas axios: para peticiones

Nota: es una BD relacional

-- Crear la base de datos
CREATE DATABASE examen;

-- Usar la base de datos
USE examen;

-- Crear la tabla de proyectos
CREATE TABLE proyectos (    
    id INT AUTO_INCREMENT PRIMARY KEY,    
    nombre VARCHAR(255) NOT NULL,    
    ubicacion VARCHAR(255) NOT NULL,    
    descripcion TEXT,    
    fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,    
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP    
) ENGINE=InnoDB;    

-- Crear la tabla de inmuebles
CREATE TABLE inmuebles (    
    id INT AUTO_INCREMENT PRIMARY KEY,    
    proyecto_id INT NOT NULL, -- Relación con proyectos
    titulo VARCHAR(255) NOT NULL,    
    tipo VARCHAR(50) NOT NULL,    
    estado TINYINT(1) DEFAULT 1, -- Representa disponibilidad (1 = disponible, 0 = no disponible)
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE    
) ENGINE=InnoDB;

-- Crear la tabla de detalles de inmuebles
CREATE TABLE detalles_inmuebles (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    inmueble_id INT NOT NULL, -- Relación con inmuebles  
    caracteristica VARCHAR(255) NOT NULL, -- Ejemplo: "Metros cuadrados"
    valor VARCHAR(255) NOT NULL, -- Ejemplo: "100m²"
    FOREIGN KEY (inmueble_id) REFERENCES inmuebles(id) ON DELETE CASCADE  
) ENGINE=INNODB;









CRUD PROYECTOS:
***
***
***




LISTAR PROYECTOS:
URL: https://localhost/3000/api/proyectos


REGISTRAR PROYECTOS:
http://localhost:3000/api/registroproyecto
cuerpo:
{
    "nombre": "Condominio Oasis",
    "ubicacion": "Cusco, Perú",
    "descripcion": "Viviendas modernas con espacios recreativos y seguridad privada.",
    "fecha_inicio": "2025-09-10T",
    "fecha_registro":--NO ES NECESARIO, ES AUTOMATICO
  },


ACTUALIZAR-ELIMINAR
URL: http://localhost:3000/api/proyectos/id
CUERPO
{
    "id": 2,
    "nombre": "Condominio Oasis",
    "ubicacion": "Cusco, Perú",
    "descripcion": "Viviendas modernas con espacios recreativos y seguridad privada.",
    "fecha_inicio": "2025-09-10T05:00:00.000Z",
    "fecha_registro": "2025-06-10T19:50:25.000Z"
  },


CRUD INMUEBLES:
***
***
***

LISTAR INMUEBLES:
http://localhost:3000/api/inmuebles

LISTAR INMUEBLES POR PROYECTO
ejemplo: http://localhost:3000/api/inmuebles?proyecto_id=2

AGREGAR INMUEBLE
URL: registroinmueble
CUERPO:
  {
    "proyecto_id": 2,
    "titulo": "Casa A11",
    "tipo": "Casa Unifamiliar",
    "estado": 1
  }


ACTUALIZAR-ELIMINAR
URL:http://localhost:3000/api/inmuebles/id
CUERPO:
  {
    "proyecto_id": 2,
    "titulo": "Casa A11",
    "tipo": "Casa Unifamiliar",
    "estado": 1
  }



CRUD DETALLES INMUEBLES
***
***

LISTAR DETALLES:
URL: http://localhost:3000/api/detalleinmuebles


AGREGAR DETALLES: (se peude agregar todo como precio, extencion, etc.)
url: http://localhost:3000/api/detalleinmueble
cuerpo:
  {
    "inmueble_id": 5,
    "caracteristica": "Vista panorámica",
    "valor": "Sí"
  }


EDITAR -ELIMINAR
URL: http://localhost:3000/api/detalleinmuebles/id
CUERPO:
  {
    "inmueble_id": 5,
    "caracteristica": "precio",
    "valor": "120000"
  }














