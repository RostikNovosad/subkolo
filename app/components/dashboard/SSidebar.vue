<script setup lang="ts">
const { t } = useI18n()
const supabase = useSupabaseClient()

const items = computed(() => {
    return [
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
})

const logout = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error

        await navigateTo('/login')
    } catch (e) {
        console.error('Помилка при виході:', e)
    }
}
</script>
<template>
    <Sidebar>
        <SidebarHeader>
            <nuxt-link to="/dashboard" class="flex items-center gap-2">
                <img
                    src="/slogo.svg"
                    alt="allio-logo"
                    class="rounded-sm max-h-[32px]"
                />
                <span class="truncate font-semibold">SubKolo</span>
            </nuxt-link>
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
            <Button @click="logout">
                <Icon name="lucide:log-out" size="24" />
                <span>
                    {{ t('auth.logout') }}
                </span>
            </Button>
        </SidebarFooter>
    </Sidebar>
</template>

<style scoped></style>
