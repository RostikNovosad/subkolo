<script setup lang="ts">
import {
    type CreateFeedbackPayload,
    useFeedbackStore,
} from '~/stores/feedbacks'

const { t } = useI18n()
const toast = useToast()

const { createFeedback } = useFeedbackStore()
const showFeedbackModal = ref(false)

const createNewFeedback = async (data: CreateFeedbackPayload) => {
    try {
        await createFeedback(data)

        toast.add({
            severity: 'success',
            summary: t('notifications.success.success'),
            detail: t('notifications.success.wasSended'),
            life: 3000,
        })

        showFeedbackModal.value = false
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <div class="section feedback" id="feedback">
        <PToast />
        <div class="feedback__content">
            <img
                src="/slogo.svg"
                alt="allio-logo"
                class="rounded-sm feedback__content-logo"
            />

            <div class="feedback__content-text">
                <h2 class="feedback__content-title">
                    {{ t('landing.feedback.title') }}
                </h2>
                <div class="feedback__content-description">
                    <p>{{ t('landing.feedback.description') }}</p>
                    <button
                        class="feedback__content-button"
                        @click="showFeedbackModal = true"
                    >
                        {{ t('landing.feedback.button') }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <Dialog :open="showFeedbackModal" @update:open="showFeedbackModal = $event">
        <FormsCreateFeedback
            v-model:open="showFeedbackModal"
            @create="createNewFeedback"
            @close="showFeedbackModal = false"
        />
    </Dialog>
</template>

<style scoped></style>
