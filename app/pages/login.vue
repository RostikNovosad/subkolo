<script setup lang="ts">
import { GalleryVerticalEnd } from 'lucide-vue-next'
import LoginForm from '@/components/LoginForm.vue'
</script>

<template>
    <div class="grid min-h-svh lg:grid-cols-2">
        <div class="bg-muted relative hidden lg:block">
            <img
                src="/slogin.svg"
                alt="Image"
                class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
        <div class="flex flex-1 items-center justify-center p-6 md:p-10">
            <div class="w-full max-w-xs">
                <LoginForm />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
