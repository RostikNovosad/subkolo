<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
    <footer class="section footer" id="#footer">
        <div class="footer__top">
            <h4 class="footer__top-title">{{ t('landing.footer.title') }}</h4>
            <p class="footer__top-subtitle">
                {{ t('landing.footer.subtitle') }}
            </p>
        </div>
        <div class="footer__bottom">
            <p>{{ t('landing.footer.allRightReserved') }}</p>
        </div>
    </footer>
</template>

<style scoped></style>
