<script setup lang="ts">
import { useGetCurrencies } from '~/composables/useGetCurrencies'

const { t } = useI18n()

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
    billingType: undefined,
    billingDay: undefined,
    status: undefined,
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
                    <Select v-model="formData.billingType">
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
                    <Label for="name-1">
                        {{ t('subscription.billingDay') }}
                    </Label>
                    <Select v-model="formData.billingDay">
                        <SelectTrigger id="billing-day" class="w-full">
                            <SelectValue
                                :placeholder="t('subscription.billingDay')"
                            />
                        </SelectTrigger>
                        <SelectContent
                            class="justify-self-center p-2 max-w-content"
                        >
                            <div class="grid grid-cols-7 gap-1">
                                <SelectItem
                                    v-for="day in 31"
                                    :key="day"
                                    :value="day"
                                    class="justify-self-center flex items-center justify-center p-0 h-9 w-9 focus:bg-primary focus:text-primary-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                    hide-indicator
                                >
                                    <span class="text-sm">{{ day }}</span>
                                </SelectItem>
                            </div>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="outline" @click="emit('close')">
                        {{ t('actions.cancel') }}
                    </Button>
                </DialogClose>
                <Button type="button" @click="emit('create', formData)">
                    {{ t('actions.create') }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </form>
</template>
