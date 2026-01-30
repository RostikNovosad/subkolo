import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'

export interface Subscription {
    id: number
    name: string
    price: number
    currency: number
    billing_type: number
    next_billing_date: string
    status: number
}

export interface CreateSubscriptionPayload {
    name: string
    price?: number
    currency?: number
    billing_type?: number
    next_billing_date?: string | Date
    status?: number
}

export interface UpdateSubscriptionPayload {
    id: number
    name: string
    price?: number
    currency?: number
    billing_type?: number
    next_billing_date?: string | Date
    status?: number
}

export const useSubscriptionStore = defineStore('subscription', () => {
    const supabase = useSupabaseClient()
    const { $i18n } = useNuxtApp()

    const subscriptions = ref({
        total: 0,
        items: [],
    })

    const getSubscriptions = async () => {
        try {
            const { data, error } = await supabase
                .from('subscriptions')
                .select('*')

            if (data) {
                subscriptions.value = {
                    total: data.length,
                    items: data,
                }
            }
        } catch (error) {}
    }

    const createSubscription = async (
        subscription: CreateSubscriptionPayload
    ) => {
        try {
            const { data, error } = await supabase
                .from('subscriptions')
                .insert(subscription as any)

            if (error) {
                throw error
            }
        } catch (error) {
            throw error
        }
    }

    const updateSubscription = async (
        subscription: UpdateSubscriptionPayload
    ) => {
        try {
            const { data, error } = await supabase
                .from('subscriptions')
                .update(subscription)
                .eq('id', subscription.id)

            if (error) {
                throw error
            }
        } catch (error) {
            throw error
        }
    }

    const deleteSubscription = async (id: number) => {
        try {
            const { data, error } = await supabase
                .from('subscriptions')
                .delete()
                .eq('id', id)

            if (error) {
                throw error
            }
        } catch (error) {
            throw error
        }
    }

    return {
        subscriptions,
        getSubscriptions,
        createSubscription,
        updateSubscription,
        deleteSubscription,
    }
})
