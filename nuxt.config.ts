// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{zinc.50}',
            100: '{zinc.100}',
            200: '{zinc.200}',
            300: '{zinc.300}',
            400: '{zinc.400}',
            500: '{zinc.500}',
            600: '{zinc.600}',
            700: '{zinc.700}',
            800: '{zinc.800}',
            900: '{zinc.900}',
            950: '{zinc.950}',
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{zinc.950}',
                    inverseColor: '#ffffff',
                    hoverColor: '{zinc.800}',
                    activeColor: '{zinc.700}',
                },
                highlight: {
                    background: '{zinc.100}',
                    focusBackground: '{zinc.200}',
                    color: '{zinc.900}',
                    focusColor: '{zinc.900}',
                },
            },
        },
    },
})

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    ssr: false,

    runtimeConfig: {
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseKey: process.env.SUPABASE_KEY,
        },
    },

    css: [
        '~/assets/css/index.css',
        '~/assets/css/tailwind.css',
        '~/assets/css/landing.css',
    ],

    vite: {
        plugins: [tailwindcss()],
    },

    i18n: {
        // lazy: true,
        langDir: 'locales',
        defaultLocale: 'ua',
        strategy: 'prefix_except_default',
        locales: [
            { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
            { code: 'ua', iso: 'uk-UA', file: 'ua.json', name: 'Українська' },
        ],
        detectBrowserLanguage: false,
    },

    modules: [
        'shadcn-nuxt',
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@nuxt/icon',
        '@primevue/nuxt-module',
        '@nuxtjs/supabase',
        '@vite-pwa/nuxt',
    ],

    pinia: {
        storesDirs: ['stores'],
    },

    supabase: {
        redirect: false,
    },

    future: {
        compatibilityVersion: 4,
    },

    srcDir: 'app',

    dir: {
        pages: 'pages',
    },

    shadcn: {
        /**
         * Prefix for all the imported component.
         * @default "Ui"
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * Will respect the Nuxt aliases.
         * @link https://nuxt.com/docs/api/nuxt-config#alias
         * @default "@/components/ui"
         */
        componentDir: '@/components/ui',
    },

    primevue: {
        options: {
            theme: {
                preset: MyPreset,
                options: {
                    prefix: 'P',
                    darkModeSelector: false,
                    cssLayer: false,
                },
            },
        },
        components: {
            prefix: 'P',
            include: [
                'DataTable',
                'Column',
                'ColumnGroup',
                'Row',
                'Paginator',
                'Toast',
            ],
        },
    },

    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'SubKolo',
            short_name: 'SubKolo',
            theme_color: '#e3eff2',
            lang: 'uk',
            icons: [
                {
                    src: 'pwa-64x64.png',
                    sizes: '64x64',
                    type: 'image/png',
                },
                {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: 'maskable-icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                },
            ],
        },
        workbox: {
            navigateFallback: '/',
            cleanupOutdatedCaches: true,
        },
        devOptions: {
            enabled: true,
            type: 'module',
        },
    },

    imports: {
        dirs: ['stores', 'composables', 'types', 'components', 'utils'],
    },
})
