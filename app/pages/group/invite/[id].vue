<script setup lang="ts">
const { t } = useI18n()

const route = useRoute()
const token = route.params.id as string

const { getInvite, joinGroup } = useGroupStore()
const { invite } = storeToRefs(useGroupStore())
const user = useSupabaseUser()

const isError = ref(false)
const currencies = useGetCurrencies()
const billingTypes = useGetBillingTypes()

const fetchData = async () => {
    await getInvite(token)
    if (!invite.value) isError.value = true
}

const handleJoin = async () => {
    if (!user.value) {
        return navigateTo(`/login?redirect=${route.fullPath}`)
    }

    try {
        const payload = {
            user_id: user.value.sub,
            group_id: invite.value.group_id,
            display_name: user.value.email,
            assigned_cost: invite.value.price_to_set,
        }
        await joinGroup(payload, token)

        navigateTo(`/dashboard/groups/${invite.value.group_id}`)
    } catch (e) {
        console.error('Join failed', e)
    }
}

await fetchData()
</script>

<template>
    <div
        class="h-[100dvh] w-full bg-muted/20 flex items-center justify-center p-6"
    >
        <div
            v-if="invite"
            class="w-full max-w-[380px] bg-background rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-border/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
            <div class="p-8 pb-8 flex flex-col items-center text-center">
                <div class="mb-6 relative">
                    <div
                        class="w-16 h-16 rounded-3xl bg-primary rotate-3 flex items-center justify-center shadow-lg shadow-primary/20"
                    >
                        <Icon
                            name="lucide:layers"
                            class="w-8 h-8 text-primary-foreground -rotate-3"
                        />
                    </div>
                    <div
                        class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-sm border border-border"
                    >
                        <Icon
                            name="lucide:check"
                            class="w-4 h-4 text-primary"
                        />
                    </div>
                </div>

                <div class="space-y-1">
                    <h1
                        class="text-3xl font-black uppercase tracking-tighter text-foreground leading-none"
                    >
                        {{ invite.subscription_name }}
                    </h1>
                    <p class="text-sm font-medium text-muted-foreground">
                        {{ t('invite.inviteFrom') }}
                        <span class="text-primary font-bold">
                            {{ invite.owner_name }}
                        </span>
                    </p>
                </div>
            </div>

            <div class="px-6">
                <div
                    class="bg-secondary/40 rounded-[32px] p-8 border border-border/40 relative overflow-hidden"
                >
                    <div
                        class="absolute top-0 right-0 p-4 opacity-10 rotate-12"
                    >
                        <Icon
                            name="lucide:wallet"
                            class="w-24 h-24 text-background"
                        />
                    </div>

                    <div
                        class="flex items-center justify-center gap-2 relative z-10 text-black"
                    >
                        <span
                            class="text-7xl font-black tracking-tighter leading-none italic"
                        >
                            {{ invite.price_to_set }}
                        </span>
                        <div class="flex flex-col">
                            <span
                                class="text-xl font-black leading-none uppercase"
                            >
                                {{
                                    currencies.find(
                                        (el) => el.id === invite.currency
                                    )?.name
                                }}
                            </span>
                            <span
                                class="text-[10px] font-bold opacity-50 uppercase"
                                >/
                                {{
                                    billingTypes.find(
                                        (el) => el.id === invite.billing_type
                                    )?.period
                                }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-8 pt-10 flex flex-col gap-4">
                <Button
                    class="w-full h-16 rounded-[24px] text-lg font-bold shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 bg-primary"
                    @click="handleJoin"
                >
                    {{ t('actions.join') }}
                </Button>
            </div>
        </div>

        <div
            v-else
            class="w-full max-w-[380px] bg-background rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-border/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
            <div class="p-10 flex flex-col items-center text-center">
                <div class="mb-8 relative">
                    <div
                        class="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center"
                    >
                        <Icon
                            name="lucide:link-2-off"
                            class="w-10 h-10 text-destructive"
                        />
                    </div>
                </div>

                <div class="space-y-3 mb-10">
                    <h2
                        class="text-2xl font-black uppercase tracking-tighter text-foreground italic"
                    >
                        {{ t('invite.expired') }}
                    </h2>
                </div>

                <Button
                    variant="outline"
                    class="w-full h-14 rounded-[24px] text-sm font-bold border-2 hover:bg-secondary transition-all active:scale-95"
                    @click="navigateTo('/')"
                >
                    {{ t('actions.backToMain') }}
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
