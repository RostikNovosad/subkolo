<script setup lang="ts">
const { t } = useI18n()
const toast = useToast()

const user = useSupabaseUser()

const { getProfile, updateProfile } = useProfileStore()
const { profile } = storeToRefs(useProfileStore())

const updateCurrentProfile = async () => {
    try {
        await updateProfile(user.value?.sub, profile.value)
        toast.add({
            severity: 'success',
            summary: t('notifications.success.success'),
            detail: t('notifications.success.wasUpdated'),
            life: 3000,
        })
        await getProfile(user.value.sub)
    } catch (error) {
        console.error(error)
    }
}

if (user.value?.sub) await getProfile(user.value.sub)

const connectTelegramBot = () => {
    if (!tgBotLink.value || tgBotLink.value === '#') {
        toast.add({
            severity: 'error',
            summary: t('notifications.errors.error'),
            detail: t('notifications.errors.error'),
            life: 3000,
        })
        return
    }
    window.open(tgBotLink.value, '_blank')
}

const tgBotLink = computed(() => {
    if (!profile.value?.telegram_token) return '#'
    return `https://t.me/SubKolo_bot?start=${profile.value.telegram_token}`
})

definePageMeta({
    layout: 'dashboard',
    middleware: 'auth',
})
</script>

<template>
    <div class="max-w-2xl mt-4">
        <h2 class="text-xl font-bold">{{ t('pages.notification') }}</h2>

        <div v-if="profile" class="flex flex-col gap-4 mt-4">
            <div
                class="flex flex-col gap-4 p-4 border rounded-xl bg-white shadow-sm"
            >
                <div class="flex flex-col gap-1">
                    <h3 class="font-semibold text-lg">
                        {{ t('notification.telegramBot') }}
                    </h3>
                    <p class="text-sm text-gray-500">
                        {{ t('notification.getNotification') }}
                    </p>
                </div>
                <Badge
                    v-if="profile?.is_tg_active"
                    variant="default"
                    :style="{
                        backgroundColor: '#10B981',
                    }"
                >
                    {{ t('statuses.active') }}
                </Badge>

                <Button
                    v-else
                    type="button"
                    @click="connectTelegramBot"
                    class="w-max bg-sky-500 hover:bg-sky-600"
                >
                    {{ t('actions.connectTelegram') }}
                </Button>
            </div>

            <div
                class="p-4 border rounded-xl bg-white shadow-sm flex items-center justify-between"
            >
                <div>
                    <h3 class="font-semibold">
                        {{ t('notification.emailNotification') }}
                    </h3>
                    <p class="text-sm text-gray-500">
                        {{ t('notification.sendNotificationTo') }}
                        {{ user?.email }}
                    </p>
                </div>
                <Checkbox
                    v-model="profile.email_notifications"
                    class="w-6 h-6"
                />
            </div>

            <Button type="button" @click="updateCurrentProfile" class="w-max">
                {{ t('actions.save') }}
            </Button>
        </div>

        <div v-else class="animate-pulse space-y-4">
            <div class="h-24 bg-gray-100 rounded-xl"></div>
            <div class="h-16 bg-gray-100 rounded-xl"></div>
        </div>
    </div>
</template>

<style scoped></style>
