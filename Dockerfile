# Etapa 1: Construcción del proyecto
FROM node:18-alpine AS builder

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye el proyecto
RUN npm run build

# Etapa 2: Servidor de producción
FROM node:18-alpine

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos construidos desde la etapa de construcción
COPY --from=builder /app/dist /app

# Agrega el script de entrada en tiempo de ejecución
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expone el puerto de la aplicación
EXPOSE 3000

# Define la variable de entorno para la URL de la API
ENV API_BASE_URL=${API_BASE_URL}

# Ejecuta el script de entrada antes de iniciar el servidor
ENTRYPOINT ["/entrypoint.sh"]
CMD ["npx", "serve", "-s", ".", "-l", "3000"]
