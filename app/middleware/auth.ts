// app/middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    if (!user.value) {
        const {
            data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
            console.log('!user - дійсно не авторизований')
            return navigateTo('/login')
        }
    }
})
