<script setup lang="ts">
import {
    Crown,
    User,
    MailQuestion,
    Copy,
    XCircle,
    Trash,
} from 'lucide-vue-next'
import { useDateFormat, useTimeAgo } from '@vueuse/core'
const { t } = useI18n()
interface Member {
    id?: string
    token?: string
    display_name?: string
    assigned_cost?: number
    price_to_set: number
    type: 'owner' | 'member' | 'virtual' | 'invite'
    joined_at?: string
    created_at?: string // для інвайтів
}

const props = defineProps<{
    member: Member
    isOwnerOfGroup: boolean
    currency?: string
}>()

const emit = defineEmits<{
    (e: 'remove', value: string): void
    (e: 'removeInvite', value: string): void
    (e: 'copyInvite', value: string): void
}>()

const isInvite = computed(() => props.member.type === 'invite')

// Розрахунок часу (скільки днів у групі або як давно створено інвайт)
const timeLabel = computed(() => {
    const date = props.member.joined_at || props.member.created_at
    if (!date) return ''
    return useTimeAgo(date).value
})
</script>

<template>
    <Card
        v-if="isInvite"
        class="relative overflow-hidden transition-all border-2 border-dashed border-muted-foreground/30 bg-muted/20 flex flex-col justify-between p-4 min-h-[140px] gap-4"
    >
        <div class="flex justify-between items-start">
            <Badge
                variant="outline"
                class="text-[10px] bg-background/50 uppercase tracking-wider"
            >
                {{ t('statuses.pendingApprove') }}
            </Badge>
            <div class="flex gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8"
                    @click="$emit('copyInvite', member.token)"
                >
                    <Copy class="h-4 w-4" />
                </Button>
                <Button
                    v-if="isOwnerOfGroup"
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8"
                    @click="$emit('removeInvite', member.token)"
                >
                    <XCircle class="h-4 w-4" />
                </Button>
            </div>
        </div>

        <div class="flex items-center gap-2 my-2">
            <MailQuestion class="h-5 w-5 text-muted-foreground" />
            <span class="text-sm font-medium text-muted-foreground truncate">
                {{ t('statuses.pendingApprove') }}...
            </span>
        </div>

        <div
            class="pt-2 border-t border-muted-foreground/10 flex justify-between items-end"
        >
            <span
                class="text-[10px] text-muted-foreground uppercase tracking-wider"
                >Сума:</span
            >
            <span class="text-lg font-bold text-muted-foreground">
                {{ member.price_to_set }}
                <span class="text-[10px] ml-0.5">{{ currency }}</span>
            </span>
        </div>
    </Card>

    <Card
        v-else
        class="group relative overflow-hidden transition-all border-none shadow-sm bg-secondary/30 flex flex-col gap-2 justify-between p-4 min-h-[140px] hover:bg-secondary/50"
    >
        <div class="flex justify-between">
            <div class="flex items-center gap-2 my-2">
                <div
                    class="h-2 w-2 rounded-full"
                    :class="
                        member.type === 'owner' ? 'bg-primary' : 'bg-green-500'
                    "
                ></div>
                <span class="font-bold truncate text-sm flex-1">{{
                    member.display_name
                }}</span>
                <Crown
                    v-if="member.type === 'owner'"
                    class="h-3.5 w-3.5 text-primary"
                />
            </div>

            <Button
                v-if="isOwnerOfGroup && member.type !== 'owner'"
                variant="ghost"
                size="icon"
                class="h-7 w-7 text-destructive hover:bg-destructive/10"
                @click="$emit('remove', member.id)"
            >
                <Trash class="h-3.5 w-3.5" />
            </Button>
        </div>

        <div
            class="pt-2 border-t border-muted-foreground/10 flex justify-between items-end"
        >
            <span
                class="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold"
            >
                {{ member.type === 'owner' ? 'Ваша частка:' : 'До сплати:' }}
            </span>
            <span
                class="text-[32px] font-black tracking-tight"
                :class="member.type === 'owner' ? 'text-primary' : ''"
            >
                {{ member.assigned_cost
                }}<span
                    class="text-[12px] ml-0.5 font-normal text-muted-foreground"
                    >{{ currency }}</span
                >
            </span>
        </div>
    </Card>
</template>
