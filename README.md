# Task Manager API

API para la gestión de usuarios y tareas, implementando buenas practicas y arquitectura hexagonal con soporte de manejo de errores centralizado, filtrado de tareas y soft delete.

## Instalación

### Requisitos

- Node.js >= 18
- npm >= 9
- PostgreSQL (si no se usa Docker)

### Usando Docker

1. Levantar los servicios con Docker Compose:
```bash
docker-compose up -d
```
Esto levantará la base de datos y la aplicación automáticamente.

### Sin Docker

Crear la base de datos en PostgreSQL:

```bash

CREATE DATABASE task_manager;
```

Configurar las variables de entorno en un archivo .env puedes copiar el archivo `.env.example`:
```bash
DATABASE_URL=postgres://postgres:123@postgres:5432/task_manager
PORT=3000
```


Instalar dependencias:
```bash
npm install
```


Ejecutar las migraciones de TypeORM:
```bash
npm run migration:run
```

Levantar la aplicación:
```bash
npm run start:dev
```

Documentación de la API:

```bash
http://localhost:3000/api-docs
```

## Endpoints

### 1. Usuarios

- **Crear usuario**  
  `POST /api/v1/users`  
  Crea un nuevo usuario.

### 2. Tareas

- **Crear tarea**  
  `POST /api/v1/tasks`  
  Crea una nueva tarea para un usuario.

- **Listar tareas de un usuario**  
  `GET /api/v1/tasks/user/:userId`  
  Obtiene todas las tareas asociadas a un usuario específico.

- **Eliminar tarea**  
  `DELETE /api/v1/tasks/:id`  
  Elimina una tarea. Esta operación implementa **soft delete**, marcando la tarea como inactiva en lugar de borrarla físicamente.

- **Cambiar estado de una tarea**  
  `PATCH /api/v1/tasks/:id`  
  Actualiza el estado de una tarea específica.

---

## Explicación de decisiones técnicas

La arquitectura de este proyecto está basada en **Arquitectura Hexagonal (Ports & Adapters)**, lo que permite una separación clara de responsabilidades, escalabilidad y facilidad de mantenimiento.

### 1. División en capas

Cada módulo está organizado en **tres capas principales**:

* **Dominio (`domain`)**:  
  Contiene la lógica de negocio pura del módulo.

  * **Entities**: Definición de las entidades principales del módulo.  
  * **Value Objects (OV)**: Objetos de valor que encapsulan reglas de negocio específicas.  
  * **Excepciones**: Errores específicos del dominio, encapsulados dentro del módulo.  
  * **Repository**: Interfaz de acceso a datos, encapsulando la lógica de persistencia.  

* **Aplicación (`application`)**:  
  Contiene los casos de uso y la orquestación de la lógica de negocio. Cada caso de uso interactúa con las interfaces definidas en el dominio y con la infraestructura a través de adaptadores.

* **Infraestructura (`infrastructure`)**:  
  Implementa detalles técnicos específicos de NestJS y se divide en:

  * **http**: Implementación de las rutas de la API REST, DTOs, documentación y validaciones.  
  * **persistence**: Consultas a la base de datos y entidades.  
  * **module**: Configuración específica de NestJS y definición de dependencias de la aplicación.  

### 2. Módulo compartido (`shared-domain`)

Se creó un módulo compartido con clases base y utilidades reutilizables:

* **BaseEntity**: Implementa automáticamente lógica de **soft delete**, campos comunes y métodos reutilizables.  
* **BaseException**: Clase base para manejar excepciones de forma consistente.  
* **Interfaces**: Clases de interfaces para reutilizar en distintos módulos.  
* Objetos de valor y utilidades globales reutilizables entre módulos.  

### 3. Módulo compartido (`shared-infrastructure`)

Se creó un módulo compartido para manejar la generación de UUIDs y otros casos de infraestructura reutilizables en distintos módulos.

### 4. Otras decisiones técnicas

* **Soft delete centralizado**: Gracias a la BaseEntity, cualquier entidad que extienda esta clase maneja el campo `deletedAt` automáticamente.  
* **Manejo de errores centralizado**: Cada módulo define sus propias excepciones, pero todas se mapean a respuestas HTTP de forma consistente mediante un filtro global (`exception.mapper.ts`).  
* **Filtrado y consultas**: La lógica de filtrado es extensible y reutilizable entre módulos, respetando la separación de capas.  
* **Migraciones**: Se implementan migraciones para facilitar el mantenimiento de la base de datos en producción.

### Ejemplos de Requests y Responses

**Listar tareas de un usuario**

- **Request**
```http
GET http://localhost:3000/api/v1/tasks/user/6f88436d-f93e-4d15-a6db-91f0fc4de92c?showDeleted=false
````

* **Response**

```json
[
  {
    "id": "53d7b727-f8b1-4c20-ba8c-4312fe48614c",
    "name": "Planificación de la sprint 5",
    "description": "Definir historias de usuario, estimar puntos y asignar responsables.",
    "status": "IN_PROGRESS",
    "dueDate": "Tue Dec 30 2025",
    "createdAt": "Sat Oct 04 2025",
    "updatedAt": "Sat Oct 04 2025",
    "deletedAt": null
  }
]
```

> Nota: El parámetro `showDeleted=false` filtra las tareas eliminadas (soft delete). Si se pone `true`, también se incluirán las tareas con `deletedAt` distinto de `null`.


**Otros endpoints** (crear usuario, crear tarea, cambiar estado, eliminar tarea)

* **Request**: POST, PATCH o DELETE según corresponda.
* **Response**:

```http
HTTP/1.1 200 OK
```

> Si ocurre un error, la API devuelve un JSON con el mensaje de error y el código HTTP correspondiente, manejado por el filtro global (`exception.mapper.ts`).

Ejemplo de un error:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "No se ha encontrado el usuario con id: da560d40-fde7-4452-a4b2-99cb7d45a12a",
  "data": {
    "id": "da560d40-fde7-4452-a4b2-99cb7d45a12a"
  },
  "path": "/api/v1/tasks/user/da560d40-fde7-4452-a4b2-99cb7d45a12a",
  "timestamp": "2025-10-05T17:11:55.263Z"
}
```

