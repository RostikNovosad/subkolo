<script setup lang="ts">
const { t } = useI18n()

const featureList = ref([
    {
        id: 0,
        title: t('landing.features.list.0.title'),
        description: t('landing.features.list.0.subtitle'),
        icon: 'lucide:layout-dashboard',
    },
    {
        id: 1,
        title: t('landing.features.list.1.title'),
        description: t('landing.features.list.1.subtitle'),
        icon: 'lucide:users',
        image: '',
    },
    {
        id: 2,
        title: t('landing.features.list.2.title'),
        description: t('landing.features.list.2.subtitle'),
        icon: 'lucide:bell-ring',
        image: '',
    },
])
const featuresImages = ref([
    {
        id: 0,
        image: '/feature-1.png',
        alt: '',
    },
    {
        id: 1,
        image: '/feature-1.png',
        alt: '',
    },
    {
        id: 2,
        image: '/feature-1.png',
        alt: '',
    },
])
</script>

<template>
    <div class="section features" id="#features">
        <div class="features__content">
            <h2 class="features__title">{{ t('landing.features.title') }}</h2>
            <div class="features__list">
                <div v-for="item in featureList" class="features__list-card">
                    <Icon :name="item.icon" size="36" />
                    <div class="features__list-card-text">
                        <p class="features__list-card-title">
                            {{ item.title }}
                        </p>
                        <p class="features__list-card-description">
                            {{ item.description }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="features__images">
                <img
                    v-for="item in featuresImages"
                    :src="item.image"
                    alt="alt"
                    class="features__image"
                />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
