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
    billingType?: number
    billingDay?: string | Date
    status?: number
}

export const useSubscriptionStore = defineStore('subscription', () => {
    const supabase = useSupabaseClient()
    const { $i18n } = useNuxtApp()

    const subscriptions = ref({
        total: 0,
        items: [],
    })

    // const subscriptions = ref({
    //     total: 5,
    //     items: [
    //         {
    //             id: 1,
    //             name: 'Netflix',
    //             price: 489,
    //             currency: 0,
    //             billingType: 3,
    //             nextBillingDate: '2026-02-15',
    //             status: 1,
    //         },
    //         {
    //             id: 2,
    //             name: 'Spotify Premium',
    //             price: 4.99,
    //             currency: 1,
    //             billingType: 1,
    //             nextBillingDate: '2026-02-01',
    //             status: 1,
    //         },
    //         {
    //             id: 3,
    //             name: 'ChatGPT Plus',
    //             price: 20,
    //             currency: 1,
    //             billingType: 1,
    //             nextBillingDate: '2026-02-24',
    //             status: 0,
    //         },
    //         {
    //             id: 4,
    //             name: 'Adobe Creative Cloud',
    //             price: 1200,
    //             currency: 2,
    //             billingType: 12,
    //             nextBillingDate: '2026-11-10',
    //             status: 1,
    //         },
    //         {
    //             id: 5,
    //             name: 'YouTube Premium',
    //             price: 99,
    //             currency: 0,
    //             billingType: 1,
    //             nextBillingDate: '2026-02-05',
    //             status: 1,
    //         },
    //     ],
    // })

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
        } catch (error) {}
    }

    const updateSubscription = () => {}

    const deleteSubscription = () => {}

    return {
        subscriptions,
        getSubscriptions,
        createSubscription,
        updateSubscription,
        deleteSubscription,
    }
})
