<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const user = ref({
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
})
const items = [
    {
        title: t('pages.subscription'),
        url: '/dashboard/subscription',
        icon: 'mingcute:bill-fill',
    },
    {
        title: t('pages.group'),
        url: '/dashboard/groups',
        icon: 'flowbite:users-group-solid',
    },
]
</script>
<template>
    <Sidebar>
        <SidebarHeader>
            <div class="flex items-center gap-2">
                <div
                    class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                ></div>
                <span class="truncate font-semibold">SubKolo</span>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem
                            v-for="item in items"
                            :key="item.title"
                        >
                            <SidebarMenuButton as-child>
                                <NuxtLink
                                    :to="item.url"
                                    class="flex items-center gap-2"
                                    active-class="bg-black text-white"
                                >
                                    <Icon :name="item.icon" size="20" />
                                    <span>{{ item.title }}</span>
                                </NuxtLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <DashboardSNavUser :user="user" />
        </SidebarFooter>
    </Sidebar>
</template>

<style scoped></style>
