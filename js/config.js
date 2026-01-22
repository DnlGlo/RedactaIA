// --- CONFIGURACIÓN GLOBAL ---
// Aquí es donde debes pegar tus claves reales para poner la web en producción.

export const CONFIG = {
    // 1. CONFIGURACIÓN DE PAGOS (PAYPAL)
    PAYPAL: {
        // Pega aquí tu Client ID de PayPal Developer (sección "Apps & Credentials")
        // Para producción, cambia esto por el ID "Live". Para pruebas usa el "Sandbox".
        CLIENT_ID: "test",
        CURRENCY: "USD",
        INTENT: "capture",
    },

    // 2. CONFIGURACIÓN DE AUTENTICACIÓN (GOOGLE)
    AUTH: {
        // Pega aquí tu Google Client ID de Google Cloud Console
        GOOGLE_CLIENT_ID: "TU_GOOGLE_CLIENT_ID_AQUI.apps.googleusercontent.com",
        // Define si estás usando Firebase, Auth0 o Custom Backend
        PROVIDER: "MOCK", // Cambiar a 'FIREBASE' o 'GOOGLE_IDENTITY' cuando integres el SDK real
    },

    // 3. CONFIGURACIÓN DE IA (GEMINI)
    // Esta variable se toma de las variables de entorno (process.env) por seguridad
    // pero puedes definir valores por defecto aquí si es necesario.
    AI: {
        MODEL_TEXT: "gemini-3-flash-preview",
    }
};
