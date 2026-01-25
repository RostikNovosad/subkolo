<script setup lang="ts">
import { z } from 'zod'
const { t } = useI18n()
const supabase = useSupabaseClient()
const toast = useToast()
const router = useRouter()

const registerSchema = z.object({
    email: z.string().email(t('notifications.errors.incorrectEmailFormat')),
    name: z.string().min(2, t('notifications.errors.nameLength')),
    password: z.string().min(6, t('notifications.errors.passwordLength')),
})

const isLoading = ref(false)
const registerData = ref({
    email: '',
    name: '',
    password: '',
})

const register = async () => {
    const result = registerSchema.safeParse(registerData.value)

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
        const { error } = await supabase.auth.signUp({
            email: registerData.value.email,
            password: registerData.value.password,
            options: {
                data: {
                    userName: registerData.value.name,
                },
            },
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
                detail: t('notifications.success.accountRegistered'),
                life: 3000,
            })

            router.push('/login')
            registerData.value = { email: '', name: '', password: '' }
        }
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: t('notifications.errors.error'),
            detail: error.message || 'Unknown error',
            life: 3000,
        })
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ t('auth.signUpTitle') }}</CardTitle>
            <CardDescription> {{ t('auth.signUpSubtitle') }}</CardDescription>
        </CardHeader>
        <CardContent>
            <form>
                <FieldGroup>
                    <Field>
                        <FieldLabel for="email">
                            {{ t('auth.email') }}
                        </FieldLabel>
                        <Input
                            v-model="registerData.email"
                            id="email"
                            type="email"
                            :placeholder="t('auth.email')"
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel for="name">
                            {{ t('auth.name') }}
                        </FieldLabel>
                        <Input
                            v-model="registerData.name"
                            id="name"
                            type="text"
                            :placeholder="t('auth.name')"
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel for="password">
                            {{ t('auth.password') }}
                        </FieldLabel>
                        <Input
                            v-model="registerData.password"
                            id="password"
                            type="password"
                            required
                            :placeholder="t('auth.password')"
                        />
                        <FieldDescription>
                            {{ t('auth.passwordLength') }}
                        </FieldDescription>
                    </Field>
                    <FieldGroup>
                        <Field>
                            <Button
                                type="button"
                                @click="register"
                                :disabled="isLoading"
                            >
                                {{
                                    isLoading
                                        ? t('auth.accountCreating')
                                        : t('auth.createAccount')
                                }}
                            </Button>
                            <FieldDescription class="px-6 text-center">
                                {{ t('auth.alreadyHaveAccount') }}
                                <a href="/login">{{ t('auth.signIn') }}</a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </FieldGroup>
            </form>
        </CardContent>
    </Card>
</template>
