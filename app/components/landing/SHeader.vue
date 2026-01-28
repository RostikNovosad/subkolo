<script setup lang="ts">
const { t } = useI18n()

const menu = ref([
    { id: 0, title: t('landing.header.menu.home'), path: '#hero' },
    { id: 1, title: t('landing.header.menu.aboutUs'), path: '#target' },
    { id: 2, title: t('landing.header.menu.services'), path: '#advantages' },
    { id: 3, title: t('landing.header.menu.features'), path: '#features' },
    { id: 4, title: t('landing.header.menu.faq'), path: '#faq' },
])

const mobileMenuOpen = ref(false)
const openMobileMenu = () => {
    const menu = document.querySelector('.header__mobile-menu')
    document.body.classList.toggle('modal-open')
    menu?.classList.toggle('open')
    mobileMenuOpen.value = !mobileMenuOpen.value
}

const goToSection = () => {
    document.body.classList.remove('modal-open')
    const menu = document.querySelector('.header__mobile-menu')
    menu?.classList.toggle('open')
    mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
    <header class="header drop-shadow">
        <a href="#hero" class="header-logo">
            <img src="/slogo.svg" alt="allio-logo" class="rounded-sm" />
        </a>
        <div class="header-menu">
            <div class="header-menu__list">
                <a
                    v-for="item in menu"
                    :key="item.id"
                    :href="item.path"
                    class="header-menu__list-item"
                >
                    {{ item.title }}
                </a>
            </div>
        </div>
        <div class="header-buttons">
            <Button class="hidden md:flex" @click="goToLogin">
                {{ t('landing.header.cabinet') }}
            </Button>

            <button class="button header-menu-button" @click="openMobileMenu">
                <Icon
                    v-if="mobileMenuOpen"
                    name="material-symbols:close-rounded"
                    size="32"
                />

                <Icon v-else name="material-symbols:menu-rounded" size="32" />
            </button>
        </div>
        <div class="header__mobile-menu">
            <div class="header__mobile-menu-list">
                <a
                    v-for="item in menu"
                    :key="item.id"
                    :href="item.path"
                    class="header__mobile-menu-item"
                    @click="goToSection"
                >
                    {{ item.title }}
                </a>
                <Button
                    class="header__mobile-menu-button button"
                    @click="goToLogin"
                >
                    {{ t('landing.header.cabinet') }}
                </Button>
            </div>
        </div>
    </header>
</template>
