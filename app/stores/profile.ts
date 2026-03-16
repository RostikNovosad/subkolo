export interface Profile {
    id: string
    updated_at: string
    telegram_id: string
    telegram_token: string
    is_tg_active: boolean
    email_notifications: boolean
}

export const useProfileStore = defineStore('profile', () => {
    const supabase = useSupabaseClient()

    const profile = ref()

    const getProfile = async (id: string) => {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single()
        profile.value = data
    }

    const updateProfile = async (id: string, body: Profile) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update(body)
                .eq('id', id)

            if (error) throw error
        } catch (error) {
            throw error
        }
    }

    return {
        getProfile,
        profile,
        updateProfile,
    }
})
