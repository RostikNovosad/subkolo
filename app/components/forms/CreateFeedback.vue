<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits(['close', 'create'])

const formData = ref({
    author: undefined,
    feedback: undefined,
})

const handleSubmit = () => {
    if (formData.value.author && formData.value.feedback) {
        emit('create', formData.value)
        formData.value = {
            author: undefined,
            feedback: undefined,
        }
    }
}
</script>

<template>
    <form>
        <DialogContent class="sm:max-w-[425px] max-h-[90dvh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>
                    {{ t('landing.feedback.modalTitle') }}
                </DialogTitle>
                <DialogDescription>
                    {{ t('landing.feedback.modalSubtitle') }}
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="author">
                        {{ t('landing.feedback.author') }}
                    </Label>
                    <Input
                        id="author"
                        v-model="formData.author"
                        :placeholder="t('landing.feedback.author')"
                        class="no-spin"
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="feedback">
                        {{ t('landing.feedback.feedback') }}
                    </Label>
                    <Textarea
                        id="author"
                        v-model="formData.feedback"
                        :placeholder="t('landing.feedback.feedback')"
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
