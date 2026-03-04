<script setup lang="ts">
import { Calendar, Users, Crown, User } from 'lucide-vue-next'
import { useDateFormat } from '@vueuse/core'

const props = defineProps<{
    group: Group
    currentUserId: string
}>()

const { t } = useI18n()

const isOwner = computed(() => props.group.owner_id === props.currentUserId)
</script>

<template>
    <Card
        class="p-4 gap-5 relative overflow-hidden transition-all hover:shadow-md cursor-pointer border-t-4"
        :class="isOwner ? 'border-t-primary' : 'border-t-orange-400'"
        @click="navigateTo(`/dashboard/groups/${group.id}`)"
    >
        <div class="flex justify-between items-center mb-2">
            <Badge
                :variant="isOwner ? 'default' : 'secondary'"
                class="gap-1.5 font-medium"
            >
                <component :is="isOwner ? Crown : User" class="h-3.5 w-3.5" />
                {{ isOwner ? t('group.owner') : t('group.member') }}
            </Badge>

            <div
                class="flex items-center gap-1.5 text-sm font-medium text-muted-foreground"
            >
                <Users class="h-4 w-4" />
                <span>{{ group.members_count }} / {{ group.max_members }}</span>
            </div>
        </div>

        <CardHeader class="flex flex-row items-center gap-4 pb-2 !px-0 mt-2">
            <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xl"
            >
                {{ group.subscription.name.charAt(0) }}
            </div>
            <div class="min-w-0 flex-1">
                <CardTitle class="text-lg font-bold truncate">
                    {{ group.subscription.name }}
                </CardTitle>
                <CardDescription class="flex items-center gap-1">
                    {{ t('group.groupSubscription') }}
                </CardDescription>
            </div>
        </CardHeader>

        <CardContent class="!px-0 pt-2">
            <div class="flex flex-col gap-3 text-sm text-muted-foreground">
                <div
                    class="flex items-center gap-2 text-foreground font-medium"
                >
                    <Calendar class="h-4 w-4 text-primary" />
                    <span>
                        {{ t('subscription.nextBillingDate') }}:
                        {{
                            useDateFormat(
                                group.subscription.next_billing_date,
                                'DD-MM-YYYY'
                            ).value
                        }}
                    </span>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
