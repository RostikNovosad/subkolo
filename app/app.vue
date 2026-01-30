<template>
    <NuxtLayout>
        <PToast />
        <NuxtPage />
    </NuxtLayout>

    <div class="fixed bottom-6 right-6 z-50">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button
                    variant="outline"
                    class="h-12 w-12 rounded-full shadow-lg border-2 hover:scale-110 transition-transform bg-card text-xl"
                >
                    {{ currentFlag }}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="top"
                align="end"
                class="mb-1 min-w-0 w-fit p-2 rounded-full gap-2"
            >
                <DropdownMenuItem
                    v-for="lang in languages"
                    :key="lang.code"
                    class="cursor-pointer rounded-full"
                    :class="{ 'bg-muted': locale === lang.code }"
                    @click="setLocale(lang.code)"
                >
                    <span class="text-lg">{{ lang.flag }}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>
<script setup lang="ts">
const { locale, setLocale } = useI18n()

const languages = [
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
]

const currentFlag = computed(
    () => languages.find((lang) => lang.code === locale.value)?.flag
)
</script>
