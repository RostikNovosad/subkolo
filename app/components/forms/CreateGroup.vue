<script setup lang="ts">
const { t } = useI18n()

const { getSubscriptions } = useSubscriptionStore()

const { subscriptions } = storeToRefs(useSubscriptionStore())

const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits(['close', 'create'])

const formData = ref({
    subscription_id: undefined,
    max_members: undefined,
})

await getSubscriptions()

const handleSubmit = () => {
    emit('create', formData.value)
    formData.value = {
        subscription_id: undefined,
        max_members: undefined,
    }
}
</script>

<template>
    <form>
        <DialogContent class="sm:max-w-[425px] max-h-[90dvh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>
                    {{ t('actions.createGroup') }}
                </DialogTitle>
                <DialogDescription>
                    {{ t('group.createGroupDescription') }}
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="username-1">
                        {{ t('group.subscription') }}
                    </Label>
                    <Select v-model="formData.subscription_id">
                        <SelectTrigger class="w-full">
                            <SelectValue
                                :placeholder="t('group.subscription')"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="subscription in subscriptions.items"
                                :value="subscription.id"
                            >
                                {{ subscription.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div class="grid gap-2">
                    <Label for="username-1">{{ t('group.maxMembers') }}</Label>
                    <Input
                        v-model="formData.max_members"
                        type="number"
                        :placeholder="t('group.maxMembers')"
                        class="no-spin"
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="outline" @click="emit('close')">
                        {{ t('actions.cancel') }}
                    </Button>
                </DialogClose>
                <Button type="submit" @click="handleSubmit">
                    {{ t('actions.create') }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </form>
</template>
