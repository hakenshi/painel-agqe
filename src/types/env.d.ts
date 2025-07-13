declare namespace NodeJS {
    interface ProcessEnv {
        TZ?: string;
        DATABASE_URL: string
        JWT_SECRET: string
        CLOUDFLARE_R2_ACCESS_KEY_ID: string
        CLOUDFLARE_R2_SECRET_ACCESS_KEY: string
        CLOUDFLARE_R2_BUCKET: string
        CLOUDFLARE_R2_ACCOUNT_ID: string
        CLOUDFLARE_R2_ENDPOINT: string
        NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT: string
        NEXT_PUBLIC_MAIN_SITE: string
    }
}

type EventData = {
    name: string
    type: "event" | "gallery" | "event_gallery"
    location: string
    date: string
    starting_time: string
    ending_time: string
}
