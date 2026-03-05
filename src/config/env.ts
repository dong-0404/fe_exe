/**
 * Environment Configuration
 * Centralized access to environment variables
 */

// Parse timeout với validation
const parseTimeout = (value: string | undefined, defaultValue: number): number => {
    if (!value) return defaultValue
    const parsed = Number(value)
    if (isNaN(parsed) || parsed <= 0) {
        console.warn(`⚠️ Invalid VITE_API_TIMEOUT value: "${value}", using default: ${defaultValue}ms`)
        return defaultValue
    }
    return parsed
}

export const env = {
    // API Configuration
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1/',
    apiTimeout: parseTimeout(import.meta.env.VITE_API_TIMEOUT, 120000),

    // WebSocket Configuration (Socket.io uses HTTP URL)
    wsBaseUrl: import.meta.env.VITE_WS_BASE_URL || 'http://localhost:3000',

    // Environment
    env: import.meta.env.VITE_ENV || import.meta.env.MODE || 'development',
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,

    // Feature Flags
    useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
} as const

// Validate required env variables
const requiredEnvVars = ['VITE_API_BASE_URL'] as const

export function validateEnv(): void {
    const missing = requiredEnvVars.filter(
        (key) => !import.meta.env[key]
    )

    if (missing.length > 0 && env.isProduction) {
        console.warn('⚠️ Missing environment variables:', missing)
    }
}

// Log config in development
if (env.isDevelopment) {
    console.log('🔧 Environment Config:', {
        apiBaseUrl: env.apiBaseUrl,
        apiTimeout: `${env.apiTimeout}ms`,
        env: env.env,
        useMockData: env.useMockData,
        rawTimeout: import.meta.env.VITE_API_TIMEOUT
    })
}

// Log timeout value in production để debug
if (env.isProduction) {
    console.log('⏱️ API Timeout:', `${env.apiTimeout}ms`, `(from env: ${import.meta.env.VITE_API_TIMEOUT || 'default'})`)
}

export default env

