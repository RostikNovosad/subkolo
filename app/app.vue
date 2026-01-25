<template>
    <NuxtLayout>
        <Toaster />
        <PToast />

        <NuxtPage />
    </NuxtLayout>
</template>
<script setup lang="ts">
import { Toaster } from '~/components/ui/sonner'

const toast = useToast()
</script>
