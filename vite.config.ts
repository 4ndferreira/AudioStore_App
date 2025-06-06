import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin({
      // Uses 'development' if the NODE_ENV environment variable is not defined.
      NODE_ENV: 'development',
      // Have in mind that variables coming from process.env are always strings.
      DEBUG: 'false',
      // Required: will fail if the API_KEY environment variable is not provided.
      API_KEY: undefined,
      // Required: will fail if the AUTH_DOMAIN environment variable is not provided.
      AUTH_DOMAIN: undefined, 
      // Required: will fail if the PROJECT_ID environment variable is not provided.
      PROJECT_ID: undefined,
      // Required: will fail if the STORAGE_BUCKET environment variable is not provided.
      STORAGE_BUCKET: undefined,
      // Required: will fail if the MESSAGING_SENDER_ID environment variable is not provided.
      MESSAGING_SENDER_ID: undefined,
      // Required: will fail if the APP_ID environment variable is not provided.
      APP_ID: undefined,
      // Optional: will not fail if the APP_VERSION environment variable is missing.
      APP_VERSION: null,
    }),
  ],
  
})