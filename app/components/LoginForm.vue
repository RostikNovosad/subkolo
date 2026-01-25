<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { z } from 'zod'
import { cn } from '~/lib/utils'
import 'vue-sonner/style.css'
const supabase = useSupabaseClient()
const toast = useToast()

const { t } = useI18n()
const isLoading = ref(false)
const loginData = ref({
    email: '',
    password: '',
})

const loginSchema = z.object({
    email: z.string().email(t('notifications.errors.incorrectEmailFormat')),
    password: z.string().min(6, t('notifications.errors.passwordLength')),
})

const login = async () => {
    const result = loginSchema.safeParse(loginData.value)

    if (!result.success) {
        result.error.issues.forEach((err) => {
            toast.add({
                severity: 'error',
                summary: t('notifications.errors.error'),
                detail: err.message,
                life: 3000,
            })
        })
        return
    }

    isLoading.value = true

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginData.value.email,
            password: loginData.value.password,
        })

        if (error) {
            toast.add({
                severity: 'error',
                summary: t('notifications.errors.error'),
                detail: error.message,
                life: 3000,
            })
        } else {
            toast.add({
                severity: 'success',
                summary: t('notifications.success.success'),
                detail: t('notifications.success.loginSuccess'),
                life: 3000,
            })

            await navigateTo('/dashboard', { replace: true })
        }
    } catch (e) {
        toast.add({
            severity: 'error',
            summary: t('notifications.errors.error'),
            detail: e.message,
            life: 3000,
        })
    } finally {
        isLoading.value = false
    }
}
const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <form :class="cn('flex flex-col gap-6', props.class)">
        <FieldGroup>
            <div class="flex flex-col items-center gap-1 text-center">
                <h1 class="text-2xl font-bold">{{ t('auth.loginTitle') }}</h1>
                <p class="text-muted-foreground text-sm text-balance">
                    {{ t('auth.loginSubtitle') }}
                </p>
            </div>
            <Field>
                <FieldLabel for="email">{{ t('auth.email') }}</FieldLabel>
                <Input
                    v-model="loginData.email"
                    id="email"
                    type="email"
                    :placeholder="t('auth.email')"
                    required
                />
            </Field>
            <Field>
                <FieldLabel for="password">
                    {{ t('auth.password') }}
                </FieldLabel>
                <Input
                    v-model="loginData.password"
                    id="password"
                    type="password"
                    required
                    placeholder="********"
                />
            </Field>
            <Field>
                <Button type="button" @click="login" :disabled="isLoading">
                    {{ t('auth.signIn') }}
                </Button>
            </Field>
            <Field>
                <FieldDescription class="text-center">
                    {{ t('auth.dontHaveAccount') }}
                    <a href="/signUp">{{ t('auth.signUp') }}</a>
                </FieldDescription>
            </Field>
        </FieldGroup>
    </form>
</template>
