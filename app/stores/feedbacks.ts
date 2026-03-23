export interface CreateFeedbackPayload {
    author: string
    feedback: string
}

export const useFeedbackStore = defineStore('feedbacks', () => {
    const supabase = useSupabaseClient()

    const createFeedback = async (payload: CreateFeedbackPayload) => {
        try {
            const { error } = await supabase
                .from('feedback')
                .insert(payload as any)

            if (error) {
                throw error
            }
        } catch (error) {
            throw error
        }
    }

    return {
        createFeedback,
    }
})
