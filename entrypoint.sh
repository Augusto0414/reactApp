#!/bin/sh

# Crea el archivo de configuración en el directorio público
echo "window.API_BASE_URL='${API_BASE_URL}';" > /app/config.js

# Ejecuta el comando especificado en el CMD
exec "$@"
