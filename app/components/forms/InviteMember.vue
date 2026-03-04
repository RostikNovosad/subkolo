<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits(['close', 'create'])

const formData = ref({
    display_name: '',
    assigned_cost: undefined,
    is_invite: false,
})

const handleSubmit = () => {
    emit('create', formData.value)
}
</script>

<template>
    <Dialog :open="open" @update:open="emit('close')">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ t('actions.addMember') }}</DialogTitle>
                <DialogDescription>
                    {{ t('group.addMemberDescription') }}
                </DialogDescription>
            </DialogHeader>

            <form @submit.prevent="handleSubmit" class="grid gap-5 py-4">
                <div class="grid gap-2">
                    <Label for="name">{{ t('group.memberName') }}</Label>
                    <Input
                        id="name"
                        v-model="formData.display_name"
                        :placeholder="t('group.memberName')"
                        required
                    />
                </div>

                <div class="grid gap-2">
                    <Label for="cost">{{ t('group.paymentAmount') }}</Label>
                    <Input
                        id="cost"
                        v-model="formData.assigned_cost"
                        type="number"
                        placeholder="0.00"
                        class="no-spin pr-12"
                        required
                    />
                </div>

                <div
                    class="flex items-center space-x-2 border rounded-lg p-3 bg-muted/30"
                >
                    <Checkbox id="invite" v-model="formData.is_invite" />
                    <label
                        for="invite"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {{ t('actions.generateInviteLink') }}
                    </label>
                </div>

                <DialogFooter class="mt-4">
                    <Button
                        variant="outline"
                        type="button"
                        @click="emit('close')"
                    >
                        {{ t('actions.cancel') }}
                    </Button>
                    <Button type="submit">
                        {{
                            formData.is_invite
                                ? t('actions.createInvite')
                                : t('actions.addMember')
                        }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
