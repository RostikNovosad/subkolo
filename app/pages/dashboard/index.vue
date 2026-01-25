<script setup lang="ts">
const user = useSupabaseUser()

definePageMeta({
    layout: 'dashboard',
    middleware: 'auth',
})
</script>

<template>
    <h1>dashboard</h1>
    <h1>Вітаю в кабінеті, {{ user?.email }}</h1>
</template>

<style scoped></style>
