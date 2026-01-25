import { toast } from 'vue-sonner'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export interface User {
    login: string
    password: string
}

export interface LoginPayload {
    login: string
    password: string
}

export interface CreateUserPayload {
    login: string
    password: string
}

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const user = ref<User>()
    const { $i18n } = useNuxtApp()

    const login = (body: LoginPayload) => {
        console.log('body: ', body)
        if (body.login === 'admin' && body.password === 'admin') {
            router.push('/dashboard')
        } else {
            toast.error($i18n.t('notifications.errors.login'))
        }
    }

    const register = (body: CreateUserPayload) => {
        toast.success($i18n.t('notifications.success.register'))
    }

    return {
        login,
        user,
        register,
    }
})
