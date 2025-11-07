# Instrucciones de Despliegue con Docker

## Requisitos Previos
- Docker instalado (versión 20.10 o superior)
- Docker Compose instalado (opcional, pero recomendado)

## Opción 1: Usando Docker directamente

### 1. Construir la imagen
```bash
docker build -t proj-openshift-web .
```

### 2. Ejecutar el contenedor
```bash
docker run -p 3000:3000 proj-openshift-web
```

### 3. Acceder a la aplicación
Abre tu navegador en: http://localhost:3000

### 4. Detener el contenedor
```bash
# Encontrar el ID del contenedor
docker ps

# Detener el contenedor
docker stop <CONTAINER_ID>
```

## Opción 2: Usando Docker Compose (Recomendado)

### 1. Construir y ejecutar
```bash
docker-compose up -d
```

### 2. Ver logs
```bash
docker-compose logs -f
```

### 3. Detener
```bash
docker-compose down
```

### 4. Reconstruir después de cambios
```bash
docker-compose up -d --build
```

## Configuración del Backend Externo

**IMPORTANTE**: Dado que la aplicación se conecta a `http://localhost:8080/api/personas`, necesitas ajustar la configuración de red.

### Solución 1: Usar la IP del host (Desarrollo local)

Si el backend corre en tu máquina local (fuera de Docker):

**En macOS/Windows:**
```bash
docker run -p 3000:3000 \
  -e BACKEND_URL=http://host.docker.internal:8080/api/personas \
  proj-openshift-web
```

**En Linux:**
```bash
docker run -p 3000:3000 \
  --add-host=host.docker.internal:host-gateway \
  -e BACKEND_URL=http://host.docker.internal:8080/api/personas \
  proj-openshift-web
```

### Solución 2: Red de Docker Compose

Si tanto el frontend como el backend están en Docker:

```yaml
version: '3.8'

services:
  backend:
    image: tu-backend-imagen
    ports:
      - "8080:8080"
    networks:
      - app-network

  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - BACKEND_URL=http://backend:8080/api/personas
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

## Despliegue en Producción

### Variables de Entorno Recomendadas
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e BACKEND_URL=https://tu-backend-api.com/api/personas \
  proj-openshift-web
```

### Usando archivo .env
Crea un archivo `.env.production`:
```
NODE_ENV=production
BACKEND_URL=https://tu-backend-api.com/api/personas
```

Luego ejecuta:
```bash
docker run -p 3000:3000 --env-file .env.production proj-openshift-web
```

## Verificación

### 1. Verificar que el contenedor está corriendo
```bash
docker ps
```

### 2. Ver logs en tiempo real
```bash
docker logs -f <CONTAINER_ID>
```

### 3. Inspeccionar el contenedor
```bash
docker inspect <CONTAINER_ID>
```

## Troubleshooting

### El contenedor no se conecta al backend
- Verifica que usas `host.docker.internal` en lugar de `localhost`
- Asegúrate que el backend esté corriendo
- Revisa los logs: `docker logs <CONTAINER_ID>`

### Error de construcción
- Limpia la caché: `docker build --no-cache -t proj-openshift-web .`
- Verifica que tienes espacio en disco: `docker system df`

### La aplicación no responde
- Verifica el puerto: `docker port <CONTAINER_ID>`
- Asegúrate que el puerto 3000 no esté ocupado: `lsof -i :3000`

## Comandos Útiles

```bash
# Limpiar imágenes no usadas
docker image prune -a

# Ver uso de recursos
docker stats

# Acceder al shell del contenedor
docker exec -it <CONTAINER_ID> sh

# Copiar archivos desde/hacia el contenedor
docker cp <CONTAINER_ID>:/app/file.txt ./local-file.txt
```
