<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
    <div class="section hero" id="hero">
        <div class="hero__content">
            <div class="hero__top">
                <h1 class="hero__top-title">{{ t('landing.hero.title') }}</h1>
                <p class="hero__top-subtitle">
                    {{ t('landing.hero.subtitle') }}
                </p>
                <button class="hero__top-button" @click="goToLogin">
                    {{ t('landing.hero.getStarted') }}
                </button>
            </div>
            <div class="hero__bottom">
                <div class="hero__bottom-badge">
                    <span class="mr-1"> 🇺🇦 </span>
                    {{ t('landing.hero.badge') }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
