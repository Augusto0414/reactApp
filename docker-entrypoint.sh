#!/bin/sh

# Crear el directorio config si no existe
mkdir -p /var/www/app/config

# Crear el archivo front.env.js dinámicamente
echo "Generando el archivo front.env.js..."
cat <<EOF > /var/www/app/config/front.env.js
window._env_ = {
  API_URL: "${API_URL:-http://localhost:8040}" // Valor predeterminado si no se pasa como variable
};
EOF

echo "Archivo front.env.js generado:"
cat /var/www/app/config/front.env.js

# Ejecutar el comando original (nginx)
exec "$@"
