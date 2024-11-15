FROM node:lts-bullseye as build
WORKDIR /app
COPY package*.json ./

# Instala dependencias específicas
RUN npm ci
COPY . .
RUN npm run build

### Stage 2: NGINX
FROM nginx:alpine

# Copia el archivo de configuración de NGINX
ADD ./config/default.conf /etc/nginx/conf.d/default.conf

# Copia los archivos de construcción
COPY --from=build /app/dist /var/www/app/

# Agrega el script docker-entrypoint.sh
COPY ./docker-entrypoint.sh /usr/bin/docker-entrypoint.sh
RUN chmod +x /usr/bin/docker-entrypoint.sh

EXPOSE 80

# Usar el script de entrada
ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
