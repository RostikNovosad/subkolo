// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()

    if (!user.value) {
        console.log('!user')
        return navigateTo('/login')
    }
})
