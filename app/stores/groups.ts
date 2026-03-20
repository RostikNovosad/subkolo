import { defineStore } from 'pinia'

export interface Group {
    id: string
    max_members: number
    members_count: number
    owner_id: string
    subscription: {
        name: string
        next_billing_date: string
        currency: number
    }
}

export interface CreateGroupPayload {
    subscription_id: number
    max_members: number
}

export interface UpdateGroupPayload {
    id: string
}

export interface AddMemberPayload {
    group_id: string
    display_name: string
    assigned_cost?: number
    is_invite?: boolean
    price_to_set?: number
    subscription_name?: string
    currency?: number
    owner_name?: string
    billing_type?: number
}

export const useGroupStore = defineStore('group', () => {
    const supabase = useSupabaseClient()

    const groups = ref({
        total: 0,
        items: [],
    })

    const group = ref()
    const invite = ref()

    const getGroups = async () => {
        try {
            const { data, error } = await supabase.from('groups')
                .select(`*, subscription:subscriptions (
                    name,
                    next_billing_date,
                    currency,
                    price
                ), group_members (
                    id
                )
            `)

            if (data) {
                groups.value = {
                    total: data.length,
                    items: data.map((group) => ({
                        ...group,
                        members_count: group.group_members?.length || 0,
                    })),
                }
            }
        } catch (e) {}
    }

    const getGroup = async (id: string) => {
        try {
            const { data, error } = await supabase
                .from('groups')
                .select(
                    `*, subscription:subscriptions (*), group_members!group_id(*), pending_invites:group_invites!group_id(*)
            `
                )
                .eq('id', id)
            if (data) {
                group.value = data[0]
            }
            if (error) throw error
        } catch (error) {
            throw error
        }
    }

    const createGroup = async (payload: CreateGroupPayload) => {
        try {
            const { error } = await supabase
                .from('groups')
                .insert(payload as any)

            if (error) {
                throw error
            }
        } catch (error) {
            throw error
        }
    }

    const updateGroup = async (payload: UpdateGroupPayload) => {
        try {
            const { error } = await supabase
                .from('groups')
                .update(payload)
                .eq('id', payload.id)

            if (error) throw error
        } catch (e) {}
    }

    const deleteGroup = async (id: string) => {
        try {
            const { error } = await supabase
                .from('groups')
                .delete()
                .eq('id', id)

            if (error) throw error
        } catch (e) {}
    }

    const addMember = async (payload: AddMemberPayload) => {
        try {
            const { error } = await supabase.from('group_members').insert({
                user_id: null,
                group_id: payload.group_id,
                display_name: payload.display_name,
                assigned_cost: payload.assigned_cost,
            } as any)
            if (error) {
                throw error
            }
        } catch (error) {}
    }

    const createInviteLink = async (payload: AddMemberPayload) => {
        try {
            const { error } = await supabase.from('group_invites').insert({
                group_id: payload.group_id,
                display_name: payload.display_name,
                price_to_set: Number(payload.price_to_set),
                subscription_name: payload.subscription_name,
                currency: payload.currency,
                owner_name: payload.owner_name,
                billing_type: payload.billing_type,
            } as any)

            if (error) {
                throw error
            }
        } catch (error) {
            throw error
        }
    }

    const deleteMember = async (memberId: string) => {
        try {
            const { error } = await supabase
                .from('group_members')
                .delete()
                .eq('id', memberId)

            if (error) throw error
        } catch (e) {}
    }

    const deleteInvite = async (token: string) => {
        try {
            const { error } = await supabase
                .from('group_invites')
                .delete()
                .eq('token', token)

            if (error) throw error
        } catch (e) {}
    }

    const getInvite = async (token: string) => {
        try {
            const { error, data } = await supabase
                .from('group_invites')
                .select('*')
                .eq('token', token)
                .single()

            if (error) {
                invite.value = null
                throw error
            }

            invite.value = data
            return data
        } catch (e) {}
    }

    const joinGroup = async (body, token: string) => {
        try {
            const { error: memberError } = await supabase
                .from('group_members')
                .insert(body as any)
            if (memberError) {
                throw memberError
            }

            const { error: deleteError } = await supabase
                .from('group_invites')
                .delete()
                .eq('token', token)
        } catch (error) {}
    }

    const leaveGroup = async (id: string) => {
        try {
            const { error } = await supabase
                .from('group_members')
                .delete()
                .eq('user_id', id)

            if (error) throw error
        } catch (e) {}
    }

    return {
        getGroups,
        groups,
        getGroup,
        group,
        createGroup,
        updateGroup,
        deleteGroup,
        addMember,
        createInviteLink,
        deleteMember,
        deleteInvite,
        getInvite,
        invite,
        joinGroup,
        leaveGroup,
    }
})
