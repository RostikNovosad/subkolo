<script setup lang="ts">
const open = ref(false)

definePageMeta({
    layout: 'dashboard',
})
</script>

<template>
    <main>
        <SidebarProvider :style="{ '--sidebar-width': '12rem' }">
            <DashboardSSidebar class="hidden sm:flex" />
            <div class="w-full p-4">
                <SidebarInset class="block md:hidden">
                    <SidebarTrigger class="-ml-1" />
                </SidebarInset>
                <slot />
            </div>
        </SidebarProvider>
    </main>
</template>

<style scoped></style>
