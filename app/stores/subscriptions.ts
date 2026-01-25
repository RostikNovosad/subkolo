import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'

export interface Subscription {
    name: string
    price: number
    currency: number
    billingType: number
    billingDay: number
    status: number
}

export interface CreateSubscriptionPayload {
    name: string
    price?: number
    currency?: number
    billingType?: number
    billingDay?: string | Date
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
    const { $i18n } = useNuxtApp()

    // const subscriptions = ref({
    //     total: 0,
    //     items: [],
    // })

    const subscriptions = ref({
        total: 5,
        items: [
            {
                id: 1,
                name: 'Netflix',
                price: 489,
                currency: 0,
                billingType: 3,
                billingDay: 15,
                status: 1,
            },
            {
                id: 2,
                name: 'Spotify Premium',
                price: 4.99,
                currency: 1,
                billingType: 1,
                billingDay: 1,
                status: 1,
            },
            {
                id: 3,
                name: 'ChatGPT Plus',
                price: 20,
                currency: 1,
                billingType: 1,
                billingDay: 24,
                status: 0,
            },
            {
                id: 4,
                name: 'Adobe Creative Cloud',
                price: 1200,
                currency: 2,
                billingType: 2,
                billingDay: 10,
                status: 1,
            },
            {
                id: 5,
                name: 'YouTube Premium',
                price: 99,
                currency: 0,
                billingType: 0,
                billingDay: 5,
                status: 1,
            },
        ],
    })

    const getSubscriptions = () => {}

    const createSubscription = () => {}

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
