<script setup lang="ts">
import { Calendar, MoreVertical, Pencil, Trash } from 'lucide-vue-next'
import { useGetCurrencies } from '~/composables/useGetCurrencies'
import type { Subscription } from '~/stores/subscriptions'
import { useDateFormat } from '@vueuse/core'
const props = defineProps<{
    subscription: Subscription
}>()
const { t } = useI18n()

const emit = defineEmits<{
    update: () => void
    delete: () => void
}>()
const currencies = useGetCurrencies()
const statuses = useGetStatuses()
const billingTypes = useGetBillingTypes()

const billingTypeName = computed(() =>
    billingTypes.find((el) => el.id === props.subscription.billing_type)
)
</script>

<template>
    <Card
        class="p-4 gap-5 relative overflow-hidden transition-all hover:shadow-md"
    >
        <div class="flex justify-between items-center">
            <Badge
                variant="default"
                :style="{
                    backgroundColor: statuses.find(
                        (el) => el.id === props.subscription.status
                    )?.color,
                }"
            >
                {{
                    statuses.find((el) => el.id === props.subscription.status)
                        ?.name
                }}
            </Badge>
            <Popover>
                <PopoverTrigger as-child>
                    <Button
                        variant="outline"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground"
                    >
                        <MoreVertical class="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent class="w-fit p-2" align="end">
                    <div class="flex flex-col gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            class="h-8 w-8 edit-icon"
                            @click="$emit('update')"
                        >
                            <Pencil class="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            class="h-8 w-8 delete-icon"
                            @click="$emit('delete')"
                        >
                            <Trash class="h-4 w-4" />
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>

        <CardHeader class="flex flex-row items-center gap-4 pb-2 !px-0">
            <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xl"
            >
                {{ subscription.name.charAt(0) }}
            </div>
            <div class="min-w-0 flex-1">
                <CardTitle class="text-lg font-bold truncate">
                    {{ subscription.name }}
                </CardTitle>
                <CardDescription>
                    <Badge
                        variant="default"
                        :style="{
                            backgroundColor: billingTypes.find(
                                (el) =>
                                    el.id === props.subscription.billing_type
                            )?.color,
                        }"
                    >
                        {{
                            billingTypes.find(
                                (el) =>
                                    el.id === props.subscription.billing_type
                            )?.name
                        }}
                    </Badge>
                </CardDescription>
            </div>
        </CardHeader>

        <CardContent class="!px-2">
            <div class="flex items-baseline gap-1">
                <span class="text-2xl font-bold tracking-tight">
                    {{ props.subscription.price }}
                    {{
                        currencies.find(
                            (el) => el.id === props.subscription.currency
                        )?.name
                    }}
                </span>
            </div>

            <div class="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                <div class="flex items-center gap-2">
                    <Calendar class="h-4 w-4" />
                    <span>
                        {{ t('subscription.nextBillingDate') }}:
                        {{
                            useDateFormat(
                                subscription.next_billing_date,
                                'DD-MM-YYYY'
                            )
                        }}
                    </span>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
