declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      DATABASE_URL: string
      PAYLOAD_SECRET: string
      UPLOADTHING_TOKEN: string
      POSTGRES_USER: string
      POSTGRES_DB: string
      POSTGRES_PASSWORD: string
      SMTP_USER: string
      SMTP_PASS: string
      SMTP_HOST: string
      SMTP_FROM: string
      SMTP_TO: string
      PRODUCTION_URL: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
