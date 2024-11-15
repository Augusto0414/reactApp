declare global {
    interface Window {
        _env_?: { [key: string]: string };
    }
}

export const API_URL =
    window?._env_?.API_URL || // Configuración dinámica (inyectada por `front.env.js`).
    import.meta.env.VITE_API_URL || // Configuración estática (usada por Vite).
    "http://localhost:8040"; // Valor predeterminado.
