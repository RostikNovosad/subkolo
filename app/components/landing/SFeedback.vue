<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
    <div class="section feedback" id="#feedback">
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
                    <button class="feedback__content-button">
                        {{ t('landing.feedback.button') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
