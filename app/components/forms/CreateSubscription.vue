<script setup lang="ts">
import { useGetCurrencies } from '~/composables/useGetCurrencies'

import {
    CalendarDate,
    DateFormatter,
    getLocalTimeZone,
    parseDate,
    today,
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const { t, locale } = useI18n()

const df = computed(
    () =>
        new DateFormatter(locale.value, {
            dateStyle: 'long',
        })
)
const dateValue = ref<CalendarDate>(today(getLocalTimeZone()))

const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits(['close', 'create'])

const currencies = useGetCurrencies()
const statuses = useGetStatuses()
const billingTypes = useGetBillingTypes()

const formData = ref({
    name: '',
    price: undefined,
    currency: undefined,
    billing_type: undefined,
    next_billing_date: dateValue.value.toString(),
    status: undefined,
})

watch(dateValue, (newDate) => {
    if (newDate) {
        formData.value.next_billing_date = newDate.toString()
    }
})
</script>

<template>
    <form>
        <DialogContent class="sm:max-w-[425px] max-h-[90dvh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>
                    {{ t('actions.createSubscription') }}
                </DialogTitle>
                <DialogDescription>
                    {{ t('subscription.createSubscriptionDescription') }}
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="name-1">
                        {{ t('subscription.serviceName') }}
                    </Label>
                    <Input
                        v-model="formData.name"
                        :placeholder="t('subscription.serviceName')"
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="username-1">
                        {{ t('global.currency') }}
                    </Label>
                    <Select v-model="formData.currency">
                        <SelectTrigger class="w-full">
                            <SelectValue :placeholder="t('global.currency')" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="currency in currencies"
                                :value="currency.id"
                            >
                                {{ currency.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div class="grid gap-2">
                    <Label for="username-1">{{ t('global.price') }}</Label>
                    <Input
                        v-model="formData.price"
                        type="number"
                        :placeholder="t('global.price')"
                        class="no-spin"
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="name-1">
                        {{ t('subscription.billingType') }}
                    </Label>
                    <Select v-model="formData.billing_type">
                        <SelectTrigger class="w-full">
                            <SelectValue
                                :placeholder="t('subscription.billingType')"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="billingType in billingTypes"
                                :value="billingType.id"
                            >
                                {{ billingType.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div class="grid gap-2">
                    <Label for="name-1">
                        {{ t('statuses.status') }}
                    </Label>
                    <Select v-model="formData.status">
                        <SelectTrigger class="w-full">
                            <SelectValue :placeholder="t('statuses.status')" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="status in statuses"
                                :value="status.id"
                            >
                                {{ status.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div class="grid gap-2">
                    <Label for="billing-date">
                        {{ t('subscription.nextBillingDate') }}
                    </Label>
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button
                                variant="outline"
                                :class="
                                    cn(
                                        'w-full justify-start text-left font-normal',
                                        !dateValue && 'text-muted-foreground'
                                    )
                                "
                            >
                                <CalendarIcon class="mr-2 h-4 w-4" />
                                {{
                                    dateValue
                                        ? df.format(
                                              dateValue.toDate(
                                                  getLocalTimeZone()
                                              )
                                          )
                                        : t('global.pickDate')
                                }}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto p-0">
                            <Calendar
                                v-model="dateValue"
                                initial-focus
                                :min-value="today(getLocalTimeZone())"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="outline" @click="emit('close')">
                        {{ t('actions.cancel') }}
                    </Button>
                </DialogClose>
                <Button type="submit" @click="emit('create', formData)">
                    {{ t('actions.create') }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </form>
</template>
